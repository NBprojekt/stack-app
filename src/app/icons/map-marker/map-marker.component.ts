import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-map-marker',
  templateUrl: './map-marker.component.html',
})
export class MapMarkerComponent {
  @Input() width = '200px';
  @Input() height = '200px';

  @Input() primary = 'var(--ion-color-secondary)';
  @Input() secondary = 'var(--ion-color-secondary-tint)';
}
