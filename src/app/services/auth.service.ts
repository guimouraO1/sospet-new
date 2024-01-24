import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EmmitNavToHomeService } from './emmit-nav-to-home.service';
import { environment } from '../environments/environment';
import { lastValueFrom, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  _isAuthenticated: boolean = false;
  private urlApi = `${environment.urlApi}`;

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
    private clickEventService: EmmitNavToHomeService
  ) {}

  login(email: string, password: string) {
    this.http
      .post(`${this.urlApi}/login`, { email, password })
      .pipe(take(1))
      .subscribe({
        next: (res: any) => {
          this._isAuthenticated = true;
          localStorage.setItem('token', res.authToken);
          this.clickEventService.emitir();
          this.router.navigate(['/publications']);
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
      .pipe(take(1))
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
      .pipe(take(1))
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

  async asycUserAuthentication() {
    const authToken = localStorage.getItem('token');
    const headers = new HttpHeaders().set('authorization', `${authToken}`);

    try {
      const res: any = await lastValueFrom(
        this.http.get(`${this.urlApi}/user/auth`, { headers }).pipe(take(1))
      );

      this._isAuthenticated = res.loggedIn;
      return res.loggedIn;
    } catch (e) {
      this._isAuthenticated = false;
      return false;
    }
  }

  async _isAuthUser(): Promise<boolean> {
    await this.asycUserAuthentication();
    return this._isAuthenticated;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
    });
  }
}
