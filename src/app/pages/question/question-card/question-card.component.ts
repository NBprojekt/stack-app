import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { IQuestion } from 'src/app/interfaces/question';

@Component({
  selector: 'question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss'],
})
export class QuestionCardComponent implements OnInit {
  @Input() question: IQuestion;

  @Output() upvote: EventEmitter<void>;
  @Output() downvote: EventEmitter<void>;
  @Output() favorite: EventEmitter<void>;
  @Output() accept: EventEmitter<void>;

  public ngOnInit(): void {
    this.upvote = new EventEmitter();
    this.downvote = new EventEmitter();
    this.favorite = new EventEmitter();
    this.accept = new EventEmitter();
  }
}
