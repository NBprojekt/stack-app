import { Component, Input } from '@angular/core';
import { IUser } from 'src/app/interfaces/user';
import { Router } from '@angular/router';

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

  constructor (
    private router: Router,
  ) {}

  public openProfile(): void {
    this.router.navigateByUrl('/menu/user/' + this.user.user_id);
  }
}
