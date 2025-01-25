import { Globe } from "lucide-react";
import { Button } from "../ui/button";
import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function Footer() {
  const { t, i18n } = useTranslation();

  return (
    <footer className="border-t border-slate-200 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="text-sm text-slate-600">
              © {new Date().getFullYear()} Copyleft Patrick Zandl
            </div>
            <Button
              variant="link"
              className="text-sm text-slate-600 h-auto p-0"
              onClick={() => (window.location.href = "/changelog")}
            >
              {t("common.changelog")}
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-slate-600" />
            <Select
              value={i18n.language}
              onValueChange={(value) => i18n.changeLanguage(value)}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="cs">Čeština</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </footer>
  );
}
