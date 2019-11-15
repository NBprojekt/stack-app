import { Component, OnInit, Input } from '@angular/core';
import { IUser } from 'src/app/interfaces/user';
import { IQuestion } from 'src/app/interfaces/question';
import { IAnswer } from 'src/app/interfaces/answer';

@Component({
  selector: 'user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent implements OnInit {
  @Input() user: IUser;

  @Input() action?: string;
  @Input() timestamp?: number;
  @Input() highlight?: boolean;

  constructor() { }

  ngOnInit() {}

}
