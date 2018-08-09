import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteScheduleComponent } from './write-schedule.component';

describe('WriteScheduleComponent', () => {
  let component: WriteScheduleComponent;
  let fixture: ComponentFixture<WriteScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WriteScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WriteScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
