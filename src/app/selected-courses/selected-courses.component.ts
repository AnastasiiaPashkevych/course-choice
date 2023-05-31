import {Component, Input, OnInit} from '@angular/core';
import {Course} from "../models/course.model";
import {DataService} from "../services/data/data.service";
import {CourseService} from "../services/course/course.service";
import {Student} from "../models/student.model";
import {MessageService} from "primeng/api";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";

@Component({
  selector: 'app-selected-courses',
  templateUrl: './selected-courses.component.html',
  styleUrls: ['./selected-courses.component.scss'],
  providers: [MessageService]
})
export class SelectedCoursesComponent implements OnInit {
  studentsList: Student[] = [];

  departments = [
    {label: 'ІПСА', value: 'ІПСА'},
    {label: 'ІХФ', value: 'ІХФ'},
    {label: 'ПБФ', value: 'ПБФ'},
    {label: 'РТФ', value: 'РТФ'},
    {label: 'ФБМІ', value: 'ФБМІ'},
    {label: 'ІПЗЕ', value: 'ІПЗЕ'},
  ]

  constructor(private dataService: DataService, private fireauth: AngularFireAuth, private router: Router) {
  }

  ngOnInit(): void {
    this.fireauth.user.subscribe(user => {
      if (user && user.email !== 'admin@coursechoice.com') {
        this.router.navigate(['/dashboard']); // Перенаправити студентів на інший маршрут
      }
    });

    this.getAllStudents();
  }

  getAllStudents() {
    this.dataService.getAllStudents().subscribe(res => {
      this.studentsList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      });
    }, err => {
      alert('Error while fetching students');
    });
  }
}
