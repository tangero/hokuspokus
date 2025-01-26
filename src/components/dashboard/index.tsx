import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Layout from "../shared/layout";
import ActivityDashboard from "./activity-dashboard";

export default function Dashboard() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Layout>
      <div className="container py-8 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">{t("dashboard.title")}</h1>
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="text-muted-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("common.back")}
          </Button>
        </div>

        <ActivityDashboard />
      </div>
    </Layout>
  );
}
