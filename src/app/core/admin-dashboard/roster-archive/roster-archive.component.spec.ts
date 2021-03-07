import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RosterArchiveComponent } from './roster-archive.component';

describe('RosterArchiveComponent', () => {
  let component: RosterArchiveComponent;
  let fixture: ComponentFixture<RosterArchiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RosterArchiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RosterArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
