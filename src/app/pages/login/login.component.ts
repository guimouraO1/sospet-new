import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  user = { email: '', password: '' };

  ngOnInit(): void {}

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private http: HttpClient,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}
  
  
  login(email: string, password: string) {
    this.authService.login(email, password);
  }
  
  // login(email: string, password: string) {
    
  //   // Define os dados que você deseja enviar
  //   const data = new HttpParams().set('email', email).set('password', password);

  //   // Configura os cabeçalhos para indicar que você está enviando dados no formato x-www-form-urlencoded
  //   const headers = new HttpHeaders().set(
  //     'Content-Type',
  //     'application/x-www-form-urlencoded'
  //   );

  //   // Faz a solicitação POST com os dados e cabeçalhos configurados
  //   this.http
  //     .post('http://localhost:3000/api/login', data.toString(), { headers })
  //     .subscribe((res: any) => {
  //       res.result.loggedIn = true;
  //       this.authService.loggedIn = res.result.loggedIn;
        
  //       if (res.result.loggedIn) {
          
  //         localStorage.setItem('token', res.result.token);
  //         this.router.navigate(['home']);
  //         this.openSnackBar('Login successful!', res.result.email);
  //       } else {
  //         this.openSnackBar('Unable to log in, an error occurred.', '');
  //       }
  //     });
  // }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top',
    });
  }

  toRegister() {
    this.router.navigate(['register']);
  }
}
