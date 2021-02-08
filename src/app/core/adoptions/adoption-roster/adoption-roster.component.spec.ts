import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptionRosterComponent } from './adoption-roster.component';

describe('AdoptionRosterComponent', () => {
  let component: AdoptionRosterComponent;
  let fixture: ComponentFixture<AdoptionRosterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdoptionRosterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdoptionRosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
