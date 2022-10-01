import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignleItemComponent } from './signle-item.component';

describe('SignleItemComponent', () => {
  let component: SignleItemComponent;
  let fixture: ComponentFixture<SignleItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignleItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignleItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
