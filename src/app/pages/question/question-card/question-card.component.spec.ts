import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { IonicModule } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { CommonPipesModule } from 'src/app/pipes/common-pipes.module';

import { QuestionCardComponent } from './question-card.component';
import { VotingModule } from 'src/app/components/voting/voting.module';
import { CommentModule } from 'src/app/components/comment/comment.module';
import { UserCardModule } from 'src/app/components/user-card/user-card.module';

describe('QuestionCardComponent', () => {
  let component: QuestionCardComponent;
  let fixture: ComponentFixture<QuestionCardComponent>;
  let storageIonicMock;

  beforeEach(async(() => {
    storageIonicMock = {
      get: () => new Promise<any>((resolve, reject) => resolve('test')),
    };

    TestBed.configureTestingModule({
      declarations: [ QuestionCardComponent ],
      imports: [
        IonicModule,
        CommonPipesModule,
        VotingModule,
        UserCardModule,
        CommentModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [
        InAppBrowser,
        { provide: Storage, useValue: storageIonicMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
