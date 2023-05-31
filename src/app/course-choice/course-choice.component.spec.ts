import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseChoiceComponent } from './course-choice.component';

describe('CourseChoiceComponent', () => {
  let component: CourseChoiceComponent;
  let fixture: ComponentFixture<CourseChoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseChoiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
