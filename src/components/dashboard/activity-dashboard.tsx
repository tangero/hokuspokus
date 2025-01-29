import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import {
  format,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  addWeeks,
  isBefore,
  isAfter,
} from "date-fns";
import { cs, de } from "date-fns/locale";
import { useTranslation } from "react-i18next";
import WeekAnalysis from "./week-analysis";
import {
  MoreHorizontal,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import ActivityInput from "../activity/activity-input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";

type Activity = {
  id: string;
  text: string;
  parsed_date: string;
  duration_minutes: number;
};

const isDebugUser = (email: string | undefined) => {
  return email?.endsWith("@marigold.cz") ?? false;
};

export default function ActivityDashboard() {
  const { user } = useAuth();
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [weekStartsOn, setWeekStartsOn] = useState<0 | 1>(1);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedDayActivities, setSelectedDayActivities] = useState<
    Activity[]
  >([]);
  const [selectedDayStr, setSelectedDayStr] = useState<string | null>(null);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchWeekStartsOn();
    }
  }, [user]);

  const fetchWeekStartsOn = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("user_profiles")
      .select("week_starts_on")
      .eq("id", user.id)
      .single();

    if (data) {
      setWeekStartsOn(data.week_starts_on === "sunday" ? 0 : 1);
    }
  };

  const fetchSelectedDayActivities = async () => {
    if (!selectedDayStr || !user) return;

    const match = selectedDayStr.match(/: (\d+)\.(\d+)\.(\d+)/);
    if (!match) return;

    const [, day, month, year] = match;
    const selectedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;

    const { data, error } = await supabase
      .from("activities")
      .select("id, text, parsed_date, duration_minutes")
      .eq("user_id", user.id)
      .gte("parsed_date", `${selectedDate}T00:00:00`)
      .lt("parsed_date", `${selectedDate}T23:59:59.999Z`)
      .order("parsed_date", { ascending: false });

    if (error) {
      console.error("Error fetching day activities:", error);
      return;
    }

    setSelectedDayActivities(data || []);
  };

  const fetchActivities = async () => {
    if (!user) return;

    const startDate = startOfWeek(selectedDate, { weekStartsOn });
    const endDate = endOfWeek(selectedDate, { weekStartsOn });

    const { data, error } = await supabase
      .from("activities")
      .select("id, text, parsed_date, duration_minutes")
      .eq("user_id", user.id)
      .gte("parsed_date", startDate.toISOString())
      .lte("parsed_date", endDate.toISOString())
      .order("parsed_date");

    if (error) {
      console.error("Error fetching activities:", error);
      return;
    }

    setActivities(data || []);
  };

  useEffect(() => {
    if (!user) return;

    fetchActivities();
    fetchSelectedDayActivities();

    const channel = supabase.channel("activities_channel");

    channel
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "activities",
          filter: `user_id=eq.${user.id}`,
        },
        async (payload) => {
          await fetchActivities();
          await fetchSelectedDayActivities();
        },
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [user, selectedDate, weekStartsOn, selectedDayStr]);

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from("activities").delete().eq("id", id);

      if (error) throw error;

      toast({
        title: t("activity.deleteSuccess"),
        description: t("activity.deleteSuccessDesc"),
      });
    } catch (error) {
      console.error("Error deleting activity:", error);
      toast({
        variant: "destructive",
        title: t("activity.error"),
        description: t("activity.deleteError"),
      });
    }
  };

  // Create data for all days, calculating total minutes for each day
  const weekDays = eachDayOfInterval({
    start: startOfWeek(selectedDate, { weekStartsOn }),
    end: endOfWeek(selectedDate, { weekStartsOn }),
  });

  const dailyData = weekDays.map((day) => {
    const dayStr = format(day, "yyyy-MM-dd");
    const dayActivities = activities.filter((activity) =>
      activity.parsed_date?.startsWith(dayStr),
    );

    const totalMinutes = dayActivities.reduce((sum, activity) => {
      return sum + (activity.duration_minutes || 0);
    }, 0);

    return {
      date: format(day, "EEEE dd.MM.", {
        locale:
          i18n.language === "cs" ? cs : i18n.language === "de" ? de : undefined,
      }),
      hours: totalMinutes / 60,
    };
  });

  // Calculate average hours for days with activity
  const daysWithActivity = dailyData.filter((day) => day.hours > 0);
  const averageHours =
    daysWithActivity.length > 0
      ? daysWithActivity.reduce((sum, day) => sum + day.hours, 0) /
        daysWithActivity.length
      : 0;

  // Find max hours to set Y axis domain
  const maxHours = Math.max(...dailyData.map((day) => day.hours));
  const yAxisMax = Math.ceil(Math.max(maxHours, averageHours));

  // Process tags for distribution
  const tagCounts = activities.reduce(
    (acc: Record<string, number>, activity) => {
      const tags = activity.text.match(/#\w+/g) || [];
      tags.forEach((tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    },
    {},
  );

  const sortedTags = Object.entries(tagCounts).sort(([, a], [, b]) => b - a);

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>{t("dashboard.weeklyActivity")}</CardTitle>
            <div className="flex items-center gap-4">
              <div className="text-sm font-normal text-muted-foreground">
                {t("dashboard.average")}: {averageHours.toFixed(1)} h
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedDate(addWeeks(selectedDate, -1));
                    setCurrentPage((prev) => prev + 1);
                  }}
                  disabled={
                    !activities.some((a) =>
                      isBefore(
                        new Date(a.parsed_date),
                        startOfWeek(selectedDate, { weekStartsOn }),
                      ),
                    ) && currentPage !== 0
                  }
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  {t("common.older")}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedDate(addWeeks(selectedDate, 1));
                    setCurrentPage((prev) => Math.max(0, prev - 1));
                  }}
                  disabled={isAfter(
                    endOfWeek(selectedDate, { weekStartsOn }),
                    new Date(),
                  )}
                >
                  {t("common.newer")}
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  interval={0}
                  tick={{ fontSize: 12 }}
                />
                <YAxis
                  domain={[0, yAxisMax]}
                  tickCount={yAxisMax + 1}
                  label={{
                    value: t("dashboard.hours"),
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip
                  formatter={(value) => `${Number(value).toFixed(1)} h`}
                />
                <ReferenceLine
                  y={averageHours}
                  stroke="#ff0000"
                  strokeDasharray="3 3"
                  label={{
                    value: t("dashboard.averageLine"),
                    position: "right",
                  }}
                />
                <Bar
                  dataKey="hours"
                  fill="#8884d8"
                  name={t("dashboard.hours")}
                  onClick={(data, index) => {
                    if (typeof index !== "number") return;
                    const selectedDay = weekDays[index];
                    setSelectedDayStr(
                      format(selectedDay, "EEEE: d.M.yyyy", {
                        locale:
                          i18n.language === "cs"
                            ? cs
                            : i18n.language === "de"
                              ? de
                              : undefined,
                      }),
                    );
                  }}
                  cursor="pointer"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {selectedDayStr && selectedDayActivities.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>{selectedDayStr}</span>
              <span className="text-sm font-normal text-muted-foreground">
                {selectedDayActivities.reduce(
                  (sum, activity) => sum + (activity.duration_minutes || 0),
                  0,
                )}{" "}
                {t("common.minutes")}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {editingActivity && (
              <div className="mb-4">
                <ActivityInput
                  editingActivity={{
                    id: editingActivity.id,
                    text: editingActivity.text.replace(
                      /^DURATION - [^\n]*\n/,
                      "",
                    ),
                  }}
                  onCancelEdit={() => setEditingActivity(null)}
                />
              </div>
            )}
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase bg-slate-50">
                  <tr>
                    <th className="px-6 py-3">{t("activity.time")}</th>
                    <th className="px-6 py-3">{t("activity.duration")}</th>
                    <th className="px-6 py-3">{t("activity.description")}</th>
                    <th className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {selectedDayActivities.map((activity) => (
                    <tr
                      key={activity.id}
                      className="border-b hover:bg-slate-50"
                    >
                      <td className="px-6 py-4">
                        {activity.parsed_date &&
                          format(new Date(activity.parsed_date), "HH:mm")}
                      </td>
                      <td className="px-6 py-4">
                        {activity.duration_minutes} {t("common.minutes")}
                      </td>
                      <td className="px-6 py-4">
                        {activity.text.replace(/^DURATION - [^\n]*\n/, "")}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => setEditingActivity(activity)}
                            >
                              <Pencil className="mr-2 h-4 w-4" />
                              {t("activity.edit")}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive"
                              onClick={() => setDeleteId(activity.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              {t("activity.delete")}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>{t("dashboard.tagDistribution")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {sortedTags.map(([tag, count]) => (
              <div
                key={tag}
                className="flex items-center gap-1 px-3 py-1 bg-slate-100 rounded-full"
              >
                <span className="font-medium">{tag}</span>
                <span className="text-sm text-slate-500">({count})</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("activity.deleteConfirm")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("activity.deleteDescription")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("activity.cancel")}</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deleteId) handleDelete(deleteId);
                setDeleteId(null);
              }}
            >
              {t("activity.delete")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {t("dashboard.weekAnalysis")}
            <span
              className="text-sm text-muted-foreground"
              id="analysis-source"
            ></span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.length > 0 ? (
              <div className="p-4 bg-slate-50 rounded-lg">
                <WeekAnalysis activities={activities} />
              </div>
            ) : (
              <p className="text-sm text-slate-600">
                {t("dashboard.noActivities")}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {isDebugUser(user?.email) && (
        <Card>
          <CardHeader>
            <CardTitle>Debug: Raw Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className="p-4 border rounded">
                  <p>
                    <strong>Text:</strong> {activity.text}
                  </p>
                  <p>
                    <strong>Date:</strong> {activity.parsed_date}
                  </p>
                  <p>
                    <strong>Duration:</strong> {activity.duration_minutes}{" "}
                    minutes
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
