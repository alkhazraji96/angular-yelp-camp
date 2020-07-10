import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CgEditComponent } from './cg-edit.component';

describe('CgEditComponent', () => {
  let component: CgEditComponent;
  let fixture: ComponentFixture<CgEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CgEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CgEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
