import {CourseByEducationalComponent} from './course-by-educational-component.model';

export interface TrainingProgram {
  id: string;
  name: string;
  trainingProgramDepartment: string;
  specialtyCode: string;
  year: string;
  coursesByEducationalComponents: CourseByEducationalComponent[];
}
