import { Component, Input } from '@angular/core';

import { AlertController } from '@ionic/angular';

import { QuestionsService } from 'src/app/services/questions/questions.service';

import { IResponse, IResponseError } from 'src/app/interfaces/response';
import { AnswerService } from 'src/app/services/answer/answer.service';

@Component({
  selector: 'voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.scss'],
})
export class VotingComponent {
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
        (response: any) => this.errorHandler(response.error as IResponseError, 'Can\'t cast this vote'),
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
              (response: any) => this.errorHandler(response.error as IResponseError, 'Can\'t cast this vote'),
            );
          },
          (response: any) => this.errorHandler(response.error as IResponseError, 'Can\'t cast this vote'),
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
          (response: any) => this.errorHandler(response.error as IResponseError, 'Can\'t cast this vote'),
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
        (response: any) => this.errorHandler(response.error as IResponseError, 'Can\'t cast this vote'),
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
              (response: any) => this.errorHandler(response.error as IResponseError, 'Can\'t cast this vote'),
            );
          },
          (response: any) => this.errorHandler(response.error as IResponseError, 'Can\'t cast this vote'),
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
          (response: any) => this.errorHandler(response.error as IResponseError, 'Can\'t cast this vote'),
        );
      }
    }
  }

  public toggleFavorite(): void {
    if (this.isFavorite) {
      this.isFavorite = false;
      this.countFavorites--;

      this.questionService
        .favoriteQuestionUndo(this.id)
        .subscribe(
          () => {},
          (response: any) => this.errorHandler(response.error as IResponseError),
        );
    } else {
      this.isFavorite = true;
      this.countFavorites++;

      this.questionService
        .favoriteQuestion(this.id)
        .subscribe(
          () => {},
          (response: any) => this.errorHandler(response.error as IResponseError),
        );
    }
  }

  public toggleAccepted(): void {
    if (!this.showAccepted) return;

    if (this.isAccepted) {
      this.answerService
        .acceptAnswerUndo(this.id)
        .subscribe(
          () => this.isAccepted = false,
          (response: any) => this.errorHandler(response.error as IResponseError),
        );
    } else {
      this.answerService
        .acceptAnswer(this.id)
        .subscribe(
          () => this.isAccepted = true,
          (response: any) => this.errorHandler(response.error as IResponseError),
        );
    }
  }

  private async errorHandler(response: IResponseError, header?: string): Promise<void> {
    const alert = await this.alertController.create({
      header: header || 'Something went wrong',
      message: response.error_message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
