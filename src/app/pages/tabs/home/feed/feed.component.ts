import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


import { IQuestion } from 'src/app/interfaces/question';
import { IQuestionOptions } from 'src/app/interfaces/question-options';
import { QuestionsService } from 'src/app/services/questions/questions.service';

@Component({
  selector: 'home-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  @Input() questions: Array<IQuestion>;
  @Output() options = new EventEmitter<IQuestionOptions>();

  public filter: string;

  constructor(
    private questionService: QuestionsService,
  ) {}

  ngOnInit() {
    this.filter =  'interesting';
  }

  public fill = (times: number) => new Array<number>(times).fill(1);
  public questionIsHot = (question: IQuestion) => this.questionService.questionIsHot(question);

  public filterChange(): void {
    switch (this.filter) {
      case 'interesting':
        this.options.emit({});
        return;
      case 'bountied':
        this.options.emit({featured: true});
        return;
      case 'hot':
        this.options.emit({sort: 'hot'});
        return;
      case 'week':
        this.options.emit({sort: 'week'});
        return;
      case 'month':
        this.options.emit({sort: 'month'});
        return;
      default:
        this.options.emit({});
        return;
    }
  }
}
