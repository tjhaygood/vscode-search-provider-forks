import Gio from "gi://Gio";
import * as Main from "resource:///org/gnome/shell/ui/main.js";
import { Extension } from "resource:///org/gnome/shell/extensions/extension.js";
import { AppSearchProvider } from "resource:///org/gnome/shell/ui/appDisplay.js";
import { VSCodeSearchProvider, CursorSearchProvider } from "./provider.js";

export default class VSCodeSearchProviderExtension extends Extension {
  providers: AppSearchProvider[] = [];
  _settings: Gio.Settings | null = null;

  enable() {
    this._settings = this.getSettings();
    this.providers = [
      new VSCodeSearchProvider(this),
      new CursorSearchProvider(this),
    ];
    for (const provider of this.providers) {
      Main.overview.searchController.addProvider(provider);
    }
  }

  disable() {
    this._settings = null;
    for (const provider of this.providers) {
      Main.overview.searchController.removeProvider(provider);
    }
  }
}
