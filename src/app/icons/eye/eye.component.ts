import { Component, Input } from '@angular/core';

import { DEFAULT_ICON_SIZE } from '../icons.module';

@Component({
  selector: 'icon-eye',
  templateUrl: './eye.component.html',
})
export class EyeComponent {
  @Input() width = DEFAULT_ICON_SIZE;
  @Input() height = DEFAULT_ICON_SIZE;

  @Input() primary = 'var(--ion-color-secondary)';
  @Input() secondary = 'var(--ion-color-secondary-tint)';
}
