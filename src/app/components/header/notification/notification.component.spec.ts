import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { IonicModule } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { NotificationComponent } from './notification.component';
import { CommonPipesModule } from 'src/app/pipes/common-pipes.module';


describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;
  let storageIonicMock;

  beforeEach(async(() => {
    storageIonicMock = {
      get: () => new Promise<any>((resolve, reject) => resolve('As2342fAfgsdr')),
    };

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
        { provide: Storage, useValue: storageIonicMock },
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
