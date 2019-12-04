import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { IonSlides } from '@ionic/angular';

import { AuthService } from 'src/app/services/auth/auth.service';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  public slidesLength: number;
  public reachedEnd: boolean;

  private unsubscribe$ = new Subject<void>();

  @ViewChild('slides', {static: true}) slides: IonSlides;

  constructor(
    private authService: AuthService,
  ) { }

  async ngOnInit(): Promise<void> {
    this.slidesLength = await this.slides.length();

    this.slides.ionSlidePrevEnd
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.reachedEnd = false);
    this.slides.ionSlideReachEnd
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((reachedEnd: any) => this.reachedEnd = reachedEnd);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public logIn(): void {
    this.authService.openLogin();
  }

  public async skip(): Promise<void> {
    this.slides.slideTo(this.slidesLength - 1);
  }
}
