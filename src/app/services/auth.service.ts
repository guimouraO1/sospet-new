import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EmmitNavToHomeService } from './emmit-nav-to-home.service';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  _isAuthenticated: boolean = false;
  user: any;
  private urlApi = `${environment.urlApi}`;

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
    private clickEventService: EmmitNavToHomeService
  ) {}

  login(email: string, password: string) {
    this.http.post(`${this.urlApi}/login`, { email, password }).subscribe({
      next: (res: any) => {
        this._isAuthenticated = true;
        localStorage.setItem('token', res.authToken);
        this.clickEventService.emitir();
        this.router.navigate(['/home']);
        this.openSnackBar('Login successful!', res.user.email);
      },
      error: (e: any) => {
        this.openSnackBar(e.error.msg, '❗');
      },
    });
  }

  register(email: string, password: string, confirmPassword: string) {
    this.http
      .post(`${this.urlApi}/user`, {
        email,
        password,
        confirmPassword,
      })
      .subscribe({
        next: (res: any) => {
          if (res.register) {
            this.router.navigate(['']);
            this.openSnackBar('Register successful!', '✅');
          }
        },
        error: (e: any) => {
          this.openSnackBar(e.error.msg, '❗');
        },
      });
  }

  updateProfile(
    firstName: string,
    lastName: string,
    telephone: any,
    cep: any,
    address: any
  ) {
    const authToken = localStorage.getItem('token');
    const headers = new HttpHeaders().set('authorization', `${authToken}`);

    this.http
      .put(
        `${this.urlApi}/user`,
        { firstName, lastName, telephone, cep, address },
        { headers }
      )
      .subscribe({
        next: (res: any) => {
          if (res.update) {
            this.openSnackBar('Profile updated successfully!', '✅');
          }
        },
        error: (e: any) => {
          console.log(e);
          this.openSnackBar(e.error.msg, '❗');
        },
      });
  }

  loggedIn() {
    const authToken = localStorage.getItem('token');
    const headers = new HttpHeaders().set('authorization', `${authToken}`);

    this.http.get(`${this.urlApi}/user/auth`, { headers }).subscribe({
      next: (res: any) => {
        this._isAuthenticated = res.loggedIn;
        if (
          (this.router.url == '/' && res.loggedIn) ||
          (this.router.url == '/register' && res.loggedIn)
        ) {
          this.router.navigate(['/home']);
          this.openSnackBar('You are already logged in', '✅');
        } else if (res.loggedIn) {
          this._isAuthenticated = true;
        }
      },
      error: (e: any) => {
        if (this.router.url == '/' || this.router.url == '/register') {
          // console.log(e);
        } else {
          // console.log(e.error.loggedIn);
          this.router.navigate(['']);
        }
      },
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
    });
  }
}
