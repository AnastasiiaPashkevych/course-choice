import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {CourseChoiceComponent} from './course-choice/course-choice.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {HomeComponent} from "./home/home.component";
import {UserProfileComponent} from "./user-profile/user-profile.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {VerifyEmailComponent} from './verify-email/verify-email.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {CoursesComponent} from './courses/courses.component';
import {SelectedCoursesComponent} from "./selected-courses/selected-courses.component";
import {LogoutComponent} from "./logout/logout.component";

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'verify-email', component: VerifyEmailComponent},
  {
    path: '',
    component: HomeComponent,
    children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'profile', component: UserProfileComponent},
      {path: 'courses', component: CourseChoiceComponent},
      {path: 'manage-courses', component: CoursesComponent,},
      {path: 'selected-courses', component: SelectedCoursesComponent}
    ]
  },
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
