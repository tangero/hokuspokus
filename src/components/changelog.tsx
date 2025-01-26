import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Layout from "./shared/layout";

export default function Changelog() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Layout>
      <div className="container py-8 max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">{t("common.changelog")}</h1>
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="text-muted-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("common.back")}
          </Button>
        </div>

        <div className="space-y-12">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">
              Version 1.2.0 (2024-03-28)
            </h2>
            <div className="space-y-2">
              <h3 className="text-lg font-medium">✨ New Features</h3>
              <ul className="list-disc list-inside space-y-1 text-slate-600 ml-4">
                <li>Improved tag suggestions with frequency-based sorting</li>
                <li>Added Tab key support for quick tag selection</li>
                <li>Enhanced tag filtering in activity input</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium">🔧 Bug Fixes</h3>
              <ul className="list-disc list-inside space-y-1 text-slate-600 ml-4">
                <li>
                  Fixed double hashtag display in activity list and tag cloud
                </li>
                <li>Fixed tag filtering in suggestions dropdown</li>
                <li>
                  Fixed browser console errors related to Chrome extensions
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">
              Version 1.1.0 (2024-03-28)
            </h2>
            <div className="space-y-2">
              <h3 className="text-lg font-medium">🔧 Improvements</h3>
              <ul className="list-disc list-inside space-y-1 text-slate-600 ml-4">
                <li>Fixed realtime updates in activity dashboard</li>
                <li>
                  Improved date handling in activity parser - now uses current
                  year
                </li>
                <li>Fixed activity filtering in daily view</li>
                <li>Enhanced activity list refresh after edits</li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">
              Version 1.0.2 (2024-03-27)
            </h2>
            <div className="space-y-2">
              <h3 className="text-lg font-medium">✨ New Features</h3>
              <ul className="list-disc list-inside space-y-1 text-slate-600 ml-4">
                <li>Added password reset functionality</li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">
              Version 1.0.1 (2024-03-27)
            </h2>
            <div className="space-y-2">
              <h3 className="text-lg font-medium">🔧 Fixes</h3>
              <ul className="list-disc list-inside space-y-1 text-slate-600 ml-4">
                <li>Fixed Vercel Speed Insights integration</li>
              </ul>
            </div>
          </div>

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
                <li>Performance monitoring with Vercel Speed Insights</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
