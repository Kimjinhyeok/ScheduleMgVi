import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveScheduleComponent } from './live-schedule.component';

describe('LiveScheduleComponent', () => {
  let component: LiveScheduleComponent;
  let fixture: ComponentFixture<LiveScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
