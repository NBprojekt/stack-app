import { async, TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { IonicModule } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { QuestionsService } from './questions.service';

import { IQuestion } from 'src/app/interfaces/question';
import { IResponse } from 'src/app/interfaces/response';

import { environment } from 'src/environments/environment';

describe('QuestionsService', () => {
  let injector: TestBed;
  let service: QuestionsService;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        IonicModule,
        RouterTestingModule,
      ],
      providers: [
        InAppBrowser,
        {
          provide: Storage, useValue: {
            get: () => new Promise<any>((resolve, reject) => resolve('test')),
          }
        },
      ]
    });
  }));

  beforeEach(() => {
    injector = getTestBed();
    service = injector.inject(QuestionsService);
    httpMock = injector.inject(HttpTestingController);
  });

  it('Should create', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    httpMock.verify();
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

    expect(TestBed.inject(QuestionsService).questionIsHot(hotQuestion)).toBeTruthy();
  });

  describe('Get', () => {
    it('Should return questions', () => {
      const url = `${environment.api.url + environment.api.version}questions/`;
      const expectedResponse: IResponse = {
        has_more: 0,
        items: [{
          view_count: 5,
          answer_count: 0,
          score: 0,
          answers: [{score: 0}],
          creation_date: 1573838839,
          last_activity_date: 1573838839,
        }],
        quota_remaining: 999,
        quota_max: 1000,
      };

      service.getQuestions().subscribe(response => {
        expect(response.items.length).toBe(1);
        expect(response).toEqual(expectedResponse);
      });

      const req = httpMock.expectOne(request => request.url === url);
      req.flush(expectedResponse);
    });

    it('Should return one question', () => {
      const url = `${environment.api.url + environment.api.version}questions/1234`;

      const expectedResponse: IResponse = {
        has_more: 0,
        items: [{
          view_count: 5,
          answer_count: 0,
          score: 0,
          answers: [{score: 0}],
          creation_date: 1573838839,
          last_activity_date: 1573838839,
        }],
        quota_remaining: 999,
        quota_max: 1000,
      };

      service.getQuestion(1234).subscribe(response => {
        expect(response.items.length).toBe(1);
        expect(response).toEqual(expectedResponse);
      });

      const req = httpMock.expectOne(request => request.url === url);
      req.flush(expectedResponse);
    });

    it('Should return answers', () => {
      const url = `${environment.api.url + environment.api.version}questions/1234/answers`;
      const expectedResponse: IResponse = {
        has_more: 0,
        items: [{
          view_count: 5,
          answer_count: 0,
          score: 0,
          answers: [{score: 10}],
          creation_date: 1573838839,
          last_activity_date: 1573838839,
        }],
        quota_remaining: 999,
        quota_max: 1000,
      };

      service.getAnswers(1234).subscribe(response => {
        expect(response.items.length).toBe(1);
        expect(response).toEqual(expectedResponse);
      });

      const req = httpMock.expectOne(request => request.url === url);
      req.flush(expectedResponse);
    });
  });

  describe('Voting', () => {
    it('Should upvote a question', () => {
      const url = `${environment.api.url + environment.api.version}questions/1234/upvote`;
      const expectedResponse: IResponse = {
        has_more: 0,
        items: [],
        quota_remaining: 999,
        quota_max: 1000,
      };

      service.upvoteQuestion(1234).subscribe(response => {
        expect(response).toEqual(expectedResponse);
      });

      const req = httpMock.expectOne(request => request.url === url);
      req.flush(expectedResponse);
    });

    it('Should undo upvote on question', () => {
      const url = `${environment.api.url + environment.api.version}questions/1234/upvote/undo`;
      const expectedResponse: IResponse = {
        has_more: 0,
        items: [],
        quota_remaining: 999,
        quota_max: 1000,
      };

      service.upvoteQuestionUndo(1234).subscribe(response => {
        expect(response).toEqual(expectedResponse);
      });

      const req = httpMock.expectOne(request => request.url === url);
      req.flush(expectedResponse);
    });

    it('Should downvote a question', () => {
      const url = `${environment.api.url + environment.api.version}questions/1234/downvote`;
      const expectedResponse: IResponse = {
        has_more: 0,
        items: [],
        quota_remaining: 999,
        quota_max: 1000,
      };

      service.downvoteQuestion(1234).subscribe(response => {
        expect(response).toEqual(expectedResponse);
      });

      const req = httpMock.expectOne(request => request.url === url);
      req.flush(expectedResponse);
    });

    it('Should undo downvote on question', () => {
      const url = `${environment.api.url + environment.api.version}questions/1234/downvote/undo`;
      const expectedResponse: IResponse = {
        has_more: 0,
        items: [],
        quota_remaining: 999,
        quota_max: 1000,
      };

      service.downvoteQuestionUndo(1234).subscribe(response => {
        expect(response).toEqual(expectedResponse);
      });

      const req = httpMock.expectOne(request => request.url === url);
      req.flush(expectedResponse);
    });
  });

  describe('Favorites', () => {
    it('Should upvote a question', () => {
      const url = `${environment.api.url + environment.api.version}questions/1234/favorite`;
      const expectedResponse: IResponse = {
        has_more: 0,
        items: [],
        quota_remaining: 999,
        quota_max: 1000,
      };

      service.favoriteQuestion(1234).subscribe(response => {
        expect(response).toEqual(expectedResponse);
      });

      const req = httpMock.expectOne(request => request.url === url);
      req.flush(expectedResponse);
    });

    it('Should undo upvote on question', () => {
      const url = `${environment.api.url + environment.api.version}questions/1234/favorite/undo`;
      const expectedResponse: IResponse = {
        has_more: 0,
        items: [],
        quota_remaining: 999,
        quota_max: 1000,
      };

      service.favoriteQuestionUndo(1234).subscribe(response => {
        expect(response).toEqual(expectedResponse);
      });

      const req = httpMock.expectOne(request => request.url === url);
      req.flush(expectedResponse);
    });
  });
});
