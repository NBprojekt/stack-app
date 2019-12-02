import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentComponent } from './comment.component';
import { CommonPipesModule } from 'src/app/pipes/common-pipes.module';
import { By } from '@angular/platform-browser';
import { IComment } from 'src/app/interfaces/comment';
import { IUser } from 'src/app/interfaces/user';

describe('CommentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;

  const testUser: IUser = {
    display_name: 'Test User',
    link: null,
    profile_image: null,
    reputation: 100,
    user_id: 1,
    user_type: 'unregistered',
  };
  const testComments: Array<IComment> = [
    {
      post_id: 1,
      owner: testUser,
      body: `<h2> test comment </h2>`,
      comment_id: 2,
      creation_date: 3,
      score: 4,
      edited: false,
    },
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentComponent ],
      imports: [
        CommonPipesModule,

      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should create comment section', () => {
    expect(fixture.debugElement.queryAll(By.css('.comments'))).toBeTruthy();
  });

  describe('Comments', () => {

    it('Should create', () => {
      component.comments = testComments;
      fixture.detectChanges();

      expect(fixture.debugElement.queryAll(By.css('.comment'))).toBeTruthy();
    });

    it('Should have a user name', () => {
      component.comments = testComments;
      fixture.detectChanges();

      expect(fixture.debugElement.queryAll(By.css('.comment .username')).length).toEqual(1);
    });

    it('Should have a post section', () => {
      component.comments = testComments;
      fixture.detectChanges();

      expect(fixture.debugElement.queryAll(By.css('.comment .post')).length).toEqual(1);
    });

    it('Should highlight the owner', () => {
      component.comments = testComments;
      component.questionOwner = testUser;
      fixture.detectChanges();

      expect(fixture.debugElement.queryAll(By.css('.comment .username.highlight'))).toBeTruthy();
    });
  });
});
