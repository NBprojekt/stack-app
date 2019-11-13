import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.scss'],
})
export class VotingComponent implements OnInit {
  @Input() score: number;

  constructor() { }

  ngOnInit() {}

}
