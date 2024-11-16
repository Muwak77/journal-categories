import { JournalCategories } from './journalcategories.js';

const MODULE_NAME = 'journal-categories';
const NAME = 'Journal Categoris';

Hooks.on("init", () => {
    Hooks.on("renderJournalPageSheet", JournalCategories.renderPage);
    Hooks.on("renderJournalSheet",JournalCategories.renderSheet);
});

Hooks.once("init", () => {
    game.settings.register("journal-categories", "valueSet", {
      name: "Mögliche Werte",
      hint: "",
      scope: "world", // Modulweite Einstellung
      config: true,
      type: String,
      default: "Tagebuch;Gruppe;Standard;Siedlung;Gebäude;Händler;Szene;Plot;Hinweis;Handout",
      onChange: value => {
        console.log(`Neue Werte-Einstellung: ${value}`);
      }
    });
    game.settings.register("journal-categories", "iconSet", {
      name: "icons",
      hint: "",
      scope: "world", // Modulweite Einstellung
      config: true,
      type: String,
      default: "fas fa-book;fas fa-users;fas fa-flag;fas fa-chess-rook;fas fa-home;fas fa-sign-hanging;fas fa-theater-masks;fas fa-sitemap;fas fa-lightbulb;fa-scroll",
      onChange: value => {
        console.log(`Neue Werte-Einstellung: ${value}`);
      }
    });
  });
