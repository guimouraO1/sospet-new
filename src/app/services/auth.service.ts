import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EmmitNavToHomeService } from './emmit-nav-to-home.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  navItemLogin?: boolean;
  user: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
    private clickEventService: EmmitNavToHomeService

  ) {}

  getUser() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('authorization', `${token}`);
    this.http.get('http://localhost:3000/api/user', { headers }).subscribe(
      (res: any) => {
        this.user = res.email;
      },
      (error) => {
        this.openSnackBar(error.error.msg, '❗');
      }
    );
  }

  login(email: string, password: string) {
    this.http
      .post('http://localhost:3000/api/login', { email, password })
      .subscribe(
        (res: any) => {
          let token = res.token;
          localStorage.setItem('token', token);
          this.clickEventService.emitir();
          this.router.navigate(['home']);
          this.openSnackBar('Login successful!', res.user.email);
        },
        (error) => {
          this.openSnackBar(error.error.msg, '❗');
        }
      );
  }

  register(email: string, password: string, confirmPassword: string) {
    this.http
      .post('http://localhost:3000/api/user', {
        email,
        password,
        confirmPassword,
      })
      .subscribe(
        (res: any) => {
          if (res.register) {
            this.router.navigate(['']);
            this.openSnackBar('Register successful!', '✅');
          }
        },
        (error) => {
          this.openSnackBar(error.error.msg, '❗');
        }
      );
  }

  updateProfile(email: string, firstName: string, lastName: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('authorization', `${token}`);
    this.http
      .put('http://localhost:3000/api/user', { email, firstName, lastName }, { headers })
      .subscribe(
        (res: any) => {
          if(res.update === true){
            this.openSnackBar('Profile updated successfully!', '✅');
          }
        },
        (error) => {
          console.log(error);
          this.openSnackBar(error.error.msg, '❗');
        }
      );
  }
  

 loggedIn() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('authorization', `${token}`);
    this.http.get('http://localhost:3000/api/user/auth', { headers }).subscribe(
      (res: any) => {
        if (this.router.url == '/' || this.router.url == '/register') {
          this.router.navigate(['home']);
          this.openSnackBar('You are already logged in', '✅');
        }
        this.navItemLogin = true;
      },
      (error: any) => {
        if (this.router.url == '/' || this.router.url == '/register') {
        } else {
          this.router.navigate(['']);
          // this.openSnackBar(error.error.msg, '❗');
        }
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
    });
  }
}
