import { TestBed } from '@angular/core/testing';

import { QuestionsService } from './questions.service';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { RouterTestingModule } from '@angular/router/testing';

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
});
