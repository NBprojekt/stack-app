import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public backdrop = false;
  public questions: Array<any>;

  constructor() { }

  ngOnInit() {
    this.doRefresh();
  }

  doRefresh(event?): void {

    setTimeout(() => {
      this.questions = [1, 2, 3, 4];
      if (event) {
        event.target.complete();
      }
    }, 1000);
  }
}
