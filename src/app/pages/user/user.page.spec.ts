import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { IonicModule } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { ChartsModule } from 'ng2-charts';

import { UserPage } from './user.page';
import { CommonPipesModule } from 'src/app/pipes/common-pipes.module';
import { ShortenNumberPipe } from 'src/app/pipes/shorten-number/shorten-number.pipe';

describe('UserPage', () => {
  let component: UserPage;
  let fixture: ComponentFixture<UserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPage ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        IonicModule,
        CommonPipesModule,
      ],
      providers: [
        InAppBrowser,
        ShortenNumberPipe, // Why do i need this line? I don't know, but without it does not work ¯\_(ツ)_/¯
        {
          provide: Storage, useValue: {
            get: () => new Promise<any>((resolve, reject) => resolve('test')),
          }
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
