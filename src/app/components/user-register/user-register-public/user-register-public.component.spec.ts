import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRegisterPublicComponent } from './user-register-public.component';

describe('UserRegisterPublicComponent', () => {
  let component: UserRegisterPublicComponent;
  let fixture: ComponentFixture<UserRegisterPublicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRegisterPublicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRegisterPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
