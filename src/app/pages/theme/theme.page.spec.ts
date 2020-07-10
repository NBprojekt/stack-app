import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemePage } from './theme.page';
import { CommonPipesModule } from 'src/app/pipes/common-pipes.module';

describe('ThemePage', () => {
  let component: ThemePage;
  let fixture: ComponentFixture<ThemePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonPipesModule,
      ],
      declarations: [ ThemePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
