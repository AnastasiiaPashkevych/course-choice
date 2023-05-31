import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {Student} from '../../models/student.model';
import {CourseByEducationalComponent} from "../../models/course-by-educational-component.model";
import {TrainingProgram} from "../../models/training-program.model";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs: AngularFirestore) {
  }

  addStudent(student: Student) {
    student.id = this.afs.createId();
    return this.afs.collection('/Students').add(student);
  }

  addTrainingProgram(trainingProgram: any) {
    if (!trainingProgram.id) {
      trainingProgram.id = this.afs.createId();
    }

    trainingProgram.coursesByEducationalComponents.forEach((courseByEducationalComponent: CourseByEducationalComponent) => {
      courseByEducationalComponent.id = this.afs.createId();

      courseByEducationalComponent.courses.forEach((course) => {
        course.id = this.afs.createId();
      });
    });

    return this.afs.collection('/TrainingProgram').add(trainingProgram);
  }

  updateTrainingProgram(trainingProgram: TrainingProgram) {
    return this.afs.collection('/TrainingProgram').doc(trainingProgram.id).update(trainingProgram);
  }


  getAllStudents() {
    return this.afs.collection('/Students').snapshotChanges();
  }

  getAllTrainingPrograms() {
    return this.afs.collection('/TrainingProgram').snapshotChanges();
  }

  deleteTrainingProgram(trainingProgram: any) {
    return this.afs.doc('/TrainingProgram/' + trainingProgram.id).delete();
  }

  updateStudent(student: Student) {
    return this.afs.collection('/Students').doc(student.id).update(student);
  }

  addCourseByEducationalComponent(trainingProgram: TrainingProgram) {
    trainingProgram.coursesByEducationalComponents.unshift({
      id: this.afs.createId(),
      shablonName: '',
      forCourse: '',
      forSemester: '',
      countCredit: '',
      semesterControlType: '',
      courses: [
        {
          id: this.afs.createId(),
          name: '',
          remainingSpots: '',
          department: '',
          url: '',
        }
      ],
    })

    return this.afs.collection('/TrainingProgram').doc(trainingProgram.id).update(trainingProgram);
  }

  addCourse(trainingProgram: TrainingProgram, courseByEducationalComponent: CourseByEducationalComponent) {
    trainingProgram.coursesByEducationalComponents.forEach((item, index) => {
      if (item.id === courseByEducationalComponent.id) {
        trainingProgram.coursesByEducationalComponents[index].courses.unshift({
          id: this.afs.createId(),
          name: '',
          remainingSpots: '',
          department: '',
          url: '',
        });
      }
    })

    return this.afs.collection('/TrainingProgram').doc(trainingProgram.id).update(trainingProgram);
  }
}
