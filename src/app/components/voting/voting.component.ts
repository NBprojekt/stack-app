import { Component, Input } from '@angular/core';

import { AlertController } from '@ionic/angular';

import { QuestionsService } from 'src/app/services/questions/questions.service';

import { IResponse, IResponseError } from 'src/app/interfaces/response';

@Component({
  selector: 'voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.scss'],
})
export class VotingComponent {
  @Input() questionId: number;
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
    private alertController: AlertController,
  ) {}

  /**
   * TODO: Refactor this shitty code
   * It works tho :D
   */
  public toggleUpvote(): void {
    if (this.upvoted) {
      this.questionService
        .upvoteQuestionUndo(this.questionId)
        .subscribe(
          () => {
            this.score--;
            this.upvoted = false;
          },
          (response: any) => this.errorHandler(response.error as IResponseError),
        );
    } else {
      if (this.downvoted) {
        this.questionService
          .downvoteQuestionUndo(this.questionId)
          .subscribe(
            () => {
              this.questionService
                .upvoteQuestion(this.questionId)
                .subscribe(
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
        this.questionService
          .upvoteQuestion(this.questionId)
          .subscribe(
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
      this.questionService
        .downvoteQuestionUndo(this.questionId)
        .subscribe(
          () => {
            this.score++;
            this.downvoted = false;
          },
          (response: any) => this.errorHandler(response.error as IResponseError),
        );
    } else {
      if (this.upvoted) {
        this.questionService
          .upvoteQuestionUndo(this.questionId)
          .subscribe(
            () => {
              this.questionService
                .downvoteQuestion(this.questionId)
                .subscribe(
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
        this.questionService
          .downvoteQuestion(this.questionId)
          .subscribe(
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
    } else {
      this.isFavorite = true;
      this.countFavorites++;
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
