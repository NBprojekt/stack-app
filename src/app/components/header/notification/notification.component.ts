import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { IQuestionOptions } from 'src/app/interfaces/question-options';
import { IResponse } from 'src/app/interfaces/response';

import { AuthService } from 'src/app/services/auth/auth.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  @Input() title: string;
  @Input() items: any;

  private options: IQuestionOptions;

  constructor(
    private modalController: ModalController,
    public notificatinoService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.options = {
      page: 1,
    };
  }


  public dismiss(): void {
    this.modalController.dismiss();
  }

  public loadMore(event?: any): void {
    this.options.page++;

    (this.title === 'Inbox' ?
      this.notificatinoService.getInbox(this.options) :
      this.notificatinoService.getAchievements(this.options)
    ).subscribe((response: IResponse) => {
      this.items = this.items.concat(response.items as Array<any>);

      if (event) {
        event.target.complete();
        if (!response.has_more) { event.target.disabled = true; }
      }
    });
  }
}
