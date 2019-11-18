import { Component, Input } from '@angular/core';
import { IUser } from 'src/app/interfaces/user';

@Component({
  selector: 'user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent {
  @Input() user: IUser;

  @Input() action?: string;
  @Input() timestamp?: number;
  @Input() highlight?: boolean;
}
