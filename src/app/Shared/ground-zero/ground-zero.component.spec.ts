import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroundZeroComponent } from './ground-zero.component';

describe('GroundZeroComponent', () => {
  let component: GroundZeroComponent;
  let fixture: ComponentFixture<GroundZeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroundZeroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroundZeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
