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
  @Input() updateFunction: any;

  private options: IQuestionOptions;

  constructor(
    private modalController: ModalController,
    public notificatinoService: NotificationService,
    private authService: AuthService,
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
    console.log(this.options.page)

    this.notificatinoService.getInbox(this.options).subscribe((response: IResponse) => {
      this.items = this.items.concat(response.items as Array<any>);

      console.log(response)

      if (event) {
        event.target.complete();
        if (!response.has_more) { event.target.disabled = true; }
      }
    });
  }
}
