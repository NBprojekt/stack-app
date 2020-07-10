import { Component, Input } from '@angular/core';

import { DEFAULT_ICON_SIZE, DEFAULT_ICON_COLOR_PRIMARY } from '../icons.settings';

@Component({
  selector: 'icon-arrow',
  templateUrl: './arrow.icon.html',
})
export class ArrowIcon {
  @Input() width = DEFAULT_ICON_SIZE;
  @Input() height = DEFAULT_ICON_SIZE;

  @Input() primary = DEFAULT_ICON_COLOR_PRIMARY;
  @Input() direction: 'up' | 'right' | 'down' | 'left' = 'up';
}
