import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {ListboxModule} from 'primeng/listbox';
import {TableModule} from 'primeng/table';
import {CheckboxModule} from 'primeng/checkbox';
import {TreeTableModule} from 'primeng/treetable';
import {ToastModule} from 'primeng/toast';
import {MegaMenuModule} from 'primeng/megamenu';
import {MenuModule} from 'primeng/menu';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CourseChoiceComponent} from './course-choice/course-choice.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {SelectedCoursesComponent} from './selected-courses/selected-courses.component';
import {HeaderComponent} from './header/header.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {HomeComponent} from './home/home.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {environment} from '../environments/environment';
import {provideAnalytics, getAnalytics, ScreenTrackingService, UserTrackingService} from '@angular/fire/analytics';
import {provideAuth, getAuth} from '@angular/fire/auth';
import {provideDatabase, getDatabase} from '@angular/fire/database';
import {provideFirestore, getFirestore} from '@angular/fire/firestore';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from './register/register.component';
import {FIREBASE_OPTIONS} from '@angular/fire/compat';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {VerifyEmailComponent} from './verify-email/verify-email.component';
import {CoursesComponent} from './courses/courses.component';
import {DialogModule} from 'primeng/dialog';
import {ConfirmDialog, ConfirmDialogModule} from 'primeng/confirmdialog';
import {DropdownModule} from 'primeng/dropdown';
import {TagModule} from 'primeng/tag';
import {RadioButton, RadioButtonModule} from 'primeng/radiobutton';
import {InputNumberModule} from 'primeng/inputnumber';
import {ToolbarModule} from 'primeng/toolbar';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {MultiSelectModule} from "primeng/multiselect";
import {CardModule} from "primeng/card";
import {CalendarModule} from "primeng/calendar";
import {NgOptimizedImage} from "@angular/common";
import {LogoutComponent} from './logout/logout.component';
import {PanelModule} from "primeng/panel";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CourseChoiceComponent,
    PageNotFoundComponent,
    SelectedCoursesComponent,
    HeaderComponent,
    SidebarComponent,
    HomeComponent,
    DashboardComponent,
    UserProfileComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    CoursesComponent,
    LogoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    ListboxModule,
    HttpClientModule,
    TableModule,
    CheckboxModule,
    TreeTableModule,
    ToastModule,
    BrowserAnimationsModule,
    MegaMenuModule,
    MenuModule,
    DialogModule,
    ConfirmDialogModule,
    DropdownModule,
    TagModule,
    RadioButtonModule,
    InputNumberModule,
    ToolbarModule,
    InputTextareaModule,
    MultiSelectModule,
    CardModule,
    FormsModule,
    CalendarModule,
    PanelModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    ReactiveFormsModule,
    NgOptimizedImage,
  ],
  providers: [
    ScreenTrackingService, UserTrackingService,
    {provide: FIREBASE_OPTIONS, useValue: environment.firebase}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
