import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppArchiveComponent } from './app-archive.component';

describe('AppArchiveComponent', () => {
  let component: AppArchiveComponent;
  let fixture: ComponentFixture<AppArchiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppArchiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
