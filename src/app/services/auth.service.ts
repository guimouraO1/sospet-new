import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: any;
  // loggedIn: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  login(email: string, password: string) {
    // Define os dados que você deseja enviar
    const data = new HttpParams().set('email', email).set('password', password);

    // Configura os cabeçalhos para indicar que você está enviando dados no formato x-www-form-urlencoded
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );

    // Faz a solicitação POST com os dados e cabeçalhos configurados
    this.http
      .post('http://localhost:3000/api/login', data.toString(), { headers })
      .subscribe((res: any) => {
          
        // res.result.loggedIn = true;
          // this.loggedIn = res.result.loggedIn;

          let token = res.result.token
          localStorage.setItem('token', token);
          this.router.navigate(['home']);
          // this.tokenToUser();
          this.openSnackBar('Login successful!', res.result.user.email);

      });
  }

  register(email: string, password: string) {
    // Define os dados que você deseja enviar
    const data = new HttpParams().set('email', email).set('password', password);

    // Configura os cabeçalhos para indicar que você está enviando dados no formato x-www-form-urlencoded
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );

    // Faz a solicitação POST com os dados e cabeçalhos configurados
    this.http
      .post('http://localhost:3000/api/user', data.toString(), { headers })
      .subscribe((res: any) => {
        console.log(res.result.token);
        localStorage.setItem('token', res.result.token);
        this.router.navigate(['']);
        this.openSnackBar('Register successful!', res.result.email);
      });
  }
  
  loggedIn(){
    return !!localStorage.getItem('token');
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top',
    });
  }

  // tokenToUser() {
  //   localStorage.getItem('token')
  
  //   const params = new HttpParams().set('token', token);
  //   console.log(params)
  //   const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
  
  //   this.http
  //     .get('http://localhost:3000/api/user/token', { params, headers } )
  //     .subscribe(
  //       (res: any) => {
  //         console.log('Resposta:', res);
  //       },
  //       (error) => {
  //         console.error(error);
  //       }
  //     );
  //     }
}
