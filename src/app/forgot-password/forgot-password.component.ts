import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth/auth.service';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  public email: string = '';
  loginForm: FormGroup = new FormGroup({});

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'email': new FormControl('', Validators.required),
    });
  }

  public forgotPassword(): void {
    this.authService.forgotPassword(this.email);
    this.email = '';
  }
}
