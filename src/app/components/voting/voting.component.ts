import { Component, Input, OnInit } from '@angular/core';

import { AlertController } from '@ionic/angular';

import { QuestionsService } from 'src/app/services/questions/questions.service';

import { IResponse, IResponseError } from 'src/app/interfaces/response';
import { AnswerService } from 'src/app/services/answer/answer.service';

@Component({
  selector: 'voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.scss'],
})
export class VotingComponent implements OnInit {
  @Input() id: number;
  @Input() mode: 'question' | 'answer';
  @Input() score: number;

  @Input() upvoted?: boolean;
  @Input() downvoted?: boolean;

  @Input() showFavorites?: boolean;
  @Input() isFavorite?: boolean;
  @Input() countFavorites?: number;

  @Input() showAccepted?: boolean;
  @Input() isAccepted?: boolean;

  constructor(
    private questionService: QuestionsService,
    private answerService: AnswerService,
    private alertController: AlertController,
  ) {}

  public ngOnInit(): void {
    console.log([this.id, this.mode]);
  }

  /**
   * TODO: Refactor this shitty code
   * It works tho :D
   */
  public toggleUpvote(): void {
    if (this.upvoted) {
      (
        this.mode === 'question' ?
        this.questionService.upvoteQuestionUndo(this.id) :
        this.answerService.upvoteAnswerUndo(this.id)
      ).subscribe(
        () => {
          this.score--;
          this.upvoted = false;
        },
        (response: any) => this.errorHandler(response.error as IResponseError),
      );
    } else {
      if (this.downvoted) {
        (
          this.mode === 'question' ?
          this.questionService.downvoteQuestionUndo(this.id) :
          this.answerService.downvoteAnswer(this.id)
        ).subscribe(
          () => {
            (
              this.mode === 'question' ?
              this.questionService.upvoteQuestion(this.id) :
              this.answerService.upvoteAnswer(this.id)
            ).subscribe(
              () => {
                this.score += 2;
                this.upvoted = true;
                this.downvoted = false;
              },
              (response: any) => this.errorHandler(response.error as IResponseError),
            );
          },
          (response: any) => this.errorHandler(response.error as IResponseError),
        );
      } else {
        (
          this.mode === 'question' ?
          this.questionService.upvoteQuestion(this.id) :
          this.answerService.upvoteAnswer(this.id)
        ).subscribe(
          () => {
            this.score++;
            this.upvoted = true;
          },
          (response: any) => this.errorHandler(response.error as IResponseError),
        );
      }
    }
  }
  public toggleDownvote(): void {
    if (this.downvoted) {
      (
        this.mode === 'question' ?
        this.questionService.downvoteQuestionUndo(this.id) :
        this.answerService.downvoteAnswerUndo(this.id)
      ).subscribe(
        () => {
          this.score++;
          this.downvoted = false;
        },
        (response: any) => this.errorHandler(response.error as IResponseError),
      );
    } else {
      if (this.upvoted) {
        (
          this.mode === 'question' ?
          this.questionService.upvoteQuestionUndo(this.id) :
          this.answerService.upvoteAnswerUndo(this.id)
        ).subscribe(
          () => {
            (
              this.mode === 'question' ?
              this.questionService.downvoteQuestion(this.id) :
              this.answerService.downvoteAnswer(this.id)
            ).subscribe(
              () => {
                this.score -= 2;
                this.upvoted = false;
                this.downvoted = true;
              },
              (response: any) => this.errorHandler(response.error as IResponseError),
            );
          },
          (response: any) => this.errorHandler(response.error as IResponseError),
        );
      } else {
        (
          this.mode === 'question' ?
          this.questionService.downvoteQuestion(this.id) :
          this.answerService.downvoteAnswer(this.id)
        ).subscribe(
          () => {
            this.score--;
            this.downvoted = true;
          },
          (response: any) => this.errorHandler(response.error as IResponseError),
        );
      }
    }
  }
  // End of Refactor this shitty code

  public toggleFavorite(): void {
    if (this.isFavorite) {
      this.isFavorite = false;
      this.countFavorites--;

      this.questionService
        .favoriteQuestionUndo(this.id)
        .subscribe(() => {});
    } else {
      this.isFavorite = true;
      this.countFavorites++;

      this.questionService
        .favoriteQuestion(this.id)
        .subscribe(() => {});
    }
  }

  public toggleAccepted(): void {
    this.isAccepted = !this.isAccepted;
  }

  private async errorHandler(response: IResponseError): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Can\'t cast this vote',
      message: response.error_message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
