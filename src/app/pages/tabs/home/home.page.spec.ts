import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePage } from './home.page';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePage ],
      imports: [
        HttpClientModule,
        IonicModule,
        RouterTestingModule,
      ],
      providers: [
        InAppBrowser
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should update filters', () => {
    const filter = {
      site: 'stackoverflow',
      page: 10,
    };

    spyOn(component, 'doRefresh');
    component.updateFilter(filter);
    expect(component.doRefresh).toHaveBeenCalled();
  });

  it('Should refresh', () => {
    spyOn(component, 'doRefresh');
    component.doRefresh();
    expect(component.doRefresh).toHaveBeenCalled();
  });

  it('Should load more', () => {
    spyOn(component, 'loadMore');
    component.loadMore();
    expect(component.loadMore).toHaveBeenCalled();
  });
});
