import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { IonicModule } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { LoginGuard } from './login.guard';

describe('LoginGuard', () => {
  let storageIonicMock;

  beforeEach(() => {
    storageIonicMock = {
      get: () => new Promise<any>((resolve, reject) => resolve('As2342fAfgsdr')),
    };

    TestBed.configureTestingModule({
      imports: [
        IonicModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [
        LoginGuard,
        { provide: Storage, useValue: storageIonicMock },
        InAppBrowser,
      ]
    });
  });

  it('should ...', inject([LoginGuard], (guard: LoginGuard) => {
    expect(guard).toBeTruthy();
  }));
});
