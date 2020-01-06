import { Component, OnInit } from '@angular/core';

import { QuestionsService } from 'src/app/services/questions/questions.service';

import { IQuestion } from 'src/app/interfaces/question';
import { IRequestOptions } from 'src/app/interfaces/request-options';
import { IResponse } from 'src/app/interfaces/response';
import { RouterEvent, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public backdrop = false;
  public questions: Array<IQuestion>;

  private options: IRequestOptions;

  constructor(
    private questionsService: QuestionsService,
    private router: Router,
  ) { }

  public ngOnInit(): void {
    this.options = {};

    this.router.events
      .pipe(filter((event: RouterEvent) => event instanceof NavigationEnd))
      .subscribe(() => this.doRefresh());
  }

  public doRefresh(event?: any): void {
    this.options.page = 1;
    this.questionsService.getQuestions(this.options).subscribe((response: IResponse) => {
      this.questions = response.items as Array<IQuestion>;
      if (event) { event.target.complete(); }
    });
  }

  public loadMore(event?: any): void {
    this.options.page++;

    this.questionsService.getQuestions(this.options).subscribe((response: IResponse) => {
      this.questions = this.questions.concat(response.items as Array<IQuestion>);

      if (event) {
        event.target.complete();
        if (!response.has_more) { event.target.disabled = true; }
      }
    });
  }

  public updateFilter(options: IRequestOptions): void {
    this.questions = null;
    this.options = options;
    this.doRefresh();
  }
}
