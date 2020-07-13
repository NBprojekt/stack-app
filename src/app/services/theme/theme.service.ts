import { Injectable } from '@angular/core';

export enum Modes {
  DEFAULT = 'light',
  LIGHT = 'light',
  DIM = 'dim',
  LOGHTS_OUT = 'lights-out'
}

export enum Themes {
  DEFAULT = 'theme-orange-blue',
  ORANGE_BLUE = 'theme-orange-blue',
  PURPLE_GREEN = 'theme-purple-green',
  BLUE_PINK = 'theme-blue-pink',
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor() {
    this.setMode(this.getMode());
    this.setTheme(this.getTheme());
  }

  // Modes
  public setMode(mode: Modes | string): void {
    document.cookie = `mode=${mode}; path=/`;

    // Remove old modes
    Object.keys(Modes).map(key => document.body.classList.remove(Modes[key]));

    // Add new mode
    document.body.classList.add(mode);
  }
  public getMode(): string {
    const cookie = document.cookie.split(';').map(x => x.split('=')).find(x => x[0].trim() === 'mode');
    return cookie ? cookie[1] : 'light';
  }

  // Themes
  public setTheme(theme: Themes | string): void {
    document.cookie = `theme=${theme}; path=/`;

    // Remove old themes
    Object.keys(Themes).map(key => document.body.classList.remove(Themes[key]));

    // Add new theme
    document.body.classList.add(theme);
  }
  public getTheme(): string {
    const cookie = document.cookie.split(';').map(x => x.split('=')).find(x => x[0].trim() === 'theme');
    return cookie ? cookie[1] : Themes.DEFAULT;
  }
}
