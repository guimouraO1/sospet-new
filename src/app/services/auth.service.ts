import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  navItemLogin = false;
  user: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  getUser(){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('authorization', `${token}`);
    this.http
      .get('http://localhost:3000/api/user', { headers })
      .subscribe((res: any) => {
        console.log(res);
        this.user = res.email;
      },
        error => {
          this.openSnackBar(error.error.msg, '❗');
        });
    
  }

  login(email: string, password: string) {
    this.http
      .post('http://localhost:3000/api/login', { email, password })
      .subscribe( (res: any) => {
        
        let token = res.token;
        localStorage.setItem('token', token);

        this.router.navigate(['home']);
        this.openSnackBar('Login successful!', res.user.email);
        
      },
      error => { 
        this.openSnackBar(error.error.msg, '❗');
      });
  }

  register(email: string, password: string, confirmPassword: string) {
    this.http
      .post('http://localhost:3000/api/user', { email, password, confirmPassword })
      .subscribe((res: any) => {
        if(res.register){
          this.router.navigate(['']);
          this.openSnackBar('Register successful!', '✅');
        }
      },
      error => { 
        this.openSnackBar(error.error.msg, '❗');
      });
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('authorization', `${token}`);
    this.http.get('http://localhost:3000/api/user/auth', { headers }).subscribe(
      (res: any) => {
        this.navItemLogin = true;
      },
      (error: any) => {
        this.router.navigate(['']);
        this.openSnackBar(error.error.msg, '❗');
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
