import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const i18n = i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          auth: {
            login: "Login",
            signup: "Sign Up",
            email: "Email",
            password: "Password",
            needAccount: "Need an account?",
            haveAccount: "Already have an account?",
            welcome: "Welcome back!",
            createAccount: "Create a new account",
            loading: "Loading...",
            orContinueWith: "Or continue with",
            forgotPassword: "Forgot password?",
            resetPassword: "Reset Password",
            resetPasswordDesc:
              "Enter your email to receive a password reset link",
            sendResetLink: "Send Reset Link",
            sending: "Sending...",
            checkYourEmail: "Check your email",
            resetPasswordSent:
              "We've sent you a password reset link. Please check your email.",
            resetPasswordSuccess: "Reset link sent",
            resetPasswordSuccessDesc:
              "Check your email for the password reset link.",
            resetPasswordError: "Failed to send reset link",
            backToLogin: "Back to login",
            updatePassword: "Update Password",
            updatePasswordDesc: "Enter your new password",
            newPassword: "New password",
            updating: "Updating...",
            passwordUpdated: "Password updated",
            passwordUpdatedDesc: "Your password has been successfully updated.",
            updatePasswordError: "Failed to update password",
            error: "Error",
          },
          activity: {
            placeholder:
              "What are you doing? E.g: 22.1. 30m Work on project #project",
            add: "Add",
            edit: "Edit",
            delete: "Delete",
            cancel: "Cancel",
            saving: "Saving...",
            deleteConfirm: "Are you sure you want to delete this activity?",
            deleteDescription: "This action cannot be undone.",
            deleteSuccess: "Activity deleted",
            deleteSuccessDesc: "Activity was successfully deleted.",
            error: "Error",
            deleteError: "Failed to delete activity.",
            time: "Time",
            duration: "Duration",
            description: "Description",
            popularTags: "Popular Tags",
          },
          landing: {
            title: "Only DONE counts on the way to the goal!",
            getStarted: "Get Started",
            example: {
              activity: "Budget preparation for project",
              description:
                "Simply write what you've done - we'll automatically recognize the date, time, duration, and hashtags!",
            },
            features: {
              timeInput: {
                title: "Natural Time Input",
                description:
                  "Enter activities using natural language with flexible date and time formats",
              },
              tagging: {
                title: "Smart Tagging",
                description:
                  "Organize your activities with hashtags for easy categorization and filtering",
              },
              insights: {
                title: "Insights",
                description:
                  "Track your progress and get insights into how you spend your time",
              },
            },
          },
          common: {
            loading: "Loading...",
            logout: "Logout",
            minutes: "min",
            profile: "Profile",
            back: "Back",
            changelog: "Changelog",
            dashboard: "Dashboard",
            index: "Index",
            newer: "Newer",
            older: "Older",
          },
          dashboard: {
            title: "Activity Dashboard",
            weeklyActivity: "Weekly Activity",
            timeDistribution: "Time Distribution",
            hours: "Hours",
            average: "Average",
            averageLine: "Average",
            tagDistribution: "Tag Distribution",
            weekAnalysis: "Week Analysis",
            noActivities: "No activities recorded for this week.",
          },
          profile: {
            settings: "Profile Settings",
            firstName: "First Name",
            lastName: "Last Name",
            language: "Preferred Language",
            selectLanguage: "Select language",
            saveChanges: "Save Changes",
            saving: "Saving...",
            updateSuccess: "Profile updated",
            updateSuccessDesc: "Your profile has been successfully updated.",
            updateError: "Error",
            updateErrorDesc: "Failed to update profile.",
            weekStartsOn: "Week starts on",
            monday: "Monday",
            sunday: "Sunday",
          },
        },
      },
      cs: {
        translation: {
          auth: {
            login: "Přihlásit",
            signup: "Registrovat",
            email: "Email",
            password: "Heslo",
            needAccount: "Potřebujete účet?",
            haveAccount: "Již máte účet?",
            welcome: "Vítejte zpět!",
            createAccount: "Vytvořit nový účet",
            loading: "Načítání...",
            orContinueWith: "Nebo pokračujte s",
            forgotPassword: "Zapomenuté heslo?",
            resetPassword: "Reset hesla",
            resetPasswordDesc:
              "Zadejte email pro zaslání odkazu na reset hesla",
            sendResetLink: "Odeslat odkaz",
            sending: "Odesílám...",
            checkYourEmail: "Zkontrolujte email",
            resetPasswordSent:
              "Poslali jsme vám odkaz na reset hesla. Prosím zkontrolujte svůj email.",
            resetPasswordSuccess: "Odkaz odeslán",
            resetPasswordSuccessDesc:
              "Zkontrolujte svůj email pro odkaz na reset hesla.",
            resetPasswordError: "Nepodařilo se odeslat odkaz na reset hesla",
            backToLogin: "Zpět na přihlášení",
            updatePassword: "Aktualizovat heslo",
            updatePasswordDesc: "Zadejte nové heslo",
            newPassword: "Nové heslo",
            updating: "Aktualizuji...",
            passwordUpdated: "Heslo aktualizováno",
            passwordUpdatedDesc: "Vaše heslo bylo úspěšně aktualizováno.",
            updatePasswordError: "Nepodařilo se aktualizovat heslo",
            error: "Chyba",
          },
          activity: {
            placeholder: "Co děláš? Např: 22.1. 30m Práce na projektu #projekt",
            add: "Přidat",
            edit: "Upravit",
            delete: "Smazat",
            cancel: "Zrušit",
            saving: "Ukládám...",
            deleteConfirm: "Opravdu chcete smazat tuto aktivitu?",
            deleteDescription: "Tato akce je nevratná.",
            deleteSuccess: "Aktivita smazána",
            deleteSuccessDesc: "Aktivita byla úspěšně smazána.",
            error: "Chyba",
            deleteError: "Nepodařilo se smazat aktivitu.",
            time: "Čas",
            duration: "Trvání",
            description: "Popis",
            popularTags: "Oblíbené tagy",
          },
          landing: {
            title: "Jen HOTOVÉ se počítá na cestě k cíli!",
            getStarted: "Začít",
            example: {
              activity: "Příprava rozpočtu pro projekt",
              description:
                "Jednoduše napište, co jste udělali - datum, čas, trvání a hashtagy automaticky rozpoznáme!",
            },
            features: {
              timeInput: {
                title: "Přirozený vstup času",
                description:
                  "Zadávejte aktivity pomocí přirozeného jazyka s flexibilními formáty data a času",
              },
              tagging: {
                title: "Chytré štítkování",
                description:
                  "Organizujte své aktivity pomocí hashtagů pro snadnou kategorizaci a filtrování",
              },
              insights: {
                title: "Přehledy",
                description:
                  "Sledujte svůj pokrok a získejte přehled o tom, jak trávíte svůj čas",
              },
            },
          },
          common: {
            loading: "Načítání...",
            logout: "Odhlásit",
            minutes: "min",
            profile: "Profil",
            back: "Zpět",
            changelog: "Historie změn",
            dashboard: "Dashboard",
            index: "Index",
            newer: "Novější",
            older: "Starší",
          },
          dashboard: {
            title: "Přehled aktivit",
            weeklyActivity: "Týdenní aktivita",
            timeDistribution: "Rozložení času",
            hours: "Hodiny",
            average: "Průměr",
            averageLine: "Průměr",
            tagDistribution: "Rozložení tagů",
            weekAnalysis: "Analýza týdne",
            noActivities: "Žádné aktivity pro tento týden.",
          },
          profile: {
            settings: "Nastavení profilu",
            firstName: "Jméno",
            lastName: "Příjmení",
            language: "Preferovaný jazyk",
            selectLanguage: "Vyberte jazyk",
            saveChanges: "Uložit změny",
            saving: "Ukládám...",
            updateSuccess: "Profil aktualizován",
            updateSuccessDesc: "Váš profil byl úspěšně aktualizován.",
            updateError: "Chyba",
            updateErrorDesc: "Nepodařilo se aktualizovat profil.",
            weekStartsOn: "Týden začíná",
            monday: "Pondělí",
            sunday: "Neděle",
          },
        },
      },
      de: {
        translation: {
          auth: {
            login: "Anmelden",
            signup: "Registrieren",
            email: "E-Mail",
            password: "Passwort",
            needAccount: "Noch kein Konto?",
            haveAccount: "Bereits ein Konto?",
            welcome: "Willkommen zurück!",
            createAccount: "Neues Konto erstellen",
            loading: "Laden...",
            orContinueWith: "Oder fortfahren mit",
            forgotPassword: "Passwort vergessen?",
            resetPassword: "Passwort zurücksetzen",
            resetPasswordDesc:
              "Geben Sie Ihre E-Mail-Adresse ein, um einen Link zum Zurücksetzen des Passworts zu erhalten",
            sendResetLink: "Link senden",
            sending: "Senden...",
            checkYourEmail: "Überprüfen Sie Ihre E-Mail",
            resetPasswordSent:
              "Wir haben Ihnen einen Link zum Zurücksetzen des Passworts gesendet. Bitte überprüfen Sie Ihre E-Mail.",
            resetPasswordSuccess: "Link gesendet",
            resetPasswordSuccessDesc:
              "Überprüfen Sie Ihre E-Mail für den Link zum Zurücksetzen des Passworts.",
            resetPasswordError: "Fehler beim Senden des Reset-Links",
            backToLogin: "Zurück zur Anmeldung",
            updatePassword: "Passwort aktualisieren",
            updatePasswordDesc: "Geben Sie Ihr neues Passwort ein",
            newPassword: "Neues Passwort",
            updating: "Aktualisiere...",
            passwordUpdated: "Passwort aktualisiert",
            passwordUpdatedDesc: "Ihr Passwort wurde erfolgreich aktualisiert.",
            updatePasswordError: "Fehler beim Aktualisieren des Passworts",
            error: "Fehler",
          },
          activity: {
            placeholder:
              "Was machst du? Z.B: 22.1. 30m Arbeit am Projekt #projekt",
            add: "Hinzufügen",
            edit: "Bearbeiten",
            delete: "Löschen",
            cancel: "Abbrechen",
            saving: "Speichern...",
            deleteConfirm: "Möchten Sie diese Aktivität wirklich löschen?",
            deleteDescription:
              "Diese Aktion kann nicht rückgängig gemacht werden.",
            deleteSuccess: "Aktivität gelöscht",
            deleteSuccessDesc: "Die Aktivität wurde erfolgreich gelöscht.",
            error: "Fehler",
            deleteError: "Aktivität konnte nicht gelöscht werden.",
            time: "Zeit",
            duration: "Dauer",
            description: "Beschreibung",
            popularTags: "Beliebte Tags",
          },
          landing: {
            title: "Nur ERLEDIGT zählt auf dem Weg zum Ziel!",
            getStarted: "Loslegen",
            example: {
              activity: "Budgetvorbereitung für Projekt",
              description:
                "Schreiben Sie einfach auf, was Sie gemacht haben - wir erkennen automatisch Datum, Uhrzeit, Dauer und Hashtags!",
            },
            features: {
              timeInput: {
                title: "Natürliche Zeiteingabe",
                description:
                  "Geben Sie Aktivitäten in natürlicher Sprache mit flexiblen Datums- und Zeitformaten ein",
              },
              tagging: {
                title: "Intelligentes Tagging",
                description:
                  "Organisieren Sie Ihre Aktivitäten mit Hashtags für einfache Kategorisierung und Filterung",
              },
              insights: {
                title: "Einblicke",
                description:
                  "Verfolgen Sie Ihren Fortschritt und erhalten Sie Einblicke in Ihre Zeitnutzung",
              },
            },
          },
          common: {
            loading: "Laden...",
            logout: "Abmelden",
            minutes: "min",
            profile: "Profil",
            back: "Zurück",
            changelog: "Änderungsprotokoll",
            dashboard: "Dashboard",
            index: "Index",
            newer: "Neuer",
            older: "Älter",
          },
          dashboard: {
            title: "Aktivitätsübersicht",
            weeklyActivity: "Wöchentliche Aktivität",
            timeDistribution: "Zeitverteilung",
            hours: "Stunden",
            average: "Durchschnitt",
            averageLine: "Durchschnitt",
            tagDistribution: "Tag-Verteilung",
            weekAnalysis: "Wochenanalyse",
            noActivities: "Keine Aktivitäten für diese Woche.",
          },
          profile: {
            settings: "Profileinstellungen",
            firstName: "Vorname",
            lastName: "Nachname",
            language: "Bevorzugte Sprache",
            selectLanguage: "Sprache auswählen",
            saveChanges: "Änderungen speichern",
            saving: "Speichern...",
            updateSuccess: "Profil aktualisiert",
            updateSuccessDesc: "Ihr Profil wurde erfolgreich aktualisiert.",
            updateError: "Fehler",
            updateErrorDesc: "Profil konnte nicht aktualisiert werden.",
            weekStartsOn: "Woche beginnt am",
            monday: "Montag",
            sunday: "Sonntag",
          },
        },
      },
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
