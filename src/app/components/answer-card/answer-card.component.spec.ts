import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AnswerCardComponent } from './answer-card.component';
import { CommentModule } from '../comment/comment.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { VotingModule } from '../voting/voting.module';

describe('AnswerCardComponent', () => {
  let component: AnswerCardComponent;
  let fixture: ComponentFixture<AnswerCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnswerCardComponent ],
      imports: [
        HttpClientTestingModule,
        IonicModule,
        CommentModule,
        VotingModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });
});
