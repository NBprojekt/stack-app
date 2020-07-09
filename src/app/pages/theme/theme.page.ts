import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme/theme.service';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.page.html',
  styleUrls: ['./theme.page.scss'],
})
export class ThemePage {
  public theme: string;
  public mode: string;

  constructor (
    private themeSerice: ThemeService,
  ) {
    this.theme = themeSerice.getTheme();
    this.mode = themeSerice.getMode();
  }

  public changeTheme(): void {
    this.themeSerice.setTheme(this.theme);
  }
  public changeMode(): void {
    this.themeSerice.setMode(this.mode);
  }
}
