import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private fireauth: AngularFireAuth) {
  }

  public login(email: string, password: string): void {
    this.fireauth.signInWithEmailAndPassword(email, password).then((res) => {
      localStorage.setItem('token', 'true');

      this.router.navigate(['/dashboard']);
    }, (err) => {
      alert(err.message);
      this.router.navigate(['/login']);
    });
  }

  public register(email: string, password: string): void {
    this.fireauth.createUserWithEmailAndPassword(email, password).then((res) => {
      alert('Registration Successful');
      this.router.navigate(['/login']);
    }, (err) => {
      alert(err.message);
      this.router.navigate(['/register']);
    });
  };

  public logout(): void {
    this.fireauth.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }, (err) => {
      alert(err.message);
    })
  }

  public forgotPassword(email: string): void {
    this.fireauth.sendPasswordResetEmail(email).then(() => {
      this.router.navigate(['/verify-email']);
    }, (err) => {
      alert('Щось пішло не так ...');
    });
  };
}
