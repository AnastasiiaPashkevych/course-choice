import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AuthService} from '../services/auth/auth.service';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public email: string = '';
  public password: string = '';
  loginForm: FormGroup = new FormGroup({});

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'login': new FormControl('', Validators.required),
      'password': new FormControl('', {
        validators: [Validators.required],
      })
    });
  }


  public login(): void {
    if (this.email === '') {
      alert('Please enter email');
      return;
    }

    if (this.password === '') {
      alert('Please enter password');
      return;
    }

    this.authService.login(this.email, this.password);

    this.email = '';
    this.password = '';

    this.router.navigate(['/courses']);
  }
}
