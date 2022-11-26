import polishMessages from 'ra-language-polish';
import {
  red as colorsRed,
  green as colorsGreen,
  yellow as colorsYellow,
  common as colorsCommon
} from '@material-ui/core/colors';

const messages = {
  inputs: {
    datetime: {
      empty: 'Kliknij aby wybrać datę',
    },
  },
  menu: {
    diagrams: {
      name: 'Wykresy aktywności'
    },
    calendar: {
      name: 'Kalendarz'
    },
    dashboard: {
      name: 'Panel główny'
    },
    chats: {
      name: "Wideokonferencja"
    },
    dietCalculator: {
      name: "Kalkulator Diet"
    }
  },
  resources: {
    users: {
      name: 'Użytkownik |||| użytkowników',
      menu: 'Użytkownicy',
      fields: {
        email: 'Adres email',
        fullname: 'Pełna nazwa użytkownika',
        username: 'Nazwa użytkownika',
        plain_password: 'Hasło użytkownika',
        enabled: 'Logowanie włączone',
        gender: 'Płeć',
        phone: 'Telefon',
        date_of_birth: 'Data urodzenia',
        groups: 'Grupy',
        patients: 'Pacjenci',
        doctors: 'Lekarze'
      },
      custom: {
        options: {
          gender: {
            male: 'Mężczyzna',
            female: 'Kobieta'
          }
        }
      }
    },
    groups: {
      name: 'Grupa uprawnień |||| grup uprawnień',
      menu: 'Grupy uprawnień',
      fields: {
        name: 'Nazwa',
        roles: 'Uprawnienia',
        users: 'Użytkownicy'
      },
      custom: {
        roles: {
          role_super_admin: 'Super administrator',
          role_admin: 'Administrator',
          role_doctor: 'Lekarz',
          role_patient: 'Pacjent',
          role_user: 'Użytkownik',

          users_list: 'Użytkownicy - lista',
          users_edit: 'Użytkownicy - edycja',
          users_edit_groups: 'Użytkownicy - edycja, pole grupy',
          users_edit_patients: 'Użytkownicy - edycja, pole pacjenci',
          users_edit_doctors: 'Użytkownicy - edycja, pole lekarze',
          users_create: 'Użytkownicy - tworzenie',
          users_show: 'Użytkownicy - podgląd',

          groups_list: 'Grupy - lista',
          groups_show: 'Grupy - podgląd',
          groups_edit: 'Grupy - edycja',
          groups_create: 'Grupy - tworzenie',

          diagnostics_edit: 'Badania diagnostyczne - edycja',
          diagnostics_create: 'Badania diagnostyczne - tworzenie',
          diagnostics_list_users: 'Badania diagnostyczne - lista, kolumna użytkownik',
          diagnostics_list_created: 'Badania diagnostyczne - lista, kolumna data stworzenia',
          diagnostics_list_updated: 'Badania diagnostyczne - lista, kolumna data edycji',
          diagnostics_show_user: 'Badania diagnostyczne - podgląd, pole użytkownik',

          recommendations_list: 'Zalecenia - lista',
          recommendations_edit: 'Zalecenia - edytowanie',
          recommendations_show: 'Zalecenia - podgląd',
          recommendations_create: 'Zalecenia - tworzenie',
          recommendations_list_users: 'Zalecenia - lista, kolumna użytkownik',
          recommendations_list_created: 'Zalecenia - lista, kolumna data utworzenia',
          recommendations_list_updated: 'Zalecenia - lista, kolumna data aktualizacji',
          recommendations_list_as_calendar: 'Zalecenia - lista, pokazuj jako kalendarz',
          recommendations_show_users: 'Zalecenia - podgląd, pole użytkownik',

          visits_edit: 'Harmonogram wizyt - edycja',
          visits_create: 'Harmonogram wizyt - tworzenie',
          visits_list_users: 'Harmonogram wizyt - lista, kolumna użytkownik',
          visits_list_created: 'Harmonogram wizyt - lista, kolumna data utworzenia',
          visits_list_updated: 'Harmonogram wizyt - lista, kolumna data aktualizacji',
          visits_list_as_calendar: 'Harmonogram wizyt - lista, pokazuj jako kalendarz',

          consultations_edit: 'Konsultacje - edycja',
          consultations_show: 'Konsultacje - podgląd',
          consultations_create: 'Konsultacje - tworzenie',
          consultations_list_users: 'Konsultacje - lista, kolumna użytkownik',
          consultations_list_created: 'Konsultacje - lista, kolumna data stworzenia',
          consultations_list_updated: 'Konsultacje - lista, kolumna data edycji',
          consultations_show_user: 'Konsultacje - podgląd, pole użytkownik',

          trainings_edit: 'Kalendarz treningów - edycja',
          trainings_show: 'Kalendarz treningów - podgląd',
          trainings_create: 'Kalendarz treningów - tworzenie',
          trainings_list_users: 'Kalendarz treningów - lista, kolumna użytkownik',
          trainings_list_created: 'Kalendarz treningów - lista, kolumna data stworzenia',
          trainings_list_updated: 'Kalendarz treningów - lista, kolumna data edycji',
          trainings_list_as_calendar: 'Kalendarz treningów - lista, pokazuj jako kalendarz',
          trainings_show_user: 'Kalendarz treningów - podgląd, pole użytkownik',

          psycho_physical_development_edit: 'Rozwój psycho fizyczny - edycja',
          psycho_physical_development_show: 'Rozwój psycho fizyczny - podgląd',
          psycho_physical_development_show_user: 'Rozwój psycho fizyczny - podgląd, pole pacjent',
          psycho_physical_development_create: 'Rozwój psycho fizyczny - tworzenie',
          psycho_physical_development_list_user: 'Rozwój psycho fizyczny - lista, pole pacjent',
          psycho_physical_development_list_created: 'Rozwój psycho fizyczny - lista, data utworzenia',
          psycho_physical_development_list_updated: 'Rozwój psycho fizyczny - lista, data aktualizacji',

          measurement_types_list: 'Typy pomiarów - lista',
          measurement_types_edit: 'Typy pomiarów - edycja',
          measurement_types_create: 'Typy pomiarów - tworzenenie',
          measurements_list_users: 'Typy pomiarów - lista, kolumna użytkownik',
          measurements_list_updated: 'Typy pomiarów - lista, kolumna data edycji',
          measurements_create_users: 'Typy pomiarów - tworzenie, pole użytkownik',
          measurements_edit_users: 'Typy pomiarów - edycja, pole użytkownik',

          media_objects_list: 'Media - lista',

          information_from_patient_create: 'Informacje dla pacjenta - tworzenie',
          information_from_patient_list_users: 'Informacje dla pacjenta - lista, kolumna użytkownik',
          information_from_patient_list_created: 'Informacje dla pacjenta - lista, kolumna data stworzenia',

          imaging_examinations_create: 'Badania obrazowe - tworzenie',
          imaging_examinations_list_users: 'Badania obrazowe - lista, kolumna użytkownik',
          imaging_examinations_list_created: 'Badania obrazowe - lista, kolumna data stworzenia',

          medical_examinations_create: 'Harmonogram badań lekarskich - tworzenie',
          medical_examinations_edit: 'Harmonogram badań lekarskich - edycja',
          medical_examinations_list_users: 'Harmonogram badań lekarskich - lista, kolumna użytkownik',
          medical_examinations_list_created: 'Harmonogram badań lekarskich - lista, kolumna data stworzenia',
          medical_examinations_list_updated: 'Harmonogram badań lekarskich - llista, kolumna data edycji',
          medical_examinations_list_as_calendar: 'Harmonogram badań lekarskich - lista, pokazuj jako kalendarz',

          medical_recommendations_create: 'Zalecenia medyczne - tworzenie',
          medical_recommendations_edit: 'Zalecenia medyczne - edycja',
          medical_recommendations_edit_created: 'Zalecenia medyczne - edycja, pole data stworzenia',
          medical_recommendations_list_user: 'Zalecenia medyczne - lista, pole pacjent',
          medical_recommendations_list_created: 'Zalecenia medyczne - lista, pole data stworzenia',
          medical_recommendations_list_updated: 'Zalecenia medyczne - lista, pole data edycji',

          diet_recommendations_create: 'Zalecenia dietetyczne - tworzenie',
          diet_recommendations_edit: 'Zalecenia dietetyczne - edycja',
          diet_recommendations_edit_created: 'Zalecenia dietetyczne - edycja, pole data stworzenia',
          diet_recommendations_list_user: 'Zalecenia dietetyczne - lista, pole pacjent',
          diet_recommendations_list_created: 'Zalecenia dietetyczne - lista, pole data stworzenia',
          diet_recommendations_list_updated: 'Zalecenia dietetyczne - lista, pole data edycji',
        }
      }
    },
    recommendations: {
      name: 'Zalecenie |||| zaleceń',
      menu: 'Zalecenia',
      fields: {
        type: 'Rodzaj zalecenia',
        value: 'Treść zalecenia',
        created: 'Data stworzenia',
        updated: 'Data modyfikacji',
        users: 'Pacjenci',
        at: 'Zalecona data',
        ends: 'Data ważności zalecenia',
        created_by: 'Zalecone przez'
      },
      custom: {
        recurring_day_of_week: {
          monday: 'Poniedziałek',
          tuesday: 'Wtorek',
          wednesday: 'Środa',
          thursday: 'Czwartek',
          friday: 'Piątek',
          saturday: 'Sobota',
          sunday: 'Niedziela',
        }
      },
      calendar_title: 'Twoje zalecenia',
      calendar_subtitle: 'Kliknij zalecenie w kalendarzu aby zobaczyć szczegóły',
      details: 'Szczegóły zalecenia',
      close: 'Zamknij'
    },
    diagnostics: {
      name: 'Wyniki badań |||| wyników badań',
      menu: 'Wyniki badań',
      fields: {
        value: 'Rodzaj badania',
        attachment: 'Załącznik',
        created: 'Data stworzenia',
        updated: 'Data modyfikacji',
        user: 'Pacjent',
      },
    },
    consultations: {
      name: 'konsultacje |||| konsultacji',
      menu: 'Konsultacje',
      fields: {
        value: 'Treść notatki',
        created: 'Data stworzenia',
        updated: 'Data modyfikacji',
        user: 'Pacjent',
        attachment: 'Załącznik',
        'attachment.content_url': 'Załącznik'
      },
    },
    psycho_physical_developments: {
      name: 'Opis rozwoju psycho fizycznego |||| opisów rozwoju psycho fizycznego',
      menu: 'Opis rozwoju psycho fizycznego',
      fields: {
        value: 'Opis',
        at: 'Data wystawienia opisu',
        created: 'Data stworzenia',
        updated: 'Data modyfikacji',
        user: 'Pacjent',
      },
    },
    medical_recommendations: {
      name: 'Zalecenia medyczne |||| zaleceń medycznych',
      menu: 'Zalecenia medyczne',
      fields: {
        value: 'Opis zalecenia medycznego',
        user: 'Pacjent',
        at: 'Data rozpoczęcia zalecenia',
        ends: 'Data zakończenia zalecenia',
        created: 'Data stworzenia',
        updated: 'Data modyfikacji',
        created_by: 'Zalecone przez:',
        'attachment.content_url': 'Załącznik'
      },
    },
    diet_recommendations: {
      name: 'Zalecenia dietetyczne |||| zaleceń dietetycznych',
      menu: 'Zalecenia dietetyczne',
      fields: {
        value: 'Opis zalecenia dietetycznego',
        user: 'Pacjent',
        at: 'Data rozpoczęcia zalecenia',
        ends: 'Data zakończenia zalecenia',
        created: 'Data stworzenia',
        updated: 'Data modyfikacji',
        created_by: 'Zalecone przez:',
        'attachment.content_url': 'Załącznik'
      },
    },
    measurements: {
      name: 'Pomiar |||| Pomiarów',
      menu: 'Pomiary',
      fields: {
        type: 'Typ pomiaru',
        value: 'Wartość pomiaru',
        created: 'Data stworzenia',
        created_time: 'Godzina',
        updated: 'Data modyfikacji',
        user: 'Pacjent',
        comment: 'Uwagi'
      }
    },
    measurement_types: {
      name: 'Typ pomiaru |||| Typy pomiarów',
      menu: 'Typy pomiarów',
      fields: {
        name: 'Nazwa',
        unit: 'Jednostka'
      }
    },
    'threads/my': {
      name: 'Wątek |||| Wątków',
      menu: 'Wątki',
      fields: {
        user: 'Odbiorca',
        subject: 'Tytuł wątku',
        body: 'Treść'
      },
      custom: {
        list: {
          secondaryTextPrefix: 'Stworzony przez '
        },
        show: {
          reply: {
            hintText: 'Odpowiedź',
            floatingLabelText: 'Odpowiedź',
            send: 'Wyślij'
          },
          attachment: 'Załącznik'
        }
      }
    },
    media_objects: {
      menu: 'Media'
    },
    visits: {
      menu: 'Harmonogram wizyt',
      name: 'Harmonogram wizyt |||| harmonogramu wizyt',
      fields: {
        visit_date: 'Data wizyty',
        doctor_fullname: 'Imię i nazwisko lekarza',
        preparing_instructions: 'Instrukcje przygotowania się do wizyty',
        status: 'Status',
        created_by: 'Zalecone przez:',
        created: 'Data stworzenia',
        updated: 'Data modyfikacji',
        user: 'Pacjent',
      },
      calendar_title: 'Twój harmonogram wizyt',
      calendar_subtitle: 'Kliknij na wizytę w kalendarzu aby zobaczyć szczegóły',
      calendar_event_title: 'Wizyta u %{user}',
      details: 'Szczegóły wizyty',
      close: 'Zamknij',
      values: {
        status: {
          EVALUATE: 'Do odbycia',
          DONE: 'Odbyta',
          NOT_DONE: 'Nie odbyta',
        }
      },
      colors: {
        background: {
          status: {
            EVALUATE: colorsYellow['500'],
            DONE: colorsGreen['500'],
            NOT_DONE: colorsRed['500'],
          }
        },
        text: {
          status: {
            EVALUATE: colorsCommon.black,
            DONE: colorsCommon.black,
            NOT_DONE: colorsCommon.black,
          }
        }
      },
      actions: {
        done: 'Byłem na wizycie',
        not_done: 'Nie było mnie na wizycie'
      },
      chart: {
        line: {
          labels: {
            to_achieve: 'Do odbycia',
            achieved: 'Odbyta',
            not_achieved: 'Nie odbyta'
          }
        }
      }
    },
    trainings: {
      menu: 'Kalendarz treningów',
      name: 'Kalendarz treningów',
      fields: {
        value: 'Opis treningu (Rodzaj oraz intensywność treningów)',
        result_achieved: 'Osiągane wyniki',
        at: 'Data rozpoczęcia treningu',
        ends: 'Data zakończenia treningu',
        created: 'Data stworzenia',
        updated: 'Data modyfikacji',
        created_by: 'Zalecone przez:',
        user: 'Pacjent',
        attachment: 'Załącznik',
        status: 'Status',
        result: 'Rezultat',
        'attachment.content_url': 'Załącznik'
      },
      calendar_title: 'Twój harmonogram treningów',
      calendar_subtitle: 'Kliknij trening w kalendarzu aby zobaczyć szczegóły',
      details: 'Szczegóły treningu',
      close: 'Zamknij',
      values: {
        status: {
          EVALUATE: 'Do wykonania',
          DONE: 'Wykonany',
          NOT_DONE: 'Nie wykonany',
        }
      },
      colors: {
        background: {
          status: {
            EVALUATE: colorsYellow['500'],
            DONE: colorsGreen['500'],
            NOT_DONE: colorsRed['500'],
          }
        },
        text: {
          status: {
            EVALUATE: colorsCommon.black,
            DONE: colorsCommon.black,
            NOT_DONE: colorsCommon.black,
          }
        }
      },
      actions: {
        done: 'Wykonaj',
        not_done: 'Odrzuć'
      },
      chart: {
        line: {
          labels: {
            to_achieve: 'Do wykonania',
            achieved: 'Wykonane',
            not_achieved: 'Nie wykonane'
          }
        }
      },
      placeholders: {
        result: 'Kliknij tutaj aby wpisać rezultat'
      }
    },
    medical_examinations: {
      menu: 'Harmonogram badań lekarskich',
      name: 'Badania lekarskie |||| badanie lekarskie',
      fields: {
        user: "Pacjent",
        created_by: "Stworzone przez",
        at: "Data badania",
        procedure: "Procedura",
        description: "Opis",
        status: "Status"
      },
      calendar_title: 'Twój harmonogram badań',
      calendar_subtitle: 'Kliknij na badanie w kalendarzu aby zobaczyć szczegóły',
      calendar_event_title: 'Badanie u %{user}',
      details: 'Szczegóły badania',
      close: 'Zamknij',
      values: {
        status: {
          EVALUATE: 'Do odbycia',
          DONE: 'Odbyta',
          NOT_DONE: 'Nie odbyta',
        }
      },
      colors: {
        background: {
          status: {
            EVALUATE: colorsYellow['500'],
            DONE: colorsGreen['500'],
            NOT_DONE: colorsRed['500'],
          }
        },
        text: {
          status: {
            EVALUATE: colorsCommon.black,
            DONE: colorsCommon.black,
            NOT_DONE: colorsCommon.black,
          }
        }
      },
      actions: {
        done: 'Byłem na badaniu',
        not_done: 'Nie było mnie na badaniu'
      },
      chart: {
        line: {
          labels: {
            to_achieve: 'Do badania',
            achieved: 'Zbadany',
            not_achieved: 'Nie zbadany'
          }
        }
      }
    }
  },
  dashboard: {
    title: 'Panel główny',
    recommendations: {
      title: 'Dzisiejsze zalecenia',
      more: 'Więcej'
    },
    activities: {
      title: 'Dzisiejsze aktywności',
      more: 'Więcej'
    },
    notifications: {
      title: 'Notyfikacje'
    },
    threads: {
      title: {
        doctor: 'Wiadomości od pacjentów',
        patient: 'Wiadomości od specjalistów'
      },
      more: 'Więcej'
    }
  },
  views: {
    diagrams: {
      chart: {
        recommendation: 'Zalecenie',
        activity: 'Aktywność',
        norm: 'Norma'
      }
    }
  }
};


export default {
  pl: {...messages, ...polishMessages}
};
