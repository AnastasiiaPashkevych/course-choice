import {Component} from '@angular/core';
import {MegaMenuItem} from 'primeng/api';
import {AuthService} from "../services/auth/auth.service";
import {Student} from "../models/student.model";
import {DataService} from "../services/data/data.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  items: MegaMenuItem[] = [];
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

  ngOnInit() {
    this.items = [];
    this.fireauth.user.subscribe((user) => {
      this.studentEmail = user?.email;
      this.getStudent();
    });
  }

  constructor(private authService: AuthService, private dataService: DataService, private fireauth: AngularFireAuth, private router: Router,) {
  }

  public logout(): void {
    this.router.navigate(['/logout']);
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
}
