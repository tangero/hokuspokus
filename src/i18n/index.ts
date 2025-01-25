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
          },
          landing: {
            title:
              "Track your activities effortlessly with natural language input",
            getStarted: "Get Started",
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
          },
          landing: {
            title: "Sledujte své aktivity jednoduše pomocí přirozeného jazyka",
            getStarted: "Začít",
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
          },
          landing: {
            title:
              "Verfolgen Sie Ihre Aktivitäten mühelos mit natürlicher Spracheingabe",
            getStarted: "Loslegen",
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
