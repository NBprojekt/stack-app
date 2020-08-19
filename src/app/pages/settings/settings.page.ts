import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';

import { AuthService } from 'src/app/services/auth/auth.service';
import { IAuthInfo } from 'src/app/interfaces/auth-info';
import { UserService } from 'src/app/services/user/user.service';
import { IUser } from 'src/app/interfaces/user';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  private authInfo: IAuthInfo;
  public me: IUser;

  constructor(
    private actionSheetController: ActionSheetController,
    private auth: AuthService,
    private user: UserService,
  ) {}

  public async ngOnInit(): Promise<void> {
    this.authInfo = this.auth.getAuthInfo();
    this.me = await this.user.getMe();
  }

  public async openAccountInformation() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Access token',
      cssClass: 'disable-action-sheet-buttons',
      mode: 'md',
      buttons: [
        {
          text: `User: ${this.me.display_name}`,
          icon: 'person-outline',
          handler: () => { return false }
        },
        {
          text: `Token: ${this.authInfo.access_token}`,
          icon: 'key-outline',
          handler: () => { return false }
        },
        {
          text: `Account ID: ${this.authInfo.account_id}`,
          icon: 'server-outline',
          handler: () => { return false }
        },
        {
          text: `Expires: ${this.hasScope('no_expiry') ? 'Never' : this.formatTime(this.authInfo.expires_on_date)}`,
          icon: 'calendar-outline',
          handler: () => { return false }
        },
        {
          text: `Private info access: ${this.hasScope('private_info') ? 'Yes' : 'No'}`,
          icon: 'finger-print-outline',
          handler: () => { return false }
        },
        {
          text: `Write access: ${this.hasScope('write_access') ? 'Yes' : 'No'}`,
          icon: 'reader-outline',
          handler: () => { return false }
        },
        {
          text: `Read inbox: ${this.hasScope('read_inbox') ? 'Yes' : 'No'}`,
          icon: 'file-tray-full-outline',
          handler: () => { return false }
        },
        {
          text: 'Close',
          icon: 'close',
          role: 'cancel',
        },
      ]
    });
    await actionSheet.present();
  }

  private hasScope(scope: string): boolean {
    return this.authInfo.scope.includes(scope);
  }
  private formatTime(unixTimestamp: number) : string {
    return moment.unix(unixTimestamp).format('LLL');
  }
}
