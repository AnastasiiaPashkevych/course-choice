import { Course } from './course.model';

export interface CourseByEducationalComponent {
  id: string;
  shablonName: string;
  forCourse: string;
  forSemester: string;
  countCredit: string;
  semesterControlType: string;
  courses: Course[];
  isCourseSelected?: boolean;
}
