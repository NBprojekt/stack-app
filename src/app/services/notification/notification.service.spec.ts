import { TestBed, getTestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { NotificationService } from './notification.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

describe('NotificationService', () => {
  let injector: TestBed;
  let service: NotificationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        IonicModule,
        RouterTestingModule,
      ],
      providers: [
        NotificationService,
        InAppBrowser,
      ]
    });

    injector = getTestBed();
    service = injector.get(NotificationService);
    httpMock = injector.get(HttpTestingController);
  });

  it('Should create', () => {
    expect(service).toBeTruthy();
  });
});
