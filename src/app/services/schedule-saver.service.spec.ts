import { TestBed, inject } from '@angular/core/testing';

import { ScheduleSaverService } from './schedule-saver.service';

describe('ScheduleSaverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScheduleSaverService]
    });
  });

  it('should be created', inject([ScheduleSaverService], (service: ScheduleSaverService) => {
    expect(service).toBeTruthy();
  }));
});
