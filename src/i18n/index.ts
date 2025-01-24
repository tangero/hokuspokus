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
          common: {
            loading: "Loading...",
            logout: "Logout",
            minutes: "min",
            profile: "Profile",
            back: "Back",
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
          common: {
            loading: "Načítání...",
            logout: "Odhlásit",
            minutes: "min",
            profile: "Profil",
            back: "Zpět",
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
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
