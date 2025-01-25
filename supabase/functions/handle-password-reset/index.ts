import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const translations = {
  en: {
    subject: "Reset your password",
    title: "Reset Password",
    description: "Click the link below to reset your password:",
    button: "Reset Password",
  },
  cs: {
    subject: "Obnovení hesla",
    title: "Obnovení hesla",
    description: "Klikněte na odkaz níže pro obnovení hesla:",
    button: "Obnovit heslo",
  },
  de: {
    subject: "Passwort zurücksetzen",
    title: "Passwort zurücksetzen",
    description:
      "Klicken Sie auf den Link unten, um Ihr Passwort zurückzusetzen:",
    button: "Passwort zurücksetzen",
  },
};

serve(async (req) => {
  const { email, language = "en" } = await req.json();
  const t = translations[language] || translations.en;

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? "",
  );

  const { data, error } = await supabaseClient.auth.resetPasswordForEmail(
    email,
    {
      redirectTo: `${req.headers.get("origin")}/update-password`,
    },
  );

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ data }), {
    headers: { "Content-Type": "application/json" },
  });
});
