import {Injectable, OnDestroy} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, OnDestroy {
  private userSubscription: Subscription = new Subscription();

  constructor(private fireauth: AngularFireAuth, private router: Router) {
  }

  canActivate(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.userSubscription = this.fireauth.user.subscribe(user => {
        if (user && user.email === 'admin@coursechoice.com') {
          resolve(true); // Дозволити доступ для адміністратора
        } else {
          this.router.navigate(['/dashboard']); // Перенаправити студентів на інший маршрут
          resolve(false); // Заборонити доступ для студентів
        }
      });
    });
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}

