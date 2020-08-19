import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchHelpComponent } from './search-help.component';

describe('SearchHelpComponent', () => {
  let component: SearchHelpComponent;
  let fixture: ComponentFixture<SearchHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchHelpComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
