import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor() {
    this.setMode(this.getMode());
  }

  public setMode(mode: 'light' | 'dim' | 'lights-out'): void {
    document.cookie = `mode=${mode}`;

    // Remove old modes
    document.body.classList.remove('light');
    document.body.classList.remove('dim');
    document.body.classList.remove('lights-out');

    // Add new mode
    document.body.classList.add(mode);
  }
  public getMode(): 'light' | 'dim' | 'lights-out' {
    const cookie = document.cookie.split(';').map(x => x.split('=')).find(x => x[0].trim() === 'mode');
    return cookie ? cookie[1] as 'light' | 'dim' | 'lights-out' : 'light';
  }
}
