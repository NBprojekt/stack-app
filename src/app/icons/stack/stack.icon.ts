import { Component, Input } from '@angular/core';

import { DEFAULT_ICON_SIZE, DEFAULT_ICON_COLOR_PRIMARY, DEFAULT_ICON_COLOR_SECONDARY } from '../icons.settings';

@Component({
  selector: 'icon-stack',
  templateUrl: './stack.icon.html',
})
export class StackIcon {
  @Input() width = DEFAULT_ICON_SIZE;
  @Input() height = DEFAULT_ICON_SIZE;

  @Input() primary = DEFAULT_ICON_COLOR_PRIMARY;
  @Input() secondary = DEFAULT_ICON_COLOR_SECONDARY;
}
