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

  let platformReadySpy: Promise<void>;
  let platformSpy;

  let siteServiceReadySpy: Promise<void>;
  let siteServiceSpy;

  let storageReadySpy: Promise<void>;
  let storageSpy;

  let afterInitSpy;

  beforeEach(async(() => {
    statusBarSpy = jasmine.createSpyObj('StatusBar', ['styleDefault']);
    splashScreenSpy = jasmine.createSpyObj('SplashScreen', ['hide']);

    platformReadySpy = Promise.resolve();
    platformSpy = jasmine.createSpyObj('Platform', { ready: platformReadySpy });

    siteServiceReadySpy = Promise.resolve();
    siteServiceSpy = jasmine.createSpyObj('SitesService', { ready: platformReadySpy });

    storageReadySpy = Promise.resolve();
    storageSpy = jasmine.createSpyObj('SitesService', { ready: storageReadySpy });

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
        { provide: Storage, useValue: storageSpy },
        { provide: SitesService, useValue: siteServiceSpy },
      ],
    }).compileComponents();
  }));

  it('Should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Should initialize the app', async () => {
    TestBed.createComponent(AppComponent);
    expect(platformSpy.ready).toHaveBeenCalled();
    expect(siteServiceSpy.ready).toHaveBeenCalled();
    expect(storageSpy.ready).toHaveBeenCalled();

    await platformReadySpy;
    await siteServiceReadySpy;

    expect(statusBarSpy.styleDefault).toHaveBeenCalled();
    expect(splashScreenSpy.hide).toHaveBeenCalled();
  });

  it('Should load the app', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    expect(app.loading).toBeTruthy();
  });
});
