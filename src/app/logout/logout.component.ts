import {Component} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth/auth.service";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {
  constructor(private fireauth: AngularFireAuth, private router: Router, private authService: AuthService,) {
  }

  ngOnInit(): void {
    this.authService.logout();
  }
}
