import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.scss'],
})
export class VotingComponent implements OnInit {
  @Input() questionId: number;
  @Input() score: number;

  @Input() upvoted?: boolean;
  @Input() downvoted?: boolean;

  @Output() upvote: EventEmitter<void>;
  @Output() downvote: EventEmitter<void>;

  @Input() showFavorites?: boolean;
  @Input() isFavorite?: boolean;
  @Input() countFavorites?: number;
  @Output() favorite: EventEmitter<void>;

  @Input() showAccepted?: boolean;
  @Input() isAccepted?: boolean;
  @Output() accept: EventEmitter<void>;

  public ngOnInit(): void {
    this.upvote = new EventEmitter();
    this.downvote = new EventEmitter();
    this.favorite = new EventEmitter();
    this.accept = new EventEmitter();
  }

  public toggleUpvote(): void {
    this.upvote.emit();

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
    this.downvote.emit();

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
    this.favorite.emit();

    if (this.isFavorite) {
      this.isFavorite = false;
      this.countFavorites--;
    } else {
      this.isFavorite = true;
      this.countFavorites++;
    }
  }

  public toggleAccepted(): void {
    this.accept.emit();
    this.isAccepted = !this.isAccepted;
  }
}
