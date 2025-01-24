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
import { signIn, signUp } from "@/lib/auth";
import { useToast } from "@/components/ui/use-toast";

import { useTranslation } from "react-i18next";

export default function AuthForm() {
  const { t } = useTranslation();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        await signUp(email, password);
        toast({
          title: "Registration successful",
          description: "You can now log in with your credentials.",
        });
        setIsLogin(true); // Switch back to login view
        setEmail(""); // Clear form
        setPassword("");
      }
    } catch (error: any) {
      console.error("Auth error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error?.message ||
          error?.error_description ||
          "An error occurred during authentication",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-[350px] shadow-lg border-slate-200">
      <CardHeader>
        <CardTitle>{isLogin ? t("auth.login") : t("auth.signup")}</CardTitle>
        <CardDescription>
          {isLogin ? t("auth.welcome") : t("auth.createAccount")}
        </CardDescription>
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
          <Input
            type="password"
            placeholder={t("auth.password")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading
              ? t("auth.loading")
              : isLogin
                ? t("auth.login")
                : t("auth.signup")}
          </Button>
          <Button
            type="button"
            variant="link"
            className="w-full"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? t("auth.needAccount") : t("auth.haveAccount")}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
