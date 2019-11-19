import { TestBed } from '@angular/core/testing';

import { QuestionsService } from './questions.service';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { RouterTestingModule } from '@angular/router/testing';
import { IQuestion } from 'src/app/interfaces/question';

describe('QuestionsService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        IonicModule,
        RouterTestingModule,
      ],
      providers: [
        InAppBrowser,
      ]
    });
  });

  it('Should create', () => {
    const service: QuestionsService = TestBed.get(QuestionsService);
    expect(service).toBeTruthy();
  });

  it('Should mark question as hot', () => {
    const hotQuestion = {
      view_count: 5,
      answer_count: 0,
      score: 0,
      answers: [{score: 0}],
      creation_date: 1573838839,
      last_activity_date: 1573838839,
    } as IQuestion;

    expect(TestBed.get(QuestionsService).questionIsHot(hotQuestion)).toBeTruthy();
  });
});
