import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { QuestionsService } from 'src/app/services/questions/questions.service';
import { IQuestion } from 'src/app/interfaces/question';
import { IResponse } from 'src/app/interfaces/response';
import { DomSanitizer } from '@angular/platform-browser';
import { IAnswer } from 'src/app/interfaces/answer';

@Component({
  selector: 'app-question',
  templateUrl: './question.page.html',
  styleUrls: ['./question.page.scss']
})
export class QuestionPage implements OnInit {
  private id: number;
  public question: IQuestion;
  public answers: Array<IAnswer>;

  constructor(
    private route: ActivatedRoute,
    private questionsService: QuestionsService,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');

    this.getQuestion(this.id);
    this.getAnswers(this.id);
  }

  private getQuestion(id: number, event?: any): void {
    this.questionsService.getQuestion(id).subscribe((response: IResponse) => {
      this.question = response.items[0] as IQuestion;
      this.question.body = this.sanitizer.bypassSecurityTrustHtml(this.question.body as string);
      if (this.question.comments) {
        this.question.comments.map(comment => comment.body = this.sanitizer.bypassSecurityTrustHtml(comment.body as string));
      } 
    });
  }

  private getAnswers(id: number): void {
    this.questionsService.getAnswers(id).subscribe((response: IResponse) => {
      this.answers = response.items as Array<IAnswer>;
      this.answers.map((answer: IAnswer) => answer.body = this.sanitizer.bypassSecurityTrustHtml(answer.body as string));
    });
  }
}
