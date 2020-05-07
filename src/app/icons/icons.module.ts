import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapMarkerComponent } from './map-marker/map-marker.component';
import { BrowserComponent } from './browser/browser.component';
import { EyeComponent } from './eye/eye.component';
import { ClockComponent } from './clock/clock.component';
import { CalendarDayComponent } from './calendar-day/calendar-day.component';
import { PaintBrushComponent } from './paint-brush/paint-brush.component';
import { ChartPieComponent } from './chart-pie/chart-pie.component';
import { InfoCircleComponent } from './info-circle/info-circle.component';
import { CogsComponent } from './cogs/cogs.component';
import { UserTieComponent } from './user-tie/user-tie.component';
import { HouseDayComponent } from './house-day/house-day.component';

@NgModule({
  declarations: [
    MapMarkerComponent,
    BrowserComponent,
    EyeComponent,
    ClockComponent,
    CalendarDayComponent,
    PaintBrushComponent,
    ChartPieComponent,
    InfoCircleComponent,
    CogsComponent,
    UserTieComponent,
    HouseDayComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    MapMarkerComponent,
    BrowserComponent,
    EyeComponent,
    ClockComponent,
    CalendarDayComponent,
    PaintBrushComponent,
    ChartPieComponent,
    InfoCircleComponent,
    CogsComponent,
    UserTieComponent,
    HouseDayComponent,
  ],
})
export class IconsModule { }
