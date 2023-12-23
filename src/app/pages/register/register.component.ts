import { HttpClient,HttpParams,HttpHeaders } from '@angular/common/http';
import { Component, HostBinding, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  ngOnInit(): void {
  }
  user = {email: '', password: ''}
  constructor(private router: Router, public dialog: MatDialog, private http: HttpClient, private authService: AuthService, private snackBar: MatSnackBar){

  }

  // register(email: string, password: string,){
  //   // Define os dados que você deseja enviar
  //   const data = new HttpParams()
  //     .set('email', email)
  //     .set('password', password);

  //   // Configura os cabeçalhos para indicar que você está enviando dados no formato x-www-form-urlencoded
  //   const headers = new HttpHeaders()
  //     .set('Content-Type', 'application/x-www-form-urlencoded');

  //   // Faz a solicitação POST com os dados e cabeçalhos configurados
  //   this.http.post('http://localhost:3000/api/user', data.toString(), { headers })
  //     .subscribe((res: any) => {
  //       this.router.navigate([''])
  //       this.openSnackBar('Register successful!', res.result.email) 
  //   });
  // }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top',
    });
  }

}
