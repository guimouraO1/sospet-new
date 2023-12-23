import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})

export class LoginService {
  user: any;
  loggedIn: any;
  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) {}
  
  login(user: { email: string; password: string }) {
    const productData = new FormData();
    productData.append('Email', user.email);
    productData.append('Senha', user.password);

    this.http
      .post('http://localhost/loginPage/backend/php/login.php', productData)
      .subscribe((res: any) => {
        if (res.loggedIn === true) {
          this.loggedIn = true;
          this.user = res.user;
          this.router.navigate(['/home']);
          this.openSnackBar('login successful', this.user.email)
        } else if (res.loggedIn === false) {
          alert('Senha inválida');
        }
      });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      // duration: 2000,
      verticalPosition: 'top',
      panelClass: ['mat-toolbar', 'mat-primary']

    });
  }
}
