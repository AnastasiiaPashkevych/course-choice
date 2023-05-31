import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedCoursesComponent } from './selected-courses.component';

describe('SelectedCoursesComponent', () => {
  let component: SelectedCoursesComponent;
  let fixture: ComponentFixture<SelectedCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedCoursesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
