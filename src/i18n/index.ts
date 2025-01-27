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
          activity: {
            placeholder:
              "Add activity (e.g., '8:00 30m preparation for #workshop')",
            time: "Time",
            duration: "Duration",
            description: "Description",
            edit: "Edit",
            delete: "Delete",
            cancel: "Cancel",
            add: "Add",
            saving: "Saving...",
            deleteConfirm: "Delete Activity",
            deleteDescription: "Are you sure you want to delete this activity?",
            deleteSuccess: "Activity Deleted",
            deleteSuccessDesc: "The activity has been deleted successfully",
            deleteError: "There was an error deleting the activity",
            error: "Error",
          },
          common: {
            back: "Back",
            index: "Home",
            profile: "Profile",
            dashboard: "Dashboard",
            summary: "Weekly Summary",
            logout: "Logout",
            changelog: "Changelog",
            minutes: "minutes",
            newer: "Newer",
            older: "Older",
            help: "Help",
          },
          help: {
            title: "Help",
            inputFormat: {
              title: "Input Format",
              description:
                "Activities can be entered in a natural format that includes time, duration, description, and tags. Each component has its specific format:",
            },
            components: {
              time: {
                title: "Time",
                description: "Enter the time in 24-hour format (HH:MM):",
              },
              duration: {
                title: "Duration",
                description: "Specify duration using m (minutes) or h (hours):",
              },
              description: {
                title: "Description",
                description: "Add a free-form description of your activity.",
              },
              tags: {
                title: "Tags",
                description: "Add hashtags to categorize your activities:",
              },
            },
            examples: {
              title: "Examples",
              workshop: "8:00 30m workshop preparation for #clientname ",
              meeting: "14:30 1h team meeting #projectname",
              review: "10:15 45m code review #myprivateproject",
            },
          },
          landing: {
            title: "Track your activities and get AI-powered insights",
            getStarted: "Get Started",
            features: {
              timeInput: {
                title: "Natural Time Input",
                description: "Enter your activities in natural language",
              },
              tagging: {
                title: "Smart Tagging",
                description: "Organize with hashtags",
              },
              insights: {
                title: "AI Insights",
                description: "Get weekly summaries and patterns",
              },
            },
          },
          profile: {
            settings: "Profile Settings",
            email: "Email",
            firstName: "First Name",
            lastName: "Last Name",
            language: "Language",
            selectLanguage: "Select language",
            weekStartsOn: "Week starts on",
            monday: "Monday",
            sunday: "Sunday",
            saving: "Saving...",
            saveChanges: "Save Changes",
            updateSuccess: "Profile Updated",
            updateSuccessDesc: "Your profile has been updated successfully",
            updateError: "Update Error",
            updateErrorDesc: "There was an error updating your profile",
          },
          dashboard: {
            title: "Activity Dashboard",
            weeklyActivity: "Weekly Activity",
            average: "Average",
            hours: "Hours",
            averageLine: "Average",
            tagDistribution: "Tag Distribution",
          },
          summary: {
            title: "Weekly Summary for {{startDate}} - {{endDate}}",
            description:
              "Get an AI-powered analysis of your weekly activities. Track your progress, identify patterns, and gain insights into your work.",
            viewSummary: "View Summary",
            generating: "Analyzing your data...",
            marketing: {
              title: "Weekly Activity Summaries",
              features: [
                "Smart pattern recognition",
                "Time allocation analysis",
                "Productivity insights",
                "Weekly trends",
              ],
            },
            selectWeek: "Select week",
            noSummaryYet: "No summary available yet",
            lastSummary: "Last Generated Summary",
            generatedAt: "Generated on {{date}}",
            copyMarkdown: "Copy in Markdown",
            copied: "Copied to clipboard",
            copiedDesc: "The summary has been copied to your clipboard",
          },
        },
      },
      cs: {
        translation: {
          activity: {
            placeholder:
              "Přidat aktivitu (např. '8:00 30m příprava na #workshop')",
            time: "Čas",
            duration: "Doba trvání",
            description: "Popis",
            edit: "Upravit",
            delete: "Smazat",
            cancel: "Zrušit",
            add: "Přidat",
            saving: "Ukládám...",
            deleteConfirm: "Smazat aktivitu",
            deleteDescription: "Opravdu chcete smazat tuto aktivitu?",
            deleteSuccess: "Aktivita smazána",
            deleteSuccessDesc: "Aktivita byla úspěšně smazána",
            deleteError: "Při mazání aktivity došlo k chybě",
            error: "Chyba",
          },
          common: {
            back: "Zpět",
            index: "Domů",
            profile: "Profil",
            dashboard: "Přehled",
            summary: "Týdenní souhrn",
            logout: "Odhlásit",
            changelog: "Historie změn",
            minutes: "minut",
            newer: "Novější",
            older: "Starší",
            help: "Nápověda",
          },
          help: {
            title: "Nápověda",
            inputFormat: {
              title: "Formát zadávání",
              description:
                "Aktivity lze zadávat v přirozeném formátu, který obsahuje čas, dobu trvání, popis a štítky. Každá část má svůj specifický formát:",
            },
            components: {
              time: {
                title: "Čas",
                description: "Zadejte čas ve 24hodinovém formátu (HH:MM):",
              },
              duration: {
                title: "Doba trvání",
                description:
                  "Určete dobu trvání pomocí m (minuty) nebo h (hodiny):",
              },
              description: {
                title: "Popis",
                description: "Přidejte volný popis vaší aktivity.",
              },
              tags: {
                title: "Štítky",
                description: "Přidejte hashtagy pro kategorizaci aktivit:",
              },
            },
            examples: {
              title: "Příklady",
              workshop: "8:00 30m příprava na #workshop",
              meeting: "1h týmová schůzka kvůli #jménoprojektu",
              review: "10:00 1:30h revize kódu pro můj #projekt",
            },
          },
          landing: {
            title: "Sledujte své aktivity a získejte AI přehledy",
            getStarted: "Začít",
            features: {
              timeInput: {
                title: "Přirozený vstup času",
                description: "Zadávejte aktivity přirozeným jazykem",
              },
              tagging: {
                title: "Chytré štítkování",
                description: "Organizujte pomocí hashtagů",
              },
              insights: {
                title: "AI přehledy",
                description: "Získejte týdenní souhrny a vzorce",
              },
            },
          },
          profile: {
            settings: "Nastavení profilu",
            email: "Email",
            firstName: "Jméno",
            lastName: "Příjmení",
            language: "Jazyk",
            selectLanguage: "Vyberte jazyk",
            weekStartsOn: "Týden začíná v",
            monday: "Pondělí",
            sunday: "Neděle",
            saving: "Ukládám...",
            saveChanges: "Uložit změny",
            updateSuccess: "Profil aktualizován",
            updateSuccessDesc: "Váš profil byl úspěšně aktualizován",
            updateError: "Chyba aktualizace",
            updateErrorDesc: "Při aktualizaci profilu došlo k chybě",
          },
          dashboard: {
            title: "Přehled aktivit",
            weeklyActivity: "Týdenní aktivita",
            average: "Průměr",
            hours: "Hodiny",
            averageLine: "Průměr",
            tagDistribution: "Distribuce štítků",
          },
          summary: {
            title: "Týdenní souhrn za {{startDate}} - {{endDate}}",
            description:
              "Získejte AI analýzu vašich týdenních aktivit. Sledujte svůj pokrok, identifikujte vzorce a získejte přehled o své práci.",
            viewSummary: "Zobrazit souhrn",
            generating: "Analyzujeme vaše data...",
            marketing: {
              title: "Týdenní souhrny aktivit",
              features: [
                "Chytré rozpoznávání vzorců",
                "Analýza využití času",
                "Přehledy produktivity",
                "Týdenní trendy",
              ],
            },
            selectWeek: "Vyberte týden",
            noSummaryYet: "Zatím není k dispozici žádný souhrn",
            lastSummary: "Poslední vygenerovaný souhrn",
            generatedAt: "Vygenerováno {{date}}",
            copyMarkdown: "Zkopírovat v Markdown",
            copied: "Zkopírováno",
            copiedDesc: "Souhrn byl zkopírován do schránky",
          },
        },
      },
      de: {
        translation: {
          activity: {
            placeholder:
              "Aktivität hinzufügen (z.B. '8:00 30m Vorbereitung für #workshop')",
            time: "Zeit",
            duration: "Dauer",
            description: "Beschreibung",
            edit: "Bearbeiten",
            delete: "Löschen",
            cancel: "Abbrechen",
            add: "Hinzufügen",
            saving: "Speichern...",
            deleteConfirm: "Aktivität löschen",
            deleteDescription: "Möchten Sie diese Aktivität wirklich löschen?",
            deleteSuccess: "Aktivität gelöscht",
            deleteSuccessDesc: "Die Aktivität wurde erfolgreich gelöscht",
            deleteError:
              "Beim Löschen der Aktivität ist ein Fehler aufgetreten",
            error: "Fehler",
          },
          common: {
            back: "Zurück",
            index: "Start",
            profile: "Profil",
            dashboard: "Dashboard",
            summary: "Wochenzusammenfassung",
            logout: "Abmelden",
            changelog: "Änderungsprotokoll",
            minutes: "Minuten",
            newer: "Neuer",
            older: "Älter",
            help: "Hilfe",
          },
          help: {
            title: "Hilfe",
            inputFormat: {
              title: "Eingabeformat",
              description:
                "Aktivitäten können in einem natürlichen Format eingegeben werden, das Zeit, Dauer, Beschreibung und Tags enthält. Jede Komponente hat ihr spezifisches Format:",
            },
            components: {
              time: {
                title: "Zeit",
                description:
                  "Geben Sie die Zeit im 24-Stunden-Format ein (HH:MM):",
              },
              duration: {
                title: "Dauer",
                description:
                  "Geben Sie die Dauer mit m (Minuten) oder h (Stunden) an:",
              },
              description: {
                title: "Beschreibung",
                description:
                  "Fügen Sie eine freie Beschreibung Ihrer Aktivität hinzu.",
              },
              tags: {
                title: "Tags",
                description:
                  "Fügen Sie Hashtags zur Kategorisierung Ihrer Aktivitäten hinzu:",
              },
            },
            examples: {
              title: "Beispiele",
              workshop: "8:00 30m Workshop-Vorbereitung #bmw",
              meeting: "14:30 1h Team-Meeting #aldi",
              review: "45m Code-Review #google",
            },
          },
          landing: {
            title:
              "Verfolgen Sie Ihre Aktivitäten und erhalten Sie KI-gestützte Einblicke",
            getStarted: "Loslegen",
            features: {
              timeInput: {
                title: "Natürliche Zeiteingabe",
                description: "Geben Sie Aktivitäten in natürlicher Sprache ein",
              },
              tagging: {
                title: "Intelligentes Tagging",
                description: "Organisieren Sie mit Hashtags",
              },
              insights: {
                title: "KI-Einblicke",
                description:
                  "Erhalten Sie wöchentliche Zusammenfassungen und Muster",
              },
            },
          },
          profile: {
            settings: "Profileinstellungen",
            email: "E-Mail",
            firstName: "Vorname",
            lastName: "Nachname",
            language: "Sprache",
            selectLanguage: "Sprache auswählen",
            weekStartsOn: "Woche beginnt am",
            monday: "Montag",
            sunday: "Sonntag",
            saving: "Speichern...",
            saveChanges: "Änderungen speichern",
            updateSuccess: "Profil aktualisiert",
            updateSuccessDesc: "Ihr Profil wurde erfolgreich aktualisiert",
            updateError: "Aktualisierungsfehler",
            updateErrorDesc:
              "Beim Aktualisieren Ihres Profils ist ein Fehler aufgetreten",
          },
          dashboard: {
            title: "Aktivitäts-Dashboard",
            weeklyActivity: "Wöchentliche Aktivität",
            average: "Durchschnitt",
            hours: "Stunden",
            averageLine: "Durchschnitt",
            tagDistribution: "Tag-Verteilung",
          },
          summary: {
            title: "Wochenzusammenfassung für {{startDate}} - {{endDate}}",
            description:
              "Erhalten Sie eine KI-gestützte Analyse Ihrer wöchentlichen Aktivitäten. Verfolgen Sie Ihren Fortschritt, erkennen Sie Muster und gewinnen Sie Einblicke in Ihre Arbeit.",
            viewSummary: "Zusammenfassung anzeigen",
            generating: "Ihre Daten werden analysiert...",
            marketing: {
              title: "Wöchentliche Aktivitätszusammenfassungen",
              features: [
                "Intelligente Mustererkennung",
                "Zeitverteilungsanalyse",
                "Produktivitätseinblicke",
                "Wöchentliche Trends",
              ],
            },
            selectWeek: "Woche auswählen",
            noSummaryYet: "Noch keine Zusammenfassung verfügbar",
            lastSummary: "Zuletzt generierte Zusammenfassung",
            generatedAt: "Generiert am {{date}}",
            copyMarkdown: "In Markdown kopieren",
            copied: "Kopiert",
            copiedDesc:
              "Die Zusammenfassung wurde in die Zwischenablage kopiert",
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
