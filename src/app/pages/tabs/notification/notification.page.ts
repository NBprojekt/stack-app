import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IResponse } from 'src/app/interfaces/response';
import { SitesService } from 'src/app/services/sites/sites.service';
import { AnswerService } from 'src/app/services/answer/answer.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit, OnDestroy {
  public section: 'inbox' | 'achievements';

  public inbox: Array<any>;
  public achievements: Array<any>;

  private inboxPage: number;
  private achievementsPage: number;
  private destroy: Subject<any>;

  constructor(
    private router: Router,
    private siteService: SitesService,
    private answerService: AnswerService,
    private notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    this.section = 'inbox';

    this.inboxPage = 1;
    this.achievementsPage = 1;
    this.destroy = new Subject<any>();

    this.notificationService
      .inbox()
      .pipe(takeUntil(this.destroy))
      .subscribe(inbox => this.inbox = inbox);

    this.notificationService
      .achievements()
      .pipe(takeUntil(this.destroy))
      .subscribe(achievements => this.achievements = achievements);
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  public async forwardInternally(item): Promise<void> {
    await this.siteService.setCurrentSite(item.site || item.on_site);

    const linkSplited: Array<string> = item.link.split('/');

    switch (item.item_type || item.achievement_type) {
      case 'reputation':
        if (this.specialReputation(item)) {
          break;
        }
        this.router.navigateByUrl(linkSplited[linkSplited.length - 1].includes('#') ?
          `/menu/pages/question/${linkSplited[4]}/${linkSplited[5]}/answer/${linkSplited[6]}` :
          `/menu/pages/question/${linkSplited[4]}/${linkSplited[5]}`);
        break;
      case 'new_answer':
        this.router.navigateByUrl(`/menu/pages/question/${item.question_id}/${item.title}/answer/${item.answer_id}`);
        break;
      case 'comment':
        // TODO: This is a temporary fix
        // When its a comment on an answer it dont contains a question id which is required
        // Currently as a workaround I obtain the id from the answer service
        if (item.question_id) {
          this.router.navigateByUrl(`/menu/pages/question/${item.question_id}/${item.title}/comment/${item.comment_id}`);
        }
        if (item.answer_id) {
          this.answerService.getQuestions(item.answer_id).subscribe((response: IResponse) => {
            this.router.navigateByUrl(`/menu/pages/question/${response.items[0].question_id}/${item.title}/comment/${item.comment_id}`);
          });
        }
        break;
      case 'help':
        console.log(['NOTIFICATION HAPE: HELP', item])
        break;
    }
  }

  public countUnread(items: any): number {
    if (!items) {
      return 0;
    }

    return items
      .map(item => item.is_unread ?
        item.reputation_change ?
          item.reputation_change
          : 1
        : 0)
      .reduce((accumulator, currentValue) => accumulator + currentValue);
  }

  public loadMoreInboxItems(event?: any): void {
    this.inboxPage++;

    this.notificationService
      .getInbox({ page: this.inboxPage })
      .subscribe((response: IResponse) => {
        this.inbox = this.inbox.concat(response.items as Array<any>);

        if (event) {
          event.target.complete();
          if (!response.has_more) { event.target.disabled = true; }
        }
      });
  }
  public loadMoreAchievements(event?: any): void {
    this.achievementsPage++;

    this.notificationService
      .getAchievements({ page: this.achievementsPage })
      .subscribe((response: IResponse) => {
        this.achievements = this.achievements.concat(response.items as Array<any>);

        if (event) {
          event.target.complete();
          if (!response.has_more) { event.target.disabled = true; }
        }
      });
  }

  private specialReputation(item: any): boolean {
    // TODO: Create pages to redirect when its a special reputation
    return item.achievement_type === 'badge' ||
      item.title.includes('bonus of 100 reputation because we trust you on other sites in the network') ||
      item.title.includes('User was removed');
  }
}
