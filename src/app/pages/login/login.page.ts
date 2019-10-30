import { Component, OnInit, ViewChild } from '@angular/core';

import { AuthService } from 'src/app/services/auth/auth.service';

import {IonSlides} from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild('slides', {static: true}) slides: IonSlides;
  public slidesLength: number;
  public reachedEnd: boolean;

  constructor(
    private authService: AuthService,
  ) { }

  async ngOnInit() {
    this.slidesLength = await this.slides.length();

    this.slides.ionSlidePrevEnd.subscribe(() => this.reachedEnd = false);
    this.slides.ionSlideReachEnd.subscribe(reachedEnd => this.reachedEnd = reachedEnd);
  }

  logIn() {
    this.authService.openLogin();
  }

  async skip() {
    this.slides.slideTo(this.slidesLength - 1);
  }
}
