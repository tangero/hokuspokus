import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function UpdatePasswordForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) throw error;

      toast({
        title: t("auth.passwordUpdated"),
        description: t("auth.passwordUpdatedDesc"),
      });

      navigate("/login");
    } catch (error: any) {
      console.error("Update password error:", error);
      toast({
        variant: "destructive",
        title: t("auth.error"),
        description: error?.message || t("auth.updatePasswordError"),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{t("auth.updatePassword")}</CardTitle>
        <CardDescription>{t("auth.updatePasswordDesc")}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="password"
            placeholder={t("auth.newPassword")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? t("auth.updating") : t("auth.updatePassword")}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
