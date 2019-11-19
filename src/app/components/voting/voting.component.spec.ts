import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingComponent } from './voting.component';
import { CommonModule } from '@angular/common';
import { CommonPipesModule } from 'src/app/pipes/common-pipes.module';

describe('VotingComponent', () => {
  let component: VotingComponent;
  let fixture: ComponentFixture<VotingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotingComponent ],
      imports: [
        CommonPipesModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should toggle favorites', () => {
    expect(component.isFavorite).toBeUndefined();
    component.toggleFavorite();
    expect(component.isFavorite).toBeTruthy();
  });

  it('Should toggle accepted', () => {
    expect(component.isAccepted).toBeUndefined();
    component.toggleAccepted();
    expect(component.isAccepted).toBeTruthy();
  });
});
