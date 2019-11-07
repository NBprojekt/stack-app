import { Component, OnInit, Input } from '@angular/core';

import { IQuestionPreview } from 'src/app/interfaces/question-preview';

@Component({
  selector: 'home-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  @Input() questions: Array<IQuestionPreview>;

  constructor() { }

  ngOnInit() {}

  public fill = (times: number) => new Array<number>(times).fill(1);

}
