import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { IRequestOptions } from 'src/app/interfaces/request-options';
import { IResponse } from 'src/app/interfaces/response';

import { AuthService } from 'src/app/services/auth/auth.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { Router } from '@angular/router';
import { SitesService } from 'src/app/services/sites/sites.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  @Input() title: string;
  @Input() items: any;

  private options: IRequestOptions;

  constructor(
    public notificatinoService: NotificationService,
    private modalController: ModalController,
    private router: Router,
    private siteService: SitesService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.options = {
      page: 1,
    };

    console.dir(this.items);
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

  public async forwardInternally(item): Promise<void> {
    const path = this.location.path();
    await this.siteService.setCurrentSite(item.site || item.on_site);

    const linkSplited: Array<string> = item.link.split('/');

    switch (item.item_type || item.achievement_type) {
      case 'reputation':
        this.router.navigateByUrl(linkSplited[linkSplited.length - 1].includes('#') ?
          `/menu/pages/question/${linkSplited[4]}/${linkSplited[5]}/answer/${linkSplited[6]}` :
          `/menu/pages/question/${linkSplited[4]}/${linkSplited[5]}`);
        break;
      case 'new_answer':
        this.router.navigateByUrl(`/menu/pages/question/${item.question_id}/${item.title}/answer/${item.answer_id}`);
        break;
      case 'comment':
        this.router.navigateByUrl(`/menu/pages/question/${item.question_id}/${item.title}/comment/${item.comment_id}`);
        break;
      case 'help':
        break;
    }

    this.modalController.dismiss();
  }
}
