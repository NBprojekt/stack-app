import { Component, Input } from '@angular/core';

import { IQuestion } from 'src/app/interfaces/question';

@Component({
  selector: 'question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss'],
})
export class QuestionCardComponent {
  @Input() question: IQuestion;
  @Input() highlight: number;
  @Input() type: string;
}
