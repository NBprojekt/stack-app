import { Component, Input } from '@angular/core';

import { DEFAULT_ICON_SIZE, DEFAULT_ICON_COLOR_PRIMARY, DEFAULT_ICON_COLOR_SECONDARY } from '../icons.settings';

@Component({
  selector: 'icon-check',
  templateUrl: './check.icon.html',
})
export class CheckIcon {
  @Input() width = DEFAULT_ICON_SIZE;
  @Input() height = DEFAULT_ICON_SIZE;

  @Input() primary = DEFAULT_ICON_COLOR_PRIMARY;
  @Input() secondary = DEFAULT_ICON_COLOR_SECONDARY;
}
