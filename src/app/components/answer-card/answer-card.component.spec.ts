import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AnswerCardComponent } from './answer-card.component';
import { CommentModule } from '../comment/comment.module';
import { VotingModule } from '../voting/voting.module';

import { IAnswer } from 'src/app/interfaces/answer';

describe('AnswerCardComponent', () => {
  let component: AnswerCardComponent;
  let fixture: ComponentFixture<AnswerCardComponent>;

  const testAnswer: IAnswer = {
    answer_id: 1,
    creation_date: 2,
    question_id: 3,
    score: 200,
    is_accepted: true,
    owner: null,
    comments: [
      {
        post_id: 1,
        owner: null,
        body: `<h2> test comment </h2>`,
        comment_id: 2,
        creation_date: 3,
        score: 4,
        edited: false,
      },
    ],
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnswerCardComponent, ],
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

  it('Should have at least one user card', () => {
    component.answer = testAnswer;
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('user-card')).length).toBeGreaterThanOrEqual(1);
  });

  it('Should have voting', () => {
    component.answer = testAnswer;
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('voting')).length).toEqual(1);
  });

  it('Should have a comment section', () => {
    component.answer = testAnswer;
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('comments')).length).toEqual(1);
  });
});
