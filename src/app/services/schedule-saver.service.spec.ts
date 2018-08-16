import { TestBed, inject } from '@angular/core/testing';

import { ScheduleManagerService } from './schedule-manage.service';

describe('ScheduleSaverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScheduleManagerService]
    });
  });

  it('should be created', inject([ScheduleManagerService], (service: ScheduleManagerService) => {
    expect(service).toBeTruthy();
  }));
});
