import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";
import Layout from "./shared/layout";

export default function Changelog() {
  const { t } = useTranslation();

  return (
    <Layout>
      <div className="container py-8 max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">{t("common.changelog")}</h1>
          <Button
            variant="ghost"
            onClick={() => window.history.back()}
            className="text-muted-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("common.back")}
          </Button>
        </div>

        <div className="space-y-12">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">
              Version 1.0.0 (2024-03-27)
            </h2>
            <div className="space-y-2">
              <h3 className="text-lg font-medium">✨ Initial Release</h3>
              <ul className="list-disc list-inside space-y-1 text-slate-600 ml-4">
                <li>Authentication with email and Google</li>
                <li>Activity tracking with natural language input</li>
                <li>Hashtag support for activity categorization</li>
                <li>Multi-language support (English, Czech, German)</li>
                <li>User profile management</li>
                <li>Responsive design</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
