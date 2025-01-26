import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth";
import { useToast } from "./ui/use-toast";
import { useTranslation } from "react-i18next";
import Layout from "./shared/layout";

export default function Profile() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    email: "",
    preferred_language: "",
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (data) {
      setProfile({
        ...data,
        email: user.email || "",
      });
      if (data.preferred_language) {
        i18n.changeLanguage(data.preferred_language);
      }
    } else if (error) {
      // If no profile exists, create one
      await supabase.from("user_profiles").insert({
        id: user.id,
        email: user.email,
        preferred_language: i18n.language,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase.from("user_profiles").upsert({
        id: user.id,
        ...profile,
        updated_at: new Date().toISOString(),
      });

      if (error) throw error;

      if (profile.preferred_language) {
        i18n.changeLanguage(profile.preferred_language);
      }

      toast({
        title: t("profile.updateSuccess"),
        description: t("profile.updateSuccessDesc"),
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        variant: "destructive",
        title: t("profile.updateError"),
        description: t("profile.updateErrorDesc"),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container py-8 max-w-4xl mx-auto">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>{t("profile.settings")}</CardTitle>
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="text-muted-foreground"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("common.back")}
            </Button>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t("auth.email")}</Label>
                <Input id="email" value={profile.email} disabled />
              </div>

              <div className="space-y-2">
                <Label htmlFor="firstName">{t("profile.firstName")}</Label>
                <Input
                  id="firstName"
                  value={profile.first_name}
                  onChange={(e) =>
                    setProfile((prev) => ({
                      ...prev,
                      first_name: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">{t("profile.lastName")}</Label>
                <Input
                  id="lastName"
                  value={profile.last_name}
                  onChange={(e) =>
                    setProfile((prev) => ({
                      ...prev,
                      last_name: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">{t("profile.language")}</Label>
                <Select
                  value={profile.preferred_language}
                  onValueChange={(value) =>
                    setProfile((prev) => ({
                      ...prev,
                      preferred_language: value,
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t("profile.selectLanguage")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="cs">Čeština</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="weekStartsOn">
                  {t("profile.weekStartsOn")}
                </Label>
                <Select
                  value={profile.week_starts_on || "monday"}
                  onValueChange={(value) =>
                    setProfile((prev) => ({
                      ...prev,
                      week_starts_on: value,
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monday">
                      {t("profile.monday")}
                    </SelectItem>
                    <SelectItem value="sunday">
                      {t("profile.sunday")}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" disabled={loading}>
                {loading ? t("profile.saving") : t("profile.saveChanges")}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
