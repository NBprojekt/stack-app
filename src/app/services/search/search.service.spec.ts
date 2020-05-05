import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { IonicModule } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { SearchService } from './search.service';

describe('SearchService', () => {

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

  it('should be created', () => {
    const service: SearchService = TestBed.get(SearchService);
    expect(service).toBeTruthy();
  });
});
