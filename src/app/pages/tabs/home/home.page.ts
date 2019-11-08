import { Component, OnInit } from '@angular/core';

import { QuestionsService } from 'src/app/services/questions/questions.service';

import { IQuestion } from 'src/app/interfaces/question';
import { IQuestionFilter } from 'src/app/interfaces/question-filter';
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

  private filter: IQuestionFilter;
  private page: number;

  constructor(
    private questionsService: QuestionsService,
  ) { }

  ngOnInit() {
    this.doRefresh();
  }

  doRefresh(event?: any): void {
    this.page = 1;
    this.questionsService.getQuestions(this.filter).subscribe((response: IResponse) => {
      this.questions = response.items as Array<IQuestion>;
      if (event) { event.target.complete(); }
      console.log(response)
    });
  }

  loadMore(): void {
    if (this.loading) { return; }

    this.loading = true;
    this.page++;

    this.questionsService.getQuestions(this.filter, this.page).subscribe((response: IResponse) => {
      this.questions = this.questions.concat(response.items as Array<IQuestion>);
      this.loading = false;
      console.log(this.questions)
    });
  }

  updateFilter(filter: IQuestionFilter): void {
    this.questions = null;
    this.filter = filter;
    this.doRefresh();
  }
}
