import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRegisterPrivacyComponent } from './user-register-privacy.component';

describe('UserRegisterPrivacyComponent', () => {
  let component: UserRegisterPrivacyComponent;
  let fixture: ComponentFixture<UserRegisterPrivacyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRegisterPrivacyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRegisterPrivacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
