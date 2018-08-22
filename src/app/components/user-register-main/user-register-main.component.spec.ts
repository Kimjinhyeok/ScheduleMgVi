import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRegisterMainComponent } from './user-register-main.component';

describe('UserRegisterMainComponent', () => {
  let component: UserRegisterMainComponent;
  let fixture: ComponentFixture<UserRegisterMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRegisterMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRegisterMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
