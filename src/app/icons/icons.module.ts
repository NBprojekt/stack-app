import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapMarkerComponent } from './map-marker/map-marker.component';
import { BrowserComponent } from './browser/browser.component';
import { EyeComponent } from './eye/eye.component';
import { ClockComponent } from './clock/clock.component';

@NgModule({
  declarations: [
    MapMarkerComponent,
    BrowserComponent,
    EyeComponent,
    ClockComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    MapMarkerComponent,
    BrowserComponent,
    EyeComponent,
    ClockComponent,
  ],
})
export class IconsModule { }
