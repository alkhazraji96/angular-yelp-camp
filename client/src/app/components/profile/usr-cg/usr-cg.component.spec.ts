import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsrCgComponent } from './usr-cg.component';

describe('UsrCgComponent', () => {
  let component: UsrCgComponent;
  let fixture: ComponentFixture<UsrCgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsrCgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsrCgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
