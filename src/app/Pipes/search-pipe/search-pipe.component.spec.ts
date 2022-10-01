import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPipeComponent } from './search-pipe.component';

describe('SearchPipeComponent', () => {
  let component: SearchPipeComponent;
  let fixture: ComponentFixture<SearchPipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchPipeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchPipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
