import { useEffect, useState } from "react";
import { Menu, User, LogOut, BarChart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { signOut } from "@/lib/auth";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function Header() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [profile, setProfile] = useState<{
    first_name: string;
    last_name: string;
  } | null>(null);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("user_profiles")
      .select("first_name, last_name")
      .eq("id", user.id)
      .single();

    if (data) {
      setProfile(data);
    }
  };

  return (
    <div className="border-b bg-white">
      <div className="container py-4 mx-auto flex justify-between items-center max-w-4xl">
        <div className="flex items-center gap-4">
          <Button
            variant="link"
            className="text-2xl font-bold p-0 h-auto hover:no-underline"
            onClick={() => navigate("/")}
          >
            Progressor
          </Button>
          {profile && (
            <span className="text-2xl font-bold text-slate-600">
              {profile.first_name} {profile.last_name}
            </span>
          )}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="ml-4">
              <Menu className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => navigate("/")}>
              <Menu className="mr-2 h-4 w-4" />
              {t("common.index")}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/profile")}>
              <User className="mr-2 h-4 w-4" />
              {t("common.profile")}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/dashboard")}>
              <BarChart className="mr-2 h-4 w-4" />
              {t("common.dashboard")}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={signOut}>
              <LogOut className="mr-2 h-4 w-4" />
              {t("common.logout")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
