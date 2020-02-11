import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';

import { AppComponent } from './app.component';
import { SitesService } from './services/sites/sites.service';

describe('AppComponent', () => {

  let statusBarSpy;
  let splashScreenSpy;

  let platformReadySpy;
  let platformSpy;

  let siteServiceReadySpy;
  let siteServiceSpy;

  let storageIonicMock;

  beforeEach(async(() => {
    statusBarSpy = jasmine.createSpyObj('StatusBar', ['styleDefault']);
    splashScreenSpy = jasmine.createSpyObj('SplashScreen', ['hide']);
    platformReadySpy = Promise.resolve();
    platformSpy = jasmine.createSpyObj('Platform', { ready: platformReadySpy });
    siteServiceReadySpy = Promise.resolve();
    siteServiceSpy = jasmine.createSpyObj('SitesService', { ready: platformReadySpy });
    storageIonicMock = {
      get: () => new Promise<any>((resolve, reject) => resolve('As2342fAfgsdr')),
    };

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        RouterTestingModule,
      ],
      providers: [
        { provide: StatusBar, useValue: statusBarSpy },
        { provide: SplashScreen, useValue: splashScreenSpy },
        { provide: Platform, useValue: platformSpy },
        { provide: Storage, useValue: storageIonicMock },
        SitesService,
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should initialize the app', async () => {
    TestBed.createComponent(AppComponent);
    expect(platformSpy.ready).toHaveBeenCalled();
    expect(siteServiceSpy.ready).toHaveBeenCalled();

    await platformReadySpy;
    await siteServiceReadySpy;

    expect(statusBarSpy.styleDefault).toHaveBeenCalled();
    expect(splashScreenSpy.hide).toHaveBeenCalled();
  });

  // TODO: add more tests!

});
