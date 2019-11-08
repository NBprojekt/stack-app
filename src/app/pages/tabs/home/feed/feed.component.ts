import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { IQuestion } from 'src/app/interfaces/question';
import { IQuestionFilter } from 'src/app/interfaces/question-filter';

@Component({
  selector: 'home-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  @Input() questions: Array<IQuestion>;
  @Output() questionFilter = new EventEmitter<IQuestionFilter>();

  public filter: string;

  constructor() { }

  ngOnInit() {
    this.filter =  'interesting';
  }

  public fill = (times: number) => new Array<number>(times).fill(1);

  public filterChange(): void {
    switch (this.filter) {
      case 'interesting':
        this.questionFilter.emit(null);
        return;
      case 'bountied':
        this.questionFilter.emit({featured: true});
        return;
      case 'hot':
        this.questionFilter.emit({sort: 'hot'});
        return;
      case 'week':
        this.questionFilter.emit({sort: 'week'});
        return;
      case 'month':
        this.questionFilter.emit({sort: 'month'});
        return;
      default:
        this.questionFilter.emit(null);
        return;
    }
  }
}
