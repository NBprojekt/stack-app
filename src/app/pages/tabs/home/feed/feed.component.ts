import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'home-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  @Input() data: string;

  constructor() { }

  ngOnInit() {}

  public fill = (times: number) => new Array<number>(times).fill(1);

}
