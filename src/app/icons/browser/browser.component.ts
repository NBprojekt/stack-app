import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-browser',
  templateUrl: './browser.component.html',
})
export class BrowserComponent {
  @Input() width = '200px';
  @Input() height = '200px';

  @Input() primary = 'var(--ion-color-secondary)';
  @Input() secondary = 'var(--ion-color-secondary-tint)';
}
