import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsrDetailsComponent } from './usr-details.component';

describe('UsrDetailsComponent', () => {
  let component: UsrDetailsComponent;
  let fixture: ComponentFixture<UsrDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsrDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsrDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
