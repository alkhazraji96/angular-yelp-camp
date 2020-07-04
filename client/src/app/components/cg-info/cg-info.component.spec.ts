import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CgInfoComponent } from './cg-info.component';

describe('CgInfoComponent', () => {
  let component: CgInfoComponent;
  let fixture: ComponentFixture<CgInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CgInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CgInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
