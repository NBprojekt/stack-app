import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreComponent } from './more.component';
import { IonicModule } from '@ionic/angular';

describe('MoreComponent', () => {
  let component: MoreComponent;
  let fixture: ComponentFixture<MoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        IonicModule,
      ],
      declarations: [
        MoreComponent,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });
});
