import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { IonicModule } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { VotingComponent } from './voting.component';
import { CommonPipesModule } from 'src/app/pipes/common-pipes.module';

describe('VotingComponent', () => {
  let component: VotingComponent;
  let fixture: ComponentFixture<VotingComponent>;
  let storageIonicMock;

  beforeEach(async(() => {
    storageIonicMock = {
      get: () => new Promise<any>((resolve, reject) => resolve('test')),
    };

    TestBed.configureTestingModule({
      declarations: [ VotingComponent ],
      imports: [
        CommonPipesModule,
        IonicModule,
        HttpClientTestingModule,
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
