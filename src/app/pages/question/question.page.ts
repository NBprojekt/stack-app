import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { QuestionsService } from 'src/app/services/questions/questions.service';
import { IQuestion } from 'src/app/interfaces/question';
import { IResponse } from 'src/app/interfaces/response';

@Component({
  selector: 'app-question',
  templateUrl: './question.page.html',
  styleUrls: ['./question.page.scss'],
})
export class QuestionPage implements OnInit {
  private id: number;
  public question: IQuestion;

  constructor(
    private route: ActivatedRoute,
    private questionsService: QuestionsService,
  ) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    console.log(this.id)
    this.doRefresh(this.id);
  }

  doRefresh(id: number, event?: any): void {
    this.questionsService.getQuestion(id).subscribe((response: IResponse) => {
      this.question = response.items[0] as IQuestion;
      if (event) { event.target.complete(); }
      console.log(response)
    });
  }
}
