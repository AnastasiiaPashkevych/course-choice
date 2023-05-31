import {Component, OnInit} from '@angular/core';

import {UserService} from '../services/user/user.service';
import {User} from '../models/user.model';
import {Student} from '../models/student.model';
import {DataService} from '../services/data/data.service';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {MessageService} from "primeng/api";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  providers: [MessageService]
})
export class UserProfileComponent implements OnInit {
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
  ];
  forCourses = [
    {label: '1', value: '1'},
    {label: '2', value: '2'},
    {label: '3', value: '3'},
    {label: '4', value: '4'},
    {label: '5', value: '5'},
    {label: '6', value: '6'},
  ]
  loginForm: FormGroup = new FormGroup({});

  constructor(private userService: UserService, private dataService: DataService, private fireauth: AngularFireAuth, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.fireauth.user.subscribe((user) => {
      this.studentEmail = user?.email;
      this.getStudent();
    });

    this.loginForm = new FormGroup({
      'firstName': new FormControl('', Validators.required),
      'lastName': new FormControl('', {
        validators: [Validators.required],
      }),
      'surname': new FormControl('', {
        validators: [Validators.required],
      }),
      'dateOfBirth': new FormControl('', {
        validators: [],
      }),
      'department': new FormControl('', {
        validators: [Validators.required],
      }),
      'specialtyCode': new FormControl('', {
        validators: [Validators.required],
      }),
      'course': new FormControl('', {
        validators: [Validators.required],
      }),
      'group': new FormControl('', {
        validators: [],
      }),
      'email': new FormControl('', {
        validators: [Validators.required],
      }),
    });
  }

  updateStudent(): void {
    this.messageService.add({severity: 'info', summary: 'Дані змінено', detail: ''});
    this.dataService.updateStudent(this.student);
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
