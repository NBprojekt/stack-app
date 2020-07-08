import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { QuestionsService } from 'src/app/services/questions/questions.service';
import { IQuestion } from 'src/app/interfaces/question';
import { IResponse } from 'src/app/interfaces/response';
import { DomSanitizer } from '@angular/platform-browser';
import { IAnswer } from 'src/app/interfaces/answer';
import { DOCUMENT } from '@angular/common';
import { UserService } from 'src/app/services/user/user.service';
import { IUser } from 'src/app/interfaces/user';

@Component({
  selector: 'app-question',
  templateUrl: './question.page.html',
  styleUrls: ['./question.page.scss']
})
export class QuestionPage implements OnInit {
  private currentUser: IUser;
  private id: number;

  public title: string;
  public question: IQuestion;
  public answers: Array<IAnswer>;

  public highlight: number;
  public type: string;

  constructor(
    @Inject(DOCUMENT) document,
    private route: ActivatedRoute,
    private questionsService: QuestionsService,
    private sanitizer: DomSanitizer,
    private userService: UserService,
  ) { }

  async ngOnInit(): Promise<void> {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.title = (this.route.snapshot.paramMap.get('title') || 'Question').split('-').join(' ');

    this.currentUser = await this.userService.getMe();

    this.getQuestion(this.id);
    this.getAnswers(this.id);
    this.highlight = +this.route.snapshot.paramMap.get('highlight') ||  0;
    this.type = this.route.snapshot.paramMap.get('type');
  }

  public isOwner(questionOwner: IUser): boolean {
    return questionOwner && questionOwner.user_id === this.currentUser.user_id;
  }

  private getQuestion(id: number, event?: any): void {
    this.questionsService.getQuestion(id).subscribe((response: IResponse) => {
      this.question = response.items[0] as IQuestion;
      this.question.body = this.sanitizer.bypassSecurityTrustHtml(this.question.body as string);
      this.title = this.question.title;

      if (this.question.comments) {
        this.question.comments.map(comment => comment.body = this.sanitizer.bypassSecurityTrustHtml(comment.body as string));
      }

      this.highLight();
    });
  }

  private getAnswers(id: number): void {
    this.questionsService.getAnswers(id).subscribe((response: IResponse) => {
      this.answers = response.items as Array<IAnswer>;
      this.answers.map((answer: IAnswer) => answer.body = this.sanitizer.bypassSecurityTrustHtml(answer.body as string));

      this.answers.forEach(answer => {
        if (answer.comments) {
          answer.comments.map(comment => comment.body = this.sanitizer.bypassSecurityTrustHtml(comment.body as string));
        }
      });

      this.highLight();
    });
  }
  private highLight(): void {
    setTimeout(() => {
      const classElement = document.getElementsByClassName('highlighted-by-link');
      if (classElement.length > 0) {
        classElement[0].scrollIntoView();
      }
    }, 100);
  }
}
