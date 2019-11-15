import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import * as moment from 'moment';

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

  ngOnInit() {
    this.filter =  'interesting';
  }

  public fill = (times: number) => new Array<number>(times).fill(1);

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

  public questionIsHot(question: IQuestion): boolean {
    if (!question.answers) { return false; }

    let summAnswerScore = 0;
    question.answers.map(answer => summAnswerScore += answer.score);

    return (((Math.log(question.view_count) * 4) + ((question.answer_count * question.score) / 5) + summAnswerScore) /
            Math.pow(((this.unixTimestampToHours(question.creation_date) + 1) -
                     ((this.unixTimestampToHours(question.creation_date) - this.unixTimestampToHours(question.last_activity_date))
                     / 2))
                    , 1.5)
            ) > 0;
  }

  private unixTimestampToHours(unixTimestamp: number): number {
    const start = moment.unix(unixTimestamp);
    const end = moment();
    const duration = moment.duration(end.diff(start));
    return duration.asHours();
  }
}
