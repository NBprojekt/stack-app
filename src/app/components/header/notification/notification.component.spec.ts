import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NotificationComponent } from './notification.component';
import { CommonPipesModule } from 'src/app/pipes/common-pipes.module';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { RouterTestingModule } from '@angular/router/testing';

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationComponent ],
      imports: [
        HttpClientTestingModule,
        CommonPipesModule,
        IonicModule,
        RouterTestingModule,
      ],
      providers: [
        InAppBrowser,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
