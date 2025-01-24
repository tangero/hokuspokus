import { useEffect, useState } from "react";
import { format } from "date-fns";
import { cs } from "date-fns/locale";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import ActivityInput from "./activity-input";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
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
import type { Database } from "@/types/supabase";
import { useTranslation } from "react-i18next";

type Activity = Database["public"]["Tables"]["activities"]["Row"];

export default function ActivityList() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();
  const { t } = useTranslation();

  useEffect(() => {
    if (!user) return;

    // Initial fetch
    const fetchActivities = async () => {
      const { data } = await supabase
        .from("activities")
        .select("*")
        .order("parsed_date", { ascending: false });

      if (data) setActivities(data);
    };

    fetchActivities();

    // Subscribe to changes
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
  }, [user]);

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
      <ActivityInput
        editingActivity={editingActivity}
        onCancelEdit={() => setEditingActivity(null)}
      />
      <div className="space-y-4">
        {activities.map((activity) => (
          <Card key={activity.id}>
            <CardContent className="pt-4">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <p>{activity.text}</p>
                  <div className="flex gap-2 mt-2">
                    {activity.tags?.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="text-sm text-muted-foreground">
                    {activity.parsed_date && (
                      <p>
                        {format(new Date(activity.parsed_date), "Pp", {
                          locale: cs,
                        })}
                      </p>
                    )}
                    {activity.duration_minutes && (
                      <p>
                        {activity.duration_minutes} {t("common.minutes")}
                      </p>
                    )}
                  </div>
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
