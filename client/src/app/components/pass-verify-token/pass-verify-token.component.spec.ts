import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassVerifyTokenComponent } from './pass-verify-token.component';

describe('PassVerifyTokenComponent', () => {
  let component: PassVerifyTokenComponent;
  let fixture: ComponentFixture<PassVerifyTokenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassVerifyTokenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassVerifyTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
