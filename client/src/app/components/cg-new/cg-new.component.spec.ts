import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CgNewComponent } from './cg-new.component';

describe('CgNewComponent', () => {
  let component: CgNewComponent;
  let fixture: ComponentFixture<CgNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CgNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CgNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
