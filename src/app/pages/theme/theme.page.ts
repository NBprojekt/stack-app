import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme/theme.service';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.page.html',
  styleUrls: ['./theme.page.scss'],
})
export class ThemePage {
  public mode: 'light' | 'dim' | 'lights-out';

  constructor (
    private themeSerice: ThemeService,
  ) {
    this.mode = themeSerice.getMode();
  }

  public changeTheme(): void {
    this.themeSerice.setMode(this.mode)
  }
}
