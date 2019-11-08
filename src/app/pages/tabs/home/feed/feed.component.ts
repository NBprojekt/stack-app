import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { IQuestionPreview } from 'src/app/interfaces/question-preview';
import { IQuestionFilter } from 'src/app/interfaces/question-filter';

@Component({
  selector: 'home-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  @Input() questions: Array<IQuestionPreview>;
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

  // TODO: Implement this method
  public openQuestion(id: number): void {
    console.log('Open question ' + id);
  }
}
