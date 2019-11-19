import { Component, Input } from '@angular/core';

@Component({
  selector: 'voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.scss'],
})
export class VotingComponent {
  @Input() score: number;

  @Input() showFavorites?: boolean;
  @Input() isFavorite?: boolean;
  @Input() countFavorites?: number;

  @Input() showAccepted?: boolean;
  @Input() isAccepted?: boolean;

  public toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
  }
  public toggleAccepted(): void {
    this.isAccepted = !this.isAccepted;
  }
}
