import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionPage } from './question.page';
import { VotingModule } from 'src/app/components/voting/voting.module';
import { CommonPipesModule } from 'src/app/pipes/common-pipes.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

describe('QuestionPage', () => {
  let component: QuestionPage;
  let fixture: ComponentFixture<QuestionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        QuestionPage,
      ],
      imports: [
        VotingModule,
        CommonPipesModule,
        RouterTestingModule,
        HttpClientModule,
        IonicModule,
        VotingModule,
      ],
      providers: [
        InAppBrowser,
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
