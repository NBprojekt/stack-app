import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { DEFAULT_ICON_SIZE, DEFAULT_ICON_COLOR_PRIMARY, DEFAULT_ICON_COLOR_SECONDARY } from '../icons.settings';

@Component({
  selector: 'icon-notification-bell',
  templateUrl: './notification-bell.icon.html',
  styleUrls: ['./notification-bell.icon.scss'],
})
export class NotificationBellIcon {
  @Input() unreadItems = 0;
  @Input() mute = false;

  @Input() width = DEFAULT_ICON_SIZE;
  @Input() height = DEFAULT_ICON_SIZE;

  @Input() primary = DEFAULT_ICON_COLOR_PRIMARY;
  @Input() secondary = DEFAULT_ICON_COLOR_SECONDARY;
}
