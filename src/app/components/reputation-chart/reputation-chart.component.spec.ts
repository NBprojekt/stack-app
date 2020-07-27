import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { IonicModule } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { ChartsModule } from 'ng2-charts';

import { ReputationChartComponent } from './reputation-chart.component';

describe('ReputationChartComponent', () => {
  let component: ReputationChartComponent;
  let fixture: ComponentFixture<ReputationChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        IonicModule,
        RouterTestingModule,
        ChartsModule,
      ],
      declarations: [ ReputationChartComponent ],
      providers: [ ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReputationChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
