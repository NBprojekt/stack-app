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
  public loading: boolean;

  private options: IQuestionOptions;

  constructor(
    private questionsService: QuestionsService,
  ) { }

  ngOnInit() {
    this.options = {};
    this.doRefresh();
  }

  doRefresh(event?: any): void {
    this.options.page = 1;
    this.questionsService.getQuestions(this.options).subscribe((response: IResponse) => {
      this.questions = response.items as Array<IQuestion>;
      if (event) { event.target.complete(); }
    });
  }

  loadMore(): void {
    if (this.loading) { return; }

    this.loading = true;
    this.options.page++;

    this.questionsService.getQuestions(this.options).subscribe((response: IResponse) => {
      this.questions = this.questions.concat(response.items as Array<IQuestion>);
      this.loading = false;
    });
  }

  updateFilter(options: IQuestionOptions): void {
    this.questions = null;
    this.options = options;
    this.doRefresh();
  }
}
