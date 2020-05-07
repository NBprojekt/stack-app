import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapMarkerComponent } from './map-marker/map-marker.component';

@NgModule({
  declarations: [
    MapMarkerComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    MapMarkerComponent,
  ],
})
export class IconsModule { }
