import { JournalCategories } from './journalcategories.js';

const MODULE_NAME = 'journal-categories';
const NAME = 'Journal Categoris';

Hooks.on("init", () => {
    Hooks.on("renderJournalPageSheet", (app, html, data) => {
        // Überprüfen, ob der Editor-Modus aktiv ist
        if (!app.options.editable) return;
      
        const journalPage = app.object;
        const werteText = game.settings.get("journal-categories", "valueSet");
        const werteArray = werteText.split(";").map(item => item.trim()); // Array der Werte aus werteText
        // Überprüfen, ob das Dropdown-Feld bereits existiert, um Duplikate zu vermeiden
        if (html.find(".category-dropdown").length === 0) {
          // Dropdown-Feld erstellen
          let dropdownHTML = `
      <div class="journal-categories-dropbdown-group form-group">
        <label for="categoryDropdown">Kategorie</label>
        <select name="flags.categoryDropdown" id="categoryDropdown" class="category-dropdown">
          <option value="">-- Bitte wählen --</option>`;        
            werteArray.forEach(value => {
                dropdownHTML += `<option value="${value}" ${journalPage.getFlag('journal-categories', 'categoryDropdown') === value ? "selected" : ""}>${value}</option>`;
            });
            dropdownHTML += `
        </select>
        </div>
        `;



          // Dropdown in den Journal-Editor einfügen
          html.find("input[name='name']").parent().after(dropdownHTML);
      
          // Daten aktualisieren bei Änderung
          html.find(".category-dropdown").on("change", async (event) => {
            const selectedValue = event.target.value;
            await journalPage.setFlag('journal-categories', 'categoryDropdown', selectedValue);
          });
        }
      });
      Hooks.on("renderJournalSheet", (app, html, data) => {
        const journalEntries = app.object.pages.contents;
        const valueSet = game.settings.get("journal-categories", "valueSet").split(";").map(item => item.trim());
        const iconSet = game.settings.get("journal-categories", "iconSet").split(";").map(icon => icon.trim());

      
        // Schleife durch alle Seiten des Journals
        journalEntries.forEach((page,index) => {
          // Den gespeicherten Wert der Kategorie für jede Seite abrufen
          const category = page.getFlag('journal-categories', 'categoryDropdown') || "-";
          const categoryIndex = valueSet.indexOf(category);
          const iconClass = iconSet[categoryIndex] || "";

          const pageTitle = html.find(`.directory-item[data-page-id="${page.id}"] .page-title`);
      
          // Finde das Element der Seitenliste und füge die Kategorie daneben hinzu
          if (pageTitle.length > 0) {
            // Icon-Anzeige in .page-title erstellen und hinzufügen, falls sie noch nicht existiert
            if (!pageTitle.find('.category-display-icon').length) {
              pageTitle.prepend(`
                <i class="${iconClass} category-display-icon" title="${category}" style="margin-right: 5px;"></i>
              `);
            }
          }
        });
      });
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
