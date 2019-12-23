import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-question-options',
  templateUrl: './question-options.component.html',
  styleUrls: ['./question-options.component.scss'],
})
export class QuestionOptionsComponent implements OnInit {
  private link: string;

  constructor(
    private navParams: NavParams,
  ) { }

  ngOnInit() {
    this.link = this.navParams.data.link;
  }

  public openInBrowser(): void {
    window.open(this.link, '_blank').focus();
  }
}
