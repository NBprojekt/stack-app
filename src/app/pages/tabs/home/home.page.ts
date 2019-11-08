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

  private filter: IQuestionFilter;

  constructor(
    private questionsService: QuestionsService,
  ) { }

  ngOnInit() {
    this.doRefresh();
  }

  doRefresh(event?: any): void {
    this.questionsService.getQuestions(this.filter).subscribe((response: IResponse) => {
      this.questions = response.items as Array<IQuestion>;
      if (event) { event.target.complete(); }
    });
  }

  updateFilter(filter: IQuestionFilter): void {
    this.questions = null;
    this.filter = filter;
    this.doRefresh();
  }
}
