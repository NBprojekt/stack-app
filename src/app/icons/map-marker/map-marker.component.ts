import { Component, Input } from '@angular/core';

import { DEFAULT_ICON_SIZE } from '../icons.module';

@Component({
  selector: 'icon-map-marker',
  templateUrl: './map-marker.component.html',
})
export class MapMarkerComponent {
  @Input() width = DEFAULT_ICON_SIZE;
  @Input() height = DEFAULT_ICON_SIZE;

  @Input() primary = 'var(--ion-color-secondary)';
  @Input() secondary = 'var(--ion-color-secondary-tint)';
}
