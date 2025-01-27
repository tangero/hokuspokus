import { Suspense } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/shared/layout";
import Home from "./components/home";
import Dashboard from "./components/dashboard";
import AuthForm from "./components/auth/auth-form";
import ResetPasswordForm from "./components/auth/reset-password-form";
import UpdatePasswordForm from "./components/auth/update-password-form";
import Profile from "./components/profile";
import Landing from "./components/landing";
import Help from "./components/help";
import Changelog from "./components/changelog";
import Summary from "./components/summary/summary";
import { useAuth } from "./lib/auth";
import AuthProvider from "./providers/auth-provider";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import routes from "tempo-routes";

function TempoRoutes() {
  return import.meta.env.VITE_TEMPO === "true" ? useRoutes(routes) : null;
}

function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (
    !import.meta.env.VITE_SUPABASE_URL ||
    !import.meta.env.VITE_SUPABASE_ANON_KEY
  ) {
    return (
      <div className="h-screen w-screen flex items-center justify-center flex-col gap-4">
        <h1 className="text-2xl font-bold">Configuration Error</h1>
        <p>Missing Supabase environment variables</p>
      </div>
    );
  }

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Landing />} />
        <Route
          path="/profile"
          element={user ? <Profile /> : <Navigate to="/login" />}
        />
        <Route path="/changelog" element={<Changelog />} />
        <Route path="/help" element={<Help />} />
        <Route
          path="/souhrn"
          element={user ? <Summary /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={
            !user ? (
              <Layout>
                <div className="flex-1 flex items-center justify-center">
                  <AuthForm />
                </div>
              </Layout>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/reset-password"
          element={
            !user ? (
              <Layout>
                <div className="flex-1 flex items-center justify-center">
                  <ResetPasswordForm />
                </div>
              </Layout>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/update-password"
          element={
            <Layout>
              <div className="flex-1 flex items-center justify-center">
                <UpdatePasswordForm />
              </div>
            </Layout>
          }
        />
        <Route path="/tempobook/*" element={<TempoRoutes />} />
      </Routes>
    </Suspense>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
      <Toaster />
      <Analytics />
      <SpeedInsights />
    </AuthProvider>
  );
}

export default App;
