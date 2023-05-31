import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuItem, MessageService} from 'primeng/api';
import {UserService} from "../services/user/user.service";
import {DataService} from "../services/data/data.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  items: MenuItem[] = [];
  studentEmail: any = '';

  private userSubscription: Subscription = new Subscription();
  constructor(private userService: UserService, private dataService: DataService, private fireauth: AngularFireAuth) {
  }
  ngOnInit() {
    this.userSubscription = this.fireauth.user.subscribe((user) => {
      this.studentEmail = user?.email;

      if (this.studentEmail === 'admin@coursechoice.com') {
        this.items = [
          {
            label: 'Керувати курсами',
            icon: 'pi pi-fw pi-book',
            routerLink: 'manage-courses'
          },
          {
            label: 'Обрані курси',
            icon: 'pi pi-fw pi-book',
            routerLink: 'selected-courses'
          }
        ];
      } else {
        this.items = [
          {
            label: 'Мій профіль',
            icon: 'pi pi-fw pi-user',
            routerLink: 'profile'
          },
          {
            label: 'Вибір дисциплін',
            icon: 'pi pi-fw pi-book',
            routerLink: 'courses'
          },
        ];
      }
    });
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
