import { Component, OnInit } from '@angular/core';

import { QuestionsService } from 'src/app/services/questions/questions.service';

import { IQuestion } from 'src/app/interfaces/question';
import { IQuestionOptions } from 'src/app/interfaces/question-options';
import { IResponse } from 'src/app/interfaces/response';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public backdrop = false;
  public questions: Array<IQuestion>;

  private options: IQuestionOptions;

  constructor(
    private questionsService: QuestionsService,
  ) { }

  public ngOnInit(): void {
    this.options = {};
    this.doRefresh();
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

  public updateFilter(options: IQuestionOptions): void {
    this.questions = null;
    this.options = options;
    this.doRefresh();
  }
}
