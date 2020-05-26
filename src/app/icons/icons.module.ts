import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BellIcon } from './bell/bell.icon';
import { ClockIcon } from './clock/clock.icon';
import { CalendarDayIcon } from './calendar-day/calendar-day.icon';
import { BrowserIcon } from './browser/browser.icon';
import { ChartPieIcon } from './chart-pie/chart-pie.icon';
import { CogsIcon } from './cogs/cogs.icon';
import { EyeIcon } from './eye/eye.icon';
import { HouseIcon } from './house/house.icon';
import { InfoCircleIcon } from './info-circle/info-circle.icon';
import { MapMarkerIcon } from './map-marker/map-marker.icon';
import { PaintBrushIcon } from './paint-brush/paint-brush.icon';
import { SearchIcon } from './search/search.icon';
import { StackIcon } from './stack/stack.icon';
import { UserCardIcon } from './user-card/user-card.icon';
import { UserTieIcon } from './user-tie/user-tie.icon';
import { CaretIcon } from './caret/caret.icon';
import { CommentIcon } from './comment/comment.icon';

@NgModule({
  declarations: [
    BellIcon,
    BrowserIcon,
    CalendarDayIcon,
    ChartPieIcon,
    ClockIcon,
    CogsIcon,
    EyeIcon,
    HouseIcon,
    InfoCircleIcon,
    MapMarkerIcon,
    PaintBrushIcon,
    SearchIcon,
    StackIcon,
    UserCardIcon,
    UserTieIcon,
    CaretIcon,
    CommentIcon,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    BellIcon,
    BrowserIcon,
    CalendarDayIcon,
    ChartPieIcon,
    ClockIcon,
    CogsIcon,
    EyeIcon,
    HouseIcon,
    InfoCircleIcon,
    MapMarkerIcon,
    PaintBrushIcon,
    SearchIcon,
    StackIcon,
    UserCardIcon,
    UserTieIcon,
    CaretIcon,
    CommentIcon,
  ],
})
export class IconsModule { }
