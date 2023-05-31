import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';

import {CourseService} from '../services/course/course.service';
import {CourseByEducationalComponent} from '../models/course-by-educational-component.model';
import {Course} from '../models/course.model';
import {DataService} from "../services/data/data.service";
import {TrainingProgram} from "../models/training-program.model";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Student} from "../models/student.model";

@Component({
  selector: 'app-course-choice',
  templateUrl: './course-choice.component.html',
  styleUrls: ['./course-choice.component.scss'],
  providers: [MessageService]
})
export class CourseChoiceComponent implements OnInit {
  coursesByEducationalComponent: CourseByEducationalComponent[] = [];
  studentEmail: any = '';
  student: Student = {
    id: '',
    firstName: '',
    lastName: '',
    surname: '',
    email: '',
    dateOfBirth: '',
    department: '',
    course: '',
    specialtyCode: '',
    group: '',
    selectedCourses: [],
  };
  course: Course = {
    id: '',
    name: '',
    remainingSpots: '',
    department: '',
    url: '',
    teacher: '',
    requirements: '',
    whatWillBeStudied: '',
    whyIsThisInteresting: '',
    learningOutcomes: '',
    howToUseKnowledge: '',
  };
  courseDialog: boolean = false;

  constructor(private courseService: CourseService, private messageService: MessageService, private dataService: DataService, private fireauth: AngularFireAuth) {
  }

  ngOnInit(): void {
    this.fireauth.user.subscribe((user) => {
      this.studentEmail = user?.email;
      this.getStudent();
      this.getCoursesByEducationalComponent();
    });
  }

  hideDialog() {
    this.courseDialog = false;
  }

  openCourseDialog(course: Course) {
    this.course = course;
    this.courseDialog = true;
  }

  onCourseSelect(course: Course, shablon: CourseByEducationalComponent) {
    course.educationalComponent = shablon.shablonName;
    this.student.selectedCourses.push(course);

    this.messageService.add({severity: 'info', summary: 'Product Selected', detail: course.name});

    this.dataService.updateStudent(this.student);

    this.getStudent();
    this.getCoursesByEducationalComponent();
  }

  isShablonDisabled(shablon: CourseByEducationalComponent): boolean | any {
    return shablon.isCourseSelected;
  }

  getCoursesByEducationalComponent() {
    this.coursesByEducationalComponent = [];
    this.dataService.getAllTrainingPrograms().subscribe(res => {
      res.forEach((e: any) => {
        const data: TrainingProgram = e.payload.doc.data();
        if (data.trainingProgramDepartment === this.student.department && data.specialtyCode === this.student.specialtyCode) {
          data.coursesByEducationalComponents.forEach((item: CourseByEducationalComponent) => {
            if (item.forCourse === this.student.course && this.student.selectedCourses.every(e => e.educationalComponent !== item.shablonName)) {
              this.coursesByEducationalComponent.push(item);
            }
          })
        }
      });
    }, err => {
      alert('Error while fetching training programs');
    });
  }

  getStudent() {
    this.dataService.getAllStudents().subscribe(res => {
      res.forEach((e: any) => {
        const data = e.payload.doc.data();
        if (data.email === this.studentEmail) {
          data.id = e.payload.doc.id;
          this.student = data;
        }
      });
    }, err => {
      alert('Error while fetching student data');
    });
  }

  editCourseSelect(course: Course) {
    const array = [...this.student.selectedCourses];
    this.student.selectedCourses = array.filter((selectedCourse) => {
      return selectedCourse.educationalComponent !== course.educationalComponent;
    })

    this.dataService.updateStudent(this.student);

    this.getStudent();
    this.getCoursesByEducationalComponent();
  }
}

