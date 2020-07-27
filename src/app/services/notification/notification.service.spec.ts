import { async, TestBed, getTestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IonicModule } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

import { NotificationService } from './notification.service';
import { environment } from 'src/environments/environment';
import { IResponse } from 'src/app/interfaces/response';

describe('NotificationService', () => {
  const inboxUrl = `${environment.api.url + environment.api.version}inbox`;
  const achievementsUrl =  `${environment.api.url}2.3/me/achievements`;

  let injector: TestBed;
  let service: NotificationService;
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
        LocalNotifications,
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
    service = injector.inject(NotificationService);
    httpMock = injector.inject(HttpTestingController);
  });

  it('Should create', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Should get inbox', () => {
    const expectedResponse: IResponse = {
      has_more: 0,
      items: [{
        site: null,
        is_unread: false,
        creation_date: 1579610628,
        answer_id: 1234,
        question_id: 1234,
        item_type: 'new_answer',
        link: 'https://stackoverflow.com/a/1234?noredirect=1',
        body: 'Answer body',
        title: 'Question title',
      }],
      quota_remaining: 999,
      quota_max: 1000,
    };

    service.getInbox().subscribe(response => {
      expect(response.items.length).toBe(1);
      expect(response).toEqual(expectedResponse);
    });

    const req = httpMock.expectOne(request => request.url === inboxUrl);
    req.flush(expectedResponse);
  });

  it('Should get achievements', () => {
    const expectedResponse: IResponse = {
      has_more: 0,
      items: [{
        on_site: null,
        is_unread: false,
        account_id: 123,
        reputation_change: 200,
        creation_date: 1580741750,
        achievement_type: 'reputation',
        link: 'https://stackoverflow.com/questions/123/title/567#456',
        title: 'Question title',
      }],
      quota_remaining: 999,
      quota_max: 1000,
    };

    service.getAchievements().subscribe(response => {
      expect(response.items.length).toBe(1);
      expect(response).toEqual(expectedResponse);
    });

    const req = httpMock.expectOne(request => request.url === achievementsUrl);
    req.flush(expectedResponse);
  });

  it('Should have an update interval of at least 1 min', () => {
    const threeMinutes = 60 * 1000;
    expect(NotificationService.updateIntervall).toBeGreaterThanOrEqual(threeMinutes);
  });
});
