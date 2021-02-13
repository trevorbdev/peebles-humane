import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRosterComponent } from './admin-roster.component';

describe('AdminRosterComponent', () => {
  let component: AdminRosterComponent;
  let fixture: ComponentFixture<AdminRosterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRosterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
