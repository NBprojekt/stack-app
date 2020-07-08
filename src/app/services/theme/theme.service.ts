import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor() {
    document.body.classList.add(this.getMode());
  }

  public setMode(mode: 'dark' | 'light'): void {
    document.cookie = `mode=${mode}`;
  }
  public getMode(): string {
    const cookie = document.cookie.split(';').map(x => x.split('=')).find(x => x[0].trim() === 'mode');
    return cookie ? cookie[1] : 'light';
  }
}
