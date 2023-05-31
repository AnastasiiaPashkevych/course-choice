import {Course} from "./course.model";

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  surname: string;
  dateOfBirth: string;
  department: string;
  course: string;
  group?: string;
  specialtyCode: string;
  email: string;
  selectedCourses: Course[];
  role?: string;
}
