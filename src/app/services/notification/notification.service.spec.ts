import { async, TestBed, getTestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IonicModule } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { NotificationService } from './notification.service';

describe('NotificationService', () => {
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
    service = injector.get(NotificationService);
    httpMock = injector.get(HttpTestingController);
  });

  it('Should create', () => {
    expect(service).toBeTruthy();
  });
});
