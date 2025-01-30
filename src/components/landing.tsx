import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Layout from "./shared/layout";
import { ArrowRight, Clock, Hash, BarChart } from "lucide-react";

export default function Landing() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Layout>
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="bg-white p-4 rounded-lg shadow-md border border-slate-200 mb-6">
            <div className="flex items-center justify-center gap-2 text-sm text-slate-600 mb-2">
              <span className="font-mono bg-slate-100 px-2 py-1 rounded">
                25.1. 10:00 1h {t("landing.example.activity")} #demoday
              </span>
            </div>
            <p className="text-sm text-slate-600">
              {t("landing.example.description")}
            </p>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent md:h-16">
            Progressor
          </h1>
          <p className="text-xl md:text-2xl text-slate-600">
            {t("landing.title")}
          </p>
          <div className="pt-4">
            <Button
              size="lg"
              onClick={() => navigate("/login")}
              className="bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600"
            >
              {t("landing.getStarted")} <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <div className="h-12 w-12 rounded-lg bg-slate-100 flex items-center justify-center mb-4">
              <Clock className="h-6 w-6 text-slate-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              {t("landing.features.timeInput.title")}
            </h3>
            <p className="text-slate-600">
              {t("landing.features.timeInput.description")}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <div className="h-12 w-12 rounded-lg bg-slate-100 flex items-center justify-center mb-4">
              <Hash className="h-6 w-6 text-slate-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              {t("landing.features.tagging.title")}
            </h3>
            <p className="text-slate-600">
              {t("landing.features.tagging.description")}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <div className="h-12 w-12 rounded-lg bg-slate-100 flex items-center justify-center mb-4">
              <BarChart className="h-6 w-6 text-slate-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              {t("landing.features.insights.title")}
            </h3>
            <p className="text-slate-600">
              {t("landing.features.insights.description")}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
