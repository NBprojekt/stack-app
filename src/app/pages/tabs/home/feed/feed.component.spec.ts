import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { IonicModule } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Storage } from '@ionic/storage';

import { FeedComponent } from './feed.component';
import { CommonPipesModule } from 'src/app/pipes/common-pipes.module';
import { IQuestion } from 'src/app/interfaces/question';

describe('FeedComponent', () => {
  let component: FeedComponent;
  let fixture: ComponentFixture<FeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedComponent ],
      imports: [
        CommonPipesModule,
        RouterTestingModule,
        HttpClientTestingModule,
        IonicModule,
      ],
      providers: [
        InAppBrowser,
        {
          provide: Storage, useValue: {
            get: () => new Promise<any>((resolve, reject) => resolve('test')),
          }
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should init', () => {
    component.ngOnInit();

    expect(component.filter).toBe('interesting');
  });

  it('Should create a number array', () => {
    const array = component.fill(10);

    expect(array.length).toEqual(10);
    expect(typeof array[0]).toBe('number');
    expect(array[0]).toEqual(1);
  });

  it('Should mark question as hot', () => {
    const hotQuestion = {
      view_count: 5,
      answer_count: 0,
      score: 0,
      answers: [{score: 0}],
      creation_date: 1573838839,
      last_activity_date: 1573838839,
    } as IQuestion;

    expect(component.questionIsHot(hotQuestion)).toBeTruthy();
  });

  it('Should format the url', () => {
    const url = 'This is my question title';

    expect(component.formatUrl(url)).toBe('This-is-my-question-title');
  });

  it('Should emit options', () => {
    let emitedValue: any;

    component.options.subscribe((value) => emitedValue = value);

    component.filter = 'bountied';
    component.filterChange();

    expect(emitedValue).toEqual({featured: true});
  });
});
