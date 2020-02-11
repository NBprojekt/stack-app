import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { IonicModule, NavParams } from '@ionic/angular';

import { QuestionOptionsComponent } from './question-options.component';

describe('QuestionOptionsComponent', () => {
  let component: QuestionOptionsComponent;
  let fixture: ComponentFixture<QuestionOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionOptionsComponent ],
      imports: [
        IonicModule,
        RouterTestingModule,
      ],
      providers: [
        {
          provide: NavParams, useValue: {
            data: {
              link: 'test'
            }
          }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
