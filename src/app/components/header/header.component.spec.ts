import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { CommonPipesModule } from 'src/app/pipes/common-pipes.module';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        CommonPipesModule,
        RouterTestingModule,
        IonicModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should init', () => {
    component.ngOnInit();

    // TODO: Test title
    // expect(component.title).toBeDefined();
    expect(component.inbox).toBeDefined();
    expect(component.achievements).toBeDefined();
    expect(component.reviwQueues).toBeDefined();
  });
});
