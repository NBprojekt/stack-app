import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IUser } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit, OnDestroy {
  private user: IUser;
  private destroy = new Subject<any>();

  constructor(
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.userService.userChanged
      .pipe(
        takeUntil(this.destroy)
      ).subscribe(() => this.getMe());
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  private async getMe(): Promise<void> {
    this.user = await this.userService.getMe();
  }
}
