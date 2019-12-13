import { Component, Input } from '@angular/core';

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


  public toggleUpvote(): void {

    if (this.upvoted) {
      this.upvoted = false;
      this.score--;
    } else {
      this.upvoted = true;
      this.downvoted ? this.score += 2 : this.score++;
      this.downvoted = false;
    }
  }
  public toggleDownvote(): void {

    if (this.downvoted) {
      this.downvoted = false;
      this.score++;
    } else {
      this.downvoted = true;
      this.upvoted ? this.score -= 2 : this.score--;
      this.upvoted = false;
    }
  }

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
}
