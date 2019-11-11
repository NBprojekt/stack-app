import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { QuestionsService } from 'src/app/services/questions/questions.service';
import { IQuestion } from 'src/app/interfaces/question';
import { IResponse } from 'src/app/interfaces/response';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-question',
  templateUrl: './question.page.html',
  styleUrls: ['./question.page.scss']
})
export class QuestionPage implements OnInit {
  private id: number;
  public question: IQuestion;

  constructor(
    private route: ActivatedRoute,
    private questionsService: QuestionsService,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.doRefresh(this.id);
  }

  doRefresh(id: number, event?: any): void {
    this.questionsService.getQuestion(id).subscribe((response: IResponse) => {
      this.question = response.items[0] as IQuestion;
      this.question.body = this.sanitizer.bypassSecurityTrustHtml(this.question.body as string);
      if (event) { event.target.complete(); }
    });
  }
}
