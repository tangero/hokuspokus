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
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
            Progressor
          </h1>
          <p className="text-xl md:text-2xl text-slate-600">
            Track your activities effortlessly with natural language input
          </p>
          <div className="pt-4">
            <Button
              size="lg"
              onClick={() => navigate("/login")}
              className="bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600"
            >
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
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
            <h3 className="text-xl font-semibold mb-2">Natural Time Input</h3>
            <p className="text-slate-600">
              Enter activities using natural language with flexible date and
              time formats
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <div className="h-12 w-12 rounded-lg bg-slate-100 flex items-center justify-center mb-4">
              <Hash className="h-6 w-6 text-slate-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Smart Tagging</h3>
            <p className="text-slate-600">
              Organize your activities with hashtags for easy categorization and
              filtering
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <div className="h-12 w-12 rounded-lg bg-slate-100 flex items-center justify-center mb-4">
              <BarChart className="h-6 w-6 text-slate-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Insights</h3>
            <p className="text-slate-600">
              Track your progress and get insights into how you spend your time
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
