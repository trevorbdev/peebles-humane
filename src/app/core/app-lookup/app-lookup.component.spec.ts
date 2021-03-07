import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppLookupComponent } from './app-lookup.component';

describe('AppLookupComponent', () => {
  let component: AppLookupComponent;
  let fixture: ComponentFixture<AppLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppLookupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
