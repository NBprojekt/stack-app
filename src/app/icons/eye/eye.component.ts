import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-eye',
  templateUrl: './eye.component.html',
})
export class EyeComponent {
  @Input() width = '200px';
  @Input() height = '200px';

  @Input() primary = 'var(--ion-color-secondary)';
  @Input() secondary = 'var(--ion-color-secondary-tint)';
}
