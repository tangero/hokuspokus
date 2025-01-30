import { useEffect, useState } from "react";
import { format } from "date-fns";
import { cs } from "date-fns/locale";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth";
import { Card, CardContent } from "@/components/ui/card";
import ActivityInput from "./activity-input";
import {
  MoreHorizontal,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import PopularTags from "./popular-tags";
import type { Database } from "@/types/supabase";
import { useTranslation } from "react-i18next";

type Activity = Database["public"]["Tables"]["activities"]["Row"];

export default function ActivityList() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const PAGE_SIZE = 10;
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();
  const { t } = useTranslation();

  useEffect(() => {
    if (!user) return;

    const fetchActivities = async () => {
      let query = supabase
        .from("activities")
        .select("*")
        .order("parsed_date", { ascending: false });

      if (selectedTag) {
        query = query.contains("tags", [selectedTag]);
      }

      const { data, error } = await query.range(
        currentPage * PAGE_SIZE,
        (currentPage + 1) * PAGE_SIZE - 1,
      );

      if (error) {
        console.error("Error fetching activities:", error);
        return;
      }

      setActivities(data || []);
      setHasMore(data?.length === PAGE_SIZE);
    };

    fetchActivities();

    const subscription = supabase
      .channel("activities_channel")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "activities",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setActivities((prev) => [payload.new as Activity, ...prev]);
          } else if (payload.eventType === "DELETE") {
            setActivities((prev) =>
              prev.filter((a) => a.id !== payload.old.id),
            );
          } else if (payload.eventType === "UPDATE") {
            setActivities((prev) =>
              prev.map((a) =>
                a.id === payload.new.id ? (payload.new as Activity) : a,
              ),
            );
          }
        },
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user, currentPage, selectedTag]);

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

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <ActivityInput
          editingActivity={editingActivity}
          onCancelEdit={() => setEditingActivity(null)}
        />
        <PopularTags
          onTagClick={(tag) => {
            setSelectedTag(selectedTag === tag ? null : tag);
            setCurrentPage(0);
          }}
          selectedTag={selectedTag}
        />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-center mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
            disabled={currentPage === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            {t("common.newer")}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => p + 1)}
            disabled={!hasMore}
          >
            {t("common.older")}
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>

        {activities.map((activity) => (
          <Card key={activity.id}>
            <CardContent className="h-11 pl-9 pr-10">
              <div className="grid grid-cols-[180px_80px_1fr_48px] gap-2 items-start py-1">
                <div className="text-sm text-muted-foreground flex w-[120px]">
                  {activity.parsed_date &&
                    format(new Date(activity.parsed_date), "d.M.yyyy HH:mm", {
                      locale: cs,
                    })}
                </div>
                <div className="text-sm text-muted-foreground flex">
                  {activity.duration_minutes} {t("common.minutes")}
                </div>
                <TooltipProvider>
                  <Tooltip className="flex justify-center">
                    <TooltipTrigger asChild>
                      <div className="max-w-full overflow-hidden">
                        <p className="truncate whitespace-nowrap">
                          {activity.text.split(" ").map((word, index) =>
                            word.startsWith("#") ? (
                              <span key={index} className="text-primary">
                                {word}{" "}
                              </span>
                            ) : (
                              <span key={index}>{word} </span>
                            ),
                          )}
                        </p>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="max-w-sm">
                      <p className="break-words">{activity.text}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <div className="justify-self-end">
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
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
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
    </div>
  );
}
