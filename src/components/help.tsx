import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Layout from "./shared/layout";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function Help() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Layout>
      <div className="container py-8 max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">{t("help.title")}</h1>
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="text-muted-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("common.back")}
          </Button>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("help.inputFormat.title")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <p className="text-slate-600">
                  {t("help.inputFormat.description")}
                </p>

                <div className="space-y-2">
                  <h3 className="font-semibold">
                    {t("help.components.time.title")}
                  </h3>
                  <p className="text-slate-600">
                    {t("help.components.time.description")}
                  </p>
                  <div className="bg-slate-50 p-3 rounded-md space-y-2">
                    <div>
                      <code className="text-sm">8:00</code>
                    </div>
                    <div>
                      <code className="text-sm">14:30</code>
                    </div>
                    <div>
                      <code className="text-sm">9:45</code>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold">
                    {t("help.components.duration.title")}
                  </h3>
                  <p className="text-slate-600">
                    {t("help.components.duration.description")}
                  </p>
                  <div className="bg-slate-50 p-3 rounded-md space-y-2">
                    <div>
                      <code className="text-sm">30m</code>
                    </div>
                    <div>
                      <code className="text-sm">1h</code>
                    </div>
                    <div>
                      <code className="text-sm">1.5h</code>
                    </div>
                    <div>
                      <code className="text-sm">1:30h</code>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold">
                    {t("help.components.description.title")}
                  </h3>
                  <p className="text-slate-600">
                    {t("help.components.description.description")}
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold">
                    {t("help.components.tags.title")}
                  </h3>
                  <p className="text-slate-600">
                    {t("help.components.tags.description")}
                  </p>
                  <div className="bg-slate-50 p-3 rounded-md space-y-2">
                    <div>
                      <code className="text-sm">#work</code>
                    </div>
                    <div>
                      <code className="text-sm">#meeting</code>
                    </div>
                    <div>
                      <code className="text-sm">#workshop</code>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">{t("help.examples.title")}</h3>
                <div className="bg-slate-50 p-4 rounded-md space-y-2">
                  <div className="space-y-1">
                    <p className="font-medium">
                      8:00 30m příprava na #workshop
                    </p>
                    <p className="text-sm text-slate-500">
                      {t("help.examples.workshop")}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium">
                      14:30 1h týmová schůzka #meeting
                    </p>
                    <p className="text-sm text-slate-500">
                      {t("help.examples.meeting")}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium">
                      10:15 45m code review #development
                    </p>
                    <p className="text-sm text-slate-500">
                      {t("help.examples.review")}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
