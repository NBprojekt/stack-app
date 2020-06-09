import { async, TestBed, getTestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IonicModule } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { AnswerService } from './answer.service';
import { environment } from 'src/environments/environment';
import { IResponse } from 'src/app/interfaces/response';

describe('AnswerService', () => {
  let injector: TestBed;
  let service: AnswerService;
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
    service = injector.inject(AnswerService);
    httpMock = injector.inject(HttpTestingController);
  });

  it('Should create', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('Voting', () => {
    it('Should upvote a answer', () => {
      const url = `${environment.api.url + environment.api.version}answers/1234/upvote`;
      const expectedResponse: IResponse = {
        has_more: 0,
        items: [],
        quota_remaining: 999,
        quota_max: 1000,
      };

      service.upvoteAnswer(1234).subscribe(response => {
        expect(response).toEqual(expectedResponse);
      });

      const req = httpMock.expectOne(request => request.url === url);
      req.flush(expectedResponse);
    });

    it('Should undo upvote on answer', () => {
      const url = `${environment.api.url + environment.api.version}answers/1234/upvote/undo`;
      const expectedResponse: IResponse = {
        has_more: 0,
        items: [],
        quota_remaining: 999,
        quota_max: 1000,
      };

      service.upvoteAnswerUndo(1234).subscribe(response => {
        expect(response).toEqual(expectedResponse);
      });

      const req = httpMock.expectOne(request => request.url === url);
      req.flush(expectedResponse);
    });

    it('Should downvote a answer', () => {
      const url = `${environment.api.url + environment.api.version}answers/1234/downvote`;
      const expectedResponse: IResponse = {
        has_more: 0,
        items: [],
        quota_remaining: 999,
        quota_max: 1000,
      };

      service.downvoteAnswer(1234).subscribe(response => {
        expect(response).toEqual(expectedResponse);
      });

      const req = httpMock.expectOne(request => request.url === url);
      req.flush(expectedResponse);
    });

    it('Should undo downvote on answer', () => {
      const url = `${environment.api.url + environment.api.version}answers/1234/downvote/undo`;
      const expectedResponse: IResponse = {
        has_more: 0,
        items: [],
        quota_remaining: 999,
        quota_max: 1000,
      };

      service.downvoteAnswerUndo(1234).subscribe(response => {
        expect(response).toEqual(expectedResponse);
      });

      const req = httpMock.expectOne(request => request.url === url);
      req.flush(expectedResponse);
    });
  });

  describe('Accept', () => {
    it('Should accept a answer', () => {
      const url = `${environment.api.url + environment.api.version}answers/1234/accept`;
      const expectedResponse: IResponse = {
        has_more: 0,
        items: [],
        quota_remaining: 999,
        quota_max: 1000,
      };

      service.acceptAnswer(1234).subscribe(response => {
        expect(response).toEqual(expectedResponse);
      });

      const req = httpMock.expectOne(request => request.url === url);
      req.flush(expectedResponse);
    });

    it('Should undo accept on answer', () => {
      const url = `${environment.api.url + environment.api.version}answers/1234/accept/undo`;
      const expectedResponse: IResponse = {
        has_more: 0,
        items: [],
        quota_remaining: 999,
        quota_max: 1000,
      };

      service.acceptAnswerUndo(1234).subscribe(response => {
        expect(response).toEqual(expectedResponse);
      });

      const req = httpMock.expectOne(request => request.url === url);
      req.flush(expectedResponse);
    });
  });
});
