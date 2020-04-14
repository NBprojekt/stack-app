import { Component, OnInit, Input } from '@angular/core';

import { IAnswer } from 'src/app/interfaces/answer';
import { IUser } from 'src/app/interfaces/user';

@Component({
  selector: 'answer-card',
  templateUrl: './answer-card.component.html',
  styleUrls: ['./answer-card.component.scss'],
})
export class AnswerCardComponent {
  @Input() answer: IAnswer;
  @Input() questionOwner: IUser;
  @Input() highlight: number;
  @Input() type: string;
}
