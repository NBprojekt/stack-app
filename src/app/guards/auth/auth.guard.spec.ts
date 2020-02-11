import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

import { IonicModule } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let storageIonicMock;

  storageIonicMock = {
    get: () => new Promise<any>((resolve, reject) => resolve('As2342fAfgsdr')),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        IonicModule,
        HttpClientModule,
        RouterTestingModule,
      ],
      providers: [
        AuthGuard,
        { provide: Storage, useValue: storageIonicMock },
        InAppBrowser,
      ]
    });
  });

  it('Should create', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
