import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsListAdminComponent } from './items-list-admin.component';

describe('ItemsListAdminComponent', () => {
  let component: ItemsListAdminComponent;
  let fixture: ComponentFixture<ItemsListAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsListAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemsListAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
