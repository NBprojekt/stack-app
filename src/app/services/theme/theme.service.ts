import { Injectable } from '@angular/core';

import { Mode } from 'src/app/enums/mode.enum';
import { Theme } from 'src/app/enums/theme.enum';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  // TODO: Store mode and theme information using Storage

  constructor() {
    this.setMode(this.getMode());
    this.setTheme(this.getTheme());
  }

  // Modes
  public setMode(mode: Mode | string): void {
    document.cookie = `mode=${mode}; path=/`;

    // Remove old modes
    Object.keys(Mode).map(key => document.body.classList.remove(Mode[key]));

    // Add new mode
    document.body.classList.add(mode);
  }
  public getMode(): string {
    const cookie = document.cookie.split(';').map(x => x.split('=')).find(x => x[0].trim() === 'mode');
    return cookie ? cookie[1] : Mode.DEFAULT;
  }

  // Themes
  public setTheme(theme: Theme | string): void {
    document.cookie = `theme=${theme}; path=/`;

    // Remove old themes
    Object.keys(Theme).map(key => document.body.classList.remove(Theme[key]));

    // Add new theme
    document.body.classList.add(theme);
  }
  public getTheme(): string {
    const cookie = document.cookie.split(';').map(x => x.split('=')).find(x => x[0].trim() === 'theme');
    return cookie ? cookie[1] : Theme.DEFAULT;
  }
}
