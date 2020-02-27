import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { IonicModule } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { HeaderComponent } from './header.component';
import { CommonPipesModule } from 'src/app/pipes/common-pipes.module';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let storageIonicMock;

  beforeEach(async(() => {
    storageIonicMock = {
      get: () => new Promise<any>((resolve, reject) => resolve('As2342fAfgsdr')),
    };

    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [
        CommonPipesModule,
        RouterTestingModule,
        IonicModule,
        HttpClientTestingModule,
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
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should tranform first letter to uppercase', () => {
    expect(component.firstToUpper('test')).toBe('Test');
  });

  it('Should count unread notifications', () => {
    const items = [
      {is_unread: true, reputation_change: 20},
      {is_unread: true},
    ];
    expect(component.countUnread(items)).toEqual(21);
  });
});
