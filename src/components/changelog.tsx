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
<<<<<<< HEAD
              Version 1.3.0 (29.1.2025)
=======
              Version 1.3.0 (27.1.2025)
>>>>>>> 0a74fe73010f5756445428cdf9ddb01a84f4fe0b
            </h2>
            <div className="space-y-2">
              <h3 className="text-lg font-medium">✨ New Features</h3>
              <ul className="list-disc list-inside space-y-1 text-slate-600 ml-4">
<<<<<<< HEAD
                <li>Přidána týdenní analýza aktivit s AI</li>
                <li>Vylepšené formátování analýzy pro lepší čitelnost</li>
                <li>
                  Podpora více jazyků v analýze (čeština, angličtina, němčina)
                </li>
                <li>Cachování analýz pro rychlejší načítání</li>
=======
                <li>Added AI-powered weekly activity summaries</li>
                <li>
                  Added detailed help page with input format documentation
                </li>
                <li>Added help button next to activity input</li>
                <li>Added help section to main menu</li>
>>>>>>> 0a74fe73010f5756445428cdf9ddb01a84f4fe0b
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium">🔧 Improvements</h3>
              <ul className="list-disc list-inside space-y-1 text-slate-600 ml-4">
<<<<<<< HEAD
                <li>Optimalizace výkonu při generování analýz</li>
                <li>Vylepšené formátování textu v analýzách</li>
=======
                <li>Updated activity input examples to be more descriptive</li>
                <li>
                  Added comprehensive documentation for time and duration
                  formats
                </li>
                <li>Improved tag suggestions with better examples</li>
                <li>
                  Added caching for weekly summaries to improve performance
                </li>
>>>>>>> 0a74fe73010f5756445428cdf9ddb01a84f4fe0b
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">
              Version 1.2.0 (26.1.2025)
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
              Version 1.1.0 (26.1.2025)
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
              Version 1.0.2 (25.1.2025)
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
              Version 1.0.1 (25.1.2025)
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
              Version 1.0.0 (25.1.2025)
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
