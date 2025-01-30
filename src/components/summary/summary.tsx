import { useState, useEffect } from "react";
import Layout from "../shared/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { startOfWeek, endOfWeek } from "date-fns";
import { Button } from "@/components/ui/button";
import { Loader2, BarChart, Share2, Calendar } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { generateSummary } from "@/lib/deepseek";
import { generateActivitiesHash } from "@/lib/utils/hash";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { format } from "date-fns";
import type { WeeklySummary } from "@/lib/types";
import { useToast } from "@/components/ui/use-toast";
import Markdown from "markdown-to-jsx";

export default function Summary() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [debug, setDebug] = useState<string[]>([]);
  const [checkingCache, setCheckingCache] = useState(true);
  const [selectedWeek, setSelectedWeek] = useState<{
    start: Date;
    end: Date;
  } | null>(null);
  const [availableWeeks, setAvailableWeeks] = useState<
    { start: Date; end: Date; count: number }[]
  >([]);
  const [activityCount, setActivityCount] = useState(0);
  const [lastCachedSummary, setLastCachedSummary] =
    useState<WeeklySummary | null>(null);

  const isDebugUser = user?.email?.endsWith("@marigold.cz") ?? false;

  useEffect(() => {
    if (!user) return;
    fetchAvailableWeeks();
  }, [user]);

  const fetchAvailableWeeks = async () => {
    try {
      const { data: activities } = await supabase
        .from("activities")
        .select("parsed_date")
        .eq("user_id", user?.id)
        .order("parsed_date", { ascending: true });

      if (!activities?.length) return;

      const weeks = new Map<
        string,
        { start: Date; end: Date; count: number }
      >();

      activities.forEach((activity) => {
        if (!activity.parsed_date) return;
        const date = new Date(activity.parsed_date);
        const weekStart = startOfWeek(date, { weekStartsOn: 1 });
        const weekEnd = endOfWeek(date, { weekStartsOn: 1 });
        const weekKey = weekStart.toISOString();

        if (!weeks.has(weekKey)) {
          weeks.set(weekKey, { start: weekStart, end: weekEnd, count: 1 });
        } else {
          const week = weeks.get(weekKey)!;
          week.count++;
        }
      });

      const availableWeeks = Array.from(weeks.values())
        .filter((week) => week.count >= 10)
        .sort((a, b) => b.start.getTime() - a.start.getTime());

      setAvailableWeeks(availableWeeks);

      if (availableWeeks.length > 0) {
        setSelectedWeek(availableWeeks[0]);
        await fetchActivities(availableWeeks[0].start, availableWeeks[0].end);
      }
    } catch (error) {
      console.error("Error fetching available weeks:", error);
      setError(t("summary.error"));
    }
  };

  const fetchActivities = async (start: Date, end: Date) => {
    if (!user) return;

    try {
      setCheckingCache(true);
      setError(null);

      const { data: activities, error } = await supabase
        .from("activities")
        .select("*")
        .eq("user_id", user.id)
        .gte("parsed_date", start.toISOString())
        .lt("parsed_date", end.toISOString())
        .order("parsed_date", { ascending: false });

      if (error) throw error;

      setActivityCount(activities?.length || 0);

      if (activities && activities.length >= 10) {
        // Generate hash for current activities
        const activitiesHash = generateActivitiesHash(activities);

        // Check for cached summary
        const { data: summaries } = await supabase
          .from("weekly_summaries")
          .select("*")
          .eq("user_id", user.id)
          .eq("activities_hash", activitiesHash)
          .order("created_at", { ascending: false })
          .limit(1);

        if (summaries && summaries.length > 0) {
          setSummary(summaries[0].content);
          if (isDebugUser) {
            setDebug((prev) => [
              ...prev,
              `Found cached summary with hash ${activitiesHash}`,
            ]);
          }
        }
      }

      // Fetch last cached summary if no current summary
      if (!summary) {
        const { data: lastSummary } = await supabase
          .from("weekly_summaries")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(1);

        if (lastSummary && lastSummary.length > 0) {
          setLastCachedSummary(lastSummary[0]);
        }
      }
    } catch (error) {
      console.error("Error fetching activities:", error);
      setError(t("summary.error"));
      if (isDebugUser) {
        setDebug((prev) => [
          ...prev,
          `Error fetching activities: ${error.message}`,
        ]);
      }
    } finally {
      setCheckingCache(false);
    }
    try {
      setCheckingCache(true);
      setError(null);

      // Fetch activities for the last week
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 7);

      const { data: activities, error } = await supabase
        .from("activities")
        .select("*")
        .eq("user_id", user?.id)
        .gte("parsed_date", startDate.toISOString())
        .order("parsed_date", { ascending: false });

      if (error) throw error;

      setActivityCount(activities?.length || 0);

      if (activities && activities.length >= 10) {
        // Check if we have a cached summary
        const activitiesHash = generateActivitiesHash(activities);
        const { data: summaries } = await supabase
          .from("weekly_summaries")
          .select("*")
          .eq("user_id", user?.id)
          .eq("activities_hash", activitiesHash)
          .order("created_at", { ascending: false })
          .limit(1);

        if (summaries && summaries.length > 0) {
          setSummary(summaries[0].content);
          if (isDebugUser) {
            setDebug((prev) => [
              ...prev,
              `Found cached summary with hash ${activitiesHash}`,
            ]);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching activities:", error);
      setError(t("summary.error"));
      if (isDebugUser) {
        setDebug((prev) => [
          ...prev,
          `Error fetching activities: ${error.message}`,
        ]);
      }
    } finally {
      setCheckingCache(false);
    }
  };

  const handleGenerateSummary = async () => {
    if (!selectedWeek) return;

    try {
      setLoading(true);
      setError(null);

      // Fetch activities for the selected week
      const { data: activities, error } = await supabase
        .from("activities")
        .select("*")
        .eq("user_id", user?.id)
        .gte("parsed_date", selectedWeek.start.toISOString())
        .lt("parsed_date", selectedWeek.end.toISOString())
        .order("parsed_date", { ascending: false });

      if (error) throw error;

      if (!activities || activities.length < 10) {
        throw new Error(t("summary.notEnoughActivities"));
      }

      // Generate hash for the current activities
      const activitiesHash = generateActivitiesHash(activities);

      // Check if we have a cached summary with this hash
      const { data: summaries } = await supabase
        .from("weekly_summaries")
        .select("*")
        .eq("user_id", user?.id)
        .eq("activities_hash", activitiesHash)
        .order("created_at", { ascending: false })
        .limit(1);

      if (summaries && summaries.length > 0) {
        // Use cached summary
        setSummary(summaries[0].content);
        if (isDebugUser) {
          setDebug((prev) => [
            ...prev,
            `Using cached summary with hash ${activitiesHash}`,
          ]);
        }
        return;
      }

      // No cached summary found, generate new one
      const summary = await generateSummary(activities);

      // Cache the summary
      const { error: insertError } = await supabase
        .from("weekly_summaries")
        .insert({
          user_id: user?.id,
          content: summary,
          activities_hash: activitiesHash,
          start_date: selectedWeek.start.toISOString(),
          end_date: selectedWeek.end.toISOString(),
        });

      if (insertError) throw insertError;

      setSummary(summary);
    } catch (error) {
      console.error("Error generating summary:", error);
      setError(error.message || t("summary.error"));
      if (isDebugUser) {
        setDebug((prev) => [
          ...prev,
          `Error generating summary: ${error.message}`,
        ]);
      }
    } finally {
      setLoading(false);
    }
    try {
      setLoading(true);
      setError(null);

      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 7);

      const { data: activities, error } = await supabase
        .from("activities")
        .select("*")
        .eq("user_id", user?.id)
        .gte("parsed_date", startDate.toISOString())
        .order("parsed_date", { ascending: false });

      if (error) throw error;

      if (!activities || activities.length < 10) {
        throw new Error(t("summary.notEnoughActivities"));
      }

      const activitiesHash = generateActivitiesHash(activities);
      if (isDebugUser) {
        setDebug((prev) => [
          ...prev,
          `Generating summary for activities with hash ${activitiesHash}`,
        ]);
      }

      const summary = await generateSummary(activities);

      // Cache the summary
      const { error: insertError } = await supabase
        .from("weekly_summaries")
        .insert({
          user_id: user?.id,
          content: summary,
          activities_hash: activitiesHash,
          start_date: startDate.toISOString(),
          end_date: new Date().toISOString(),
        });

      if (insertError) throw insertError;

      setSummary(summary);
    } catch (error) {
      console.error("Error generating summary:", error);
      setError(error.message || t("summary.error"));
      if (isDebugUser) {
        setDebug((prev) => [
          ...prev,
          `Error generating summary: ${error.message}`,
        ]);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container py-8 max-w-4xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 max-w-2xl mx-auto"
        >
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
            {t("summary.marketing.title")}
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {t("summary.marketing.features", { returnObjects: true }).map(
              (feature, index) => (
                <div
                  key={index}
                  className="p-4 bg-white rounded-lg shadow-sm border border-slate-100"
                >
                  <p className="text-sm font-medium text-slate-900">
                    {feature}
                  </p>
                </div>
              ),
            )}
          </div>
          <p className="text-lg text-slate-600 leading-relaxed">
            {t("summary.description")}
          </p>
        </motion.div>

        <AnimatePresence>
          {!checkingCache && activityCount < 10 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-br from-slate-50 to-slate-100 border rounded-lg p-8"
            >
              <div className="grid md:grid-cols-[1fr,2fr] gap-8 items-center">
                <div className="text-center md:text-left space-y-4">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto md:mx-0">
                    <Calendar className="w-8 h-8 text-slate-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-slate-900">
                    {t("summary.notEnoughActivitiesTitle")}
                  </h2>
                  <p className="text-slate-600">
                    {t("summary.notEnoughActivitiesDescription")}
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-lg shadow-sm space-y-2">
                    <div className="flex justify-between text-sm text-slate-600 mb-2">
                      <span>{activityCount} / 10</span>
                      <span>{Math.round((activityCount / 10) * 100)}%</span>
                    </div>
                    <Progress
                      value={(activityCount / 10) * 100}
                      className="h-2"
                    />
                    <p className="text-sm text-slate-500 mt-2">
                      {t("summary.currentCount", { count: activityCount })}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="w-5 h-5" />
                {selectedWeek
                  ? t("summary.title", {
                      startDate: format(selectedWeek.start, "d.M.yyyy"),
                      endDate: format(selectedWeek.end, "d.M.yyyy"),
                    })
                  : t("summary.selectWeek")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4 mb-4">
                <Select
                  onValueChange={(value) => {
                    const [start, end] = value.split("|");
                    setSelectedWeek({
                      start: new Date(start),
                      end: new Date(end),
                    });
                  }}
                  value={
                    selectedWeek
                      ? `${selectedWeek.start.toISOString()}|${selectedWeek.end.toISOString()}`
                      : undefined
                  }
                >
                  <SelectTrigger className="w-[250px]">
                    <SelectValue placeholder={t("summary.selectWeek")} />
                  </SelectTrigger>
                  <SelectContent>
                    {availableWeeks.map((week) => (
                      <SelectItem
                        key={`${week.start.toISOString()}`}
                        value={`${week.start.toISOString()}|${week.end.toISOString()}`}
                      >
                        {format(week.start, "d.M.yyyy")} -{" "}
                        {format(week.end, "d.M.yyyy")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button
                  onClick={handleGenerateSummary}
                  disabled={loading || !selectedWeek}
                  size="default"
                >
                  {loading && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <Loader2 className="mr-2 h-4 w-4" />
                    </motion.div>
                  )}
                  {loading ? t("summary.generating") : t("summary.viewSummary")}
                </Button>
              </div>

              {checkingCache ? (
                <div className="flex items-center justify-center py-8">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Loader2 className="h-8 w-8 text-slate-400" />
                  </motion.div>
                </div>
              ) : null}

              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-destructive bg-destructive/10 p-3 rounded-md"
                >
                  {error}
                </motion.div>
              )}

              {summary && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="p-6 bg-muted rounded-lg">
                    <Markdown
                      className="prose prose-slate max-w-none prose-headings:mt-8 prose-headings:mb-4 prose-p:my-4 prose-ul:my-6 prose-li:my-1"
                      options={{
                        overrides: {
                          h1: {
                            component: ({ children, ...props }) => (
                              <motion.h1
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                                {...props}
                                className="text-3xl font-bold text-slate-900 mt-8 mb-4"
                              >
                                {children}
                              </motion.h1>
                            ),
                          },
                          h2: {
                            component: ({ children, ...props }) => (
                              <motion.h2
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: 0.1 }}
                                {...props}
                                className="text-2xl font-bold text-slate-900 mt-8 mb-4"
                              >
                                {children}
                              </motion.h2>
                            ),
                          },
                          p: {
                            component: ({ children, ...props }) => (
                              <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                {...props}
                                className="my-4 text-slate-600 leading-relaxed"
                              >
                                {children}
                              </motion.p>
                            ),
                          },
                          ul: {
                            component: ({ children, ...props }) => (
                              <motion.ul
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                {...props}
                                className="my-6 space-y-1 list-disc list-inside pl-4"
                              >
                                {children}
                              </motion.ul>
                            ),
                          },
                        },
                      }}
                    >
                      {summary}
                    </Markdown>
                  </div>

                  <div className="flex justify-between items-center mt-6 pt-4 border-t">
                    <div className="text-sm text-slate-500">
                      {t("summary.generatedAt", {
                        date: format(new Date(), "PPp"),
                      })}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        navigator.clipboard.writeText(summary);
                        toast({
                          title: t("summary.copied"),
                          description: t("summary.copiedDesc"),
                        });
                      }}
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      {t("summary.copyMarkdown")}
                    </Button>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {!summary && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>{t("summary.lastSummary")}</CardTitle>
              </CardHeader>
              <CardContent>
                {lastCachedSummary ? (
                  <div className="p-6 bg-muted rounded-lg">
                    <Markdown className="prose prose-slate max-w-none">
                      {lastCachedSummary.content}
                    </Markdown>
                    <div className="mt-4 text-sm text-slate-500">
                      {t("summary.generatedAt", {
                        date: format(
                          new Date(lastCachedSummary.created_at),
                          "PPp",
                        ),
                      })}
                    </div>
                  </div>
                ) : (
                  <p className="text-slate-600">{t("summary.noSummaryYet")}</p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {isDebugUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Debug Log</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-900 text-slate-50 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  {debug.map((log, index) => (
                    <div key={index} className="whitespace-pre-wrap">
                      [{new Date().toISOString()}] {log}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </Layout>
  );
}
