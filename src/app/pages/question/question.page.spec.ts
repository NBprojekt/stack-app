import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { IonicModule } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Storage } from '@ionic/storage';

import { QuestionPage } from './question.page';
import { VotingModule } from 'src/app/components/voting/voting.module';
import { CommonPipesModule } from 'src/app/pipes/common-pipes.module';

describe('QuestionPage', () => {
  let component: QuestionPage;
  let fixture: ComponentFixture<QuestionPage>;
  let storageIonicMock;

  beforeEach(async(() => {
    storageIonicMock = {
      get: () => new Promise<any>((resolve, reject) => resolve('test')),
    };

    TestBed.configureTestingModule({
      declarations: [
        QuestionPage,
      ],
      imports: [
        VotingModule,
        CommonPipesModule,
        RouterTestingModule,
        HttpClientTestingModule,
        IonicModule,
      ],
      providers: [
        InAppBrowser,
        { provide: Storage, useValue: storageIonicMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });
});
