import { Suspense } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import AuthForm from "./components/auth/auth-form";
import ResetPasswordForm from "./components/auth/reset-password-form";
import UpdatePasswordForm from "./components/auth/update-password-form";
import Profile from "./components/profile";
import Landing from "./components/landing";
import Changelog from "./components/changelog";
import { useAuth } from "./lib/auth";
import AuthProvider from "./providers/auth-provider";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import routes from "tempo-routes";

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
        <Route
          path="/login"
          element={
            !user ? (
              <div className="h-screen w-screen flex items-center justify-center bg-slate-50">
                <AuthForm />
              </div>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/reset-password"
          element={
            !user ? (
              <div className="h-screen w-screen flex items-center justify-center bg-slate-50">
                <ResetPasswordForm />
              </div>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/update-password"
          element={
            <div className="h-screen w-screen flex items-center justify-center bg-slate-50">
              <UpdatePasswordForm />
            </div>
          }
        />
        {import.meta.env.VITE_TEMPO === "true" && (
          <Route path="/tempobook/*" element={useRoutes(routes)} />
        )}
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
