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
import i18n from "@/i18n";

export default function ResetPasswordForm() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      });

      setSent(true);
      toast({
        title: t("auth.resetPasswordSuccess"),
        description: t("auth.resetPasswordSuccessDesc"),
      });
    } catch (error: any) {
      console.error("Reset password error:", error);
      toast({
        variant: "destructive",
        title: t("auth.error"),
        description: error?.message || t("auth.resetPasswordError"),
      });
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>{t("auth.checkYourEmail")}</CardTitle>
          <CardDescription>{t("auth.resetPasswordSent")}</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{t("auth.resetPassword")}</CardTitle>
        <CardDescription>{t("auth.resetPasswordDesc")}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder={t("auth.email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? t("auth.sending") : t("auth.sendResetLink")}
          </Button>
          <Button
            type="button"
            variant="link"
            className="w-full"
            onClick={() => window.history.back()}
          >
            {t("auth.backToLogin")}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
