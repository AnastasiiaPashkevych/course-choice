import {Component, OnInit} from '@angular/core';
import {Student} from '../models/student.model';
import {UserService} from '../services/user/user.service';
import {DataService} from '../services/data/data.service';
import {CourseService} from '../services/course/course.service';
import {Course} from '../models/course.model';
import {CourseByEducationalComponent} from '../models/course-by-educational-component.model';
import {TrainingProgram} from '../models/training-program.model';
import {ConfirmationService, MessageService} from 'primeng/api';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  coursesByEducationalComponents: CourseByEducationalComponent[] = [];
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
  courseByEducationalComponent = {
    id: '',
    shablonName: '',
    forCourse: '',
    forSemester: '',
    countCredit: '',
    semesterControlType: '',
    courses: this.courses,
  };
  trainingProgram: TrainingProgram = {
    coursesByEducationalComponents: this.coursesByEducationalComponents,
    id: '',
    name: '',
    trainingProgramDepartment: '',
    year: '',
    specialtyCode: ''
  }

  trainingProgramList: TrainingProgram[] = [];
  selectedTrainingPrograms: TrainingProgram[] = [];

  trainingProgramDialog: boolean = false;
  educationalComponentDialog: boolean = false;
  courseDialog: boolean = false;
  updateTrainingProgramDialog = false;
  updateEducationalComponentDialog: boolean = false;
  updateCourseDialog: boolean = false;

  submitted: boolean = false;

  years = [
    {label: '2023', value: '2023'},
    {label: '2024', value: '2024'},
    {label: '2025', value: '2025'},
    {label: '2026', value: '2026'},
  ];

  departments = [
    {label: 'ІПСА', value: 'ІПСА'},
    {label: 'ІХФ', value: 'ІХФ'},
    {label: 'ПБФ', value: 'ПБФ'},
    {label: 'РТФ', value: 'РТФ'},
    {label: 'ФБМІ', value: 'ФБМІ'},
    {label: 'ІХФ', value: 'ІХФ'},
    {label: 'ПБФ', value: 'ПБФ'},
    {label: 'РТФ', value: 'РТФ'},
    {label: 'ІПЗЕ', value: 'ІПЗЕ'},
  ]

  forCourses = [
    {label: '1', value: '1'},
    {label: '2', value: '2'},
    {label: '3', value: '3'},
    {label: '4', value: '4'},
    {label: '5', value: '5'},
    {label: '6', value: '6'},
  ]

  forSemesters = [
    {label: '1', value: '1'},
    {label: '2', value: '2'},
    {label: '3', value: '3'},
    {label: '4', value: '4'},
  ]

  semesterControlTypes = [
    {label: 'Екзамен', value: 'Екзамен'},
    {label: 'Залік', value: 'Залік'},
  ]


  constructor(private dataService: DataService, private confirmationService: ConfirmationService, private messageService: MessageService, private fireauth: AngularFireAuth, private router: Router) {
  }

  ngOnInit(): void {
    this.fireauth.user.subscribe(user => {
      if (user && user.email !== 'admin@coursechoice.com') {
        this.router.navigate(['/dashboard']); // Перенаправити студентів на інший маршрут
      }
    });

    this.getAllTrainingPrograms();
  }

  getAllTrainingPrograms() {
    this.dataService.getAllTrainingPrograms().subscribe(res => {
      this.trainingProgramList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      });
    }, err => {
      alert('Error while fetching training programs');
    });
  }


  addTrainingProgram(): void {
    this.coursesByEducationalComponents.push(
      this.courseByEducationalComponent
    );

    this.dataService.addTrainingProgram(this.trainingProgram);

    this.trainingProgramDialog = false;
    this.educationalComponentDialog = false;

    this.trainingProgram = {
      coursesByEducationalComponents: this.coursesByEducationalComponents,
      id: '',
      name: '',
      trainingProgramDepartment: '',
      year: '',
      specialtyCode: ''
    };
  }

  addCourseByEducationalComponent(): void {
    this.trainingProgram.coursesByEducationalComponents[0] = this.courseByEducationalComponent;
    this.trainingProgram.coursesByEducationalComponents[0].courses[0] = this.course;

    this.trainingProgramDialog = false;
    this.educationalComponentDialog = false;
    this.courseDialog = false;

    this.dataService.addCourseByEducationalComponent(this.trainingProgram);

    this.trainingProgram = {
      coursesByEducationalComponents: this.coursesByEducationalComponents,
      id: '',
      name: '',
      trainingProgramDepartment: '',
      year: '',
      specialtyCode: ''
    };
    this.courseByEducationalComponent = {
      id: '',
      shablonName: '',
      forCourse: '',
      forSemester: '',
      countCredit: '',
      semesterControlType: '',
      courses: this.courses,
    };

    this.coursesByEducationalComponents = [];
  }

  addCourse(): void {
    this.trainingProgram.coursesByEducationalComponents.forEach((item, index) => {
      if (item.id === this.courseByEducationalComponent.id) {
        this.trainingProgram.coursesByEducationalComponents[index].courses[0] = this.course;
      }
    })

    this.trainingProgramDialog = false;
    this.educationalComponentDialog = false;
    this.courseDialog = false;

    this.dataService.addCourse(this.trainingProgram, this.courseByEducationalComponent);

    this.coursesByEducationalComponents = [];
    this.courses = [];
    this.courseByEducationalComponent = {
      id: '',
      shablonName: '',
      forCourse: '',
      forSemester: '',
      countCredit: '',
      semesterControlType: '',
      courses: this.courses,
    };
    this.trainingProgram = {
      coursesByEducationalComponents: this.coursesByEducationalComponents,
      id: '',
      name: '',
      trainingProgramDepartment: '',
      year: '',
      specialtyCode: ''
    };
  }

  openNewTrainingProgramDialog() {
    this.trainingProgramDialog = true;
  }

  openUpdateTrainingProgramDialog(trainingProgram: TrainingProgram) {
    this.trainingProgram = trainingProgram;
    this.updateTrainingProgramDialog = true;
  }

  openNewEducationalComponentDialog(trainingProgram: TrainingProgram, courseByEducationalComponent: CourseByEducationalComponent) {
    this.trainingProgram = trainingProgram;
    this.courseByEducationalComponent = {...courseByEducationalComponent};

    this.educationalComponentDialog = true;
  }

  openUpdateEducationalComponentDialog(trainingProgram: TrainingProgram, courseByEducationalComponent: CourseByEducationalComponent) {
    this.trainingProgram = trainingProgram;
    this.courseByEducationalComponent = {...courseByEducationalComponent};

    this.updateEducationalComponentDialog = true;
  }

  openNewCourseDialog(trainingProgram: TrainingProgram, courseByEducationalComponent: CourseByEducationalComponent, course: Course) {
    this.trainingProgram = trainingProgram;
    this.courseByEducationalComponent = {...courseByEducationalComponent};
    this.course = course;

    this.courseDialog = true;
  }

  openUpdateCourseDialog(trainingProgram: TrainingProgram, courseByEducationalComponent: CourseByEducationalComponent, course: Course) {
    this.trainingProgram = trainingProgram;
    this.courseByEducationalComponent = {...courseByEducationalComponent};
    this.course = course;

    this.updateCourseDialog = true;
  }

  hideDialog() {
    this.trainingProgramDialog = false;
    this.educationalComponentDialog = false;
    this.courseDialog = false;
    this.submitted = false;
    this.updateTrainingProgramDialog = false;
    this.updateEducationalComponentDialog = false;
    this.updateCourseDialog = false;
  }

  deleteTrainingPrograms() {
    this.confirmationService.confirm({
      message: 'Ви впевнені, що хочете видалити обрані програми підготовки?',
      header: 'Підтвердження',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Успішно',
          detail: 'Програми підготовки видалено',
          life: 3000
        });
        this.selectedTrainingPrograms.forEach((selectedTrainingProgram) => {
          this.dataService.deleteTrainingProgram(selectedTrainingProgram);
        });
        this.selectedTrainingPrograms = [];
      }
    });
  }

  deleteTrainingProgram(trainingProgram: TrainingProgram) {
    this.confirmationService.confirm({
      message: 'Ви впевнені, що хочете видалити обрану програму підготовки?',
      header: 'Підтвердження',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Успішно',
          detail: 'Програму підготовки видалено',
          life: 3000
        });

        this.dataService.deleteTrainingProgram(trainingProgram);
      }
    });
  }

  updateTrainingProgram() {
    this.updateTrainingProgramDialog = false;

    this.messageService.add({
      severity: 'success',
      summary: 'Успішно',
      detail: 'Програму підготовки змінено',
      life: 3000
    });

    this.dataService.updateTrainingProgram(this.trainingProgram);
  };

  deleteEducationalComponent(trainingProgram: TrainingProgram, educationalComponent: CourseByEducationalComponent) {
    this.confirmationService.confirm({
      message: 'Ви впевнені, що хочете видалити обрану освітню компоненту?',
      header: 'Підтвердження',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Успішно',
          detail: 'Освітню компоненту видалено',
          life: 3000
        });

        const array = trainingProgram.coursesByEducationalComponents;

        trainingProgram.coursesByEducationalComponents = array.filter((course) => {
          return course.id !== educationalComponent.id;
        })

        this.dataService.updateTrainingProgram(trainingProgram);
      }
    });
  }

  deleteCourse(trainingProgram: TrainingProgram, educationalComponent: CourseByEducationalComponent, course: Course) {
    this.confirmationService.confirm({
      message: 'Ви впевнені, що хочете видалити обрану дисципліну?',
      header: 'Підтвердження',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Успішно',
          detail: 'Дисципліну видалено',
          life: 3000
        });

        trainingProgram.coursesByEducationalComponents.forEach((courseByEducationalComponent, index) => {
          if (courseByEducationalComponent.id === educationalComponent.id) {
            courseByEducationalComponent.courses.forEach((course1) => {
              if (course1.id === course.id) {
                const array = trainingProgram.coursesByEducationalComponents[index].courses;
                trainingProgram.coursesByEducationalComponents[index].courses = array.filter((element) => {
                  return element.id !== course.id;
                })
              }
            });
          }
        })

        this.dataService.updateTrainingProgram(trainingProgram);
      }
    });
  }

  updateEducationalComponent() {
    this.updateEducationalComponentDialog = false;

    this.messageService.add({
      severity: 'success',
      summary: 'Успішно',
      detail: 'Освітню компоненту змінено',
      life: 3000
    });

    const array = this.trainingProgram.coursesByEducationalComponents;

    array.forEach((course, index) => {
      if (course.id === this.courseByEducationalComponent.id) {
        this.trainingProgram.coursesByEducationalComponents[index] = this.courseByEducationalComponent;
      }
    })

    this.dataService.updateTrainingProgram(this.trainingProgram);
  };

  updateCourse() {
    this.updateCourseDialog = false;

    this.messageService.add({
      severity: 'success',
      summary: 'Успішно',
      detail: 'Дисципліну змінено',
      life: 3000
    });

    this.trainingProgram.coursesByEducationalComponents.forEach((courseByEducationalComponent) => {
      if (courseByEducationalComponent.id === this.courseByEducationalComponent.id) {
        courseByEducationalComponent.courses.forEach((course) => {
          if (course.id === this.course.id) {
            this.course = course;
          }
        });
      }
    })

    this.dataService.updateTrainingProgram(this.trainingProgram);
  };
}
