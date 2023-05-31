import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth/auth.service';
import {Student} from '../models/student.model';
import {DataService} from '../services/data/data.service';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
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
  email: string = '';
  public password: string = '';

  constructor(private authService: AuthService, private dataService: DataService) {
  }

  ngOnInit() {
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
      'password': new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)],
      }),
    });
  }

  public register(): void {
    if (this.email === '') {
      alert('Please enter email');
      return;
    }

    if (this.password === '') {
      alert('Please enter password');
      return;
    }

    this.authService.register(this.email, this.password);

    this.addStudent();
  }

  addStudent(): void {
    this.student.email = this.email;

    if (this.student.firstName === '' || this.student.lastName === '' || this.student.email === '') {
      alert('Fill all input fields');
      return;
    }

    this.dataService.addStudent(this.student);

    this.student = {
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

    this.email = '';
    this.password = '';
  }
}
