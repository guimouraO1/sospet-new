import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  user = { email: '', password: '' };
  hide = true;
  
  async ngOnInit() {
    let result =  await this.authService.loggedIn();
    
    if (result) {
      this.router.navigate(['/home'])
    } 
  } 

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  login(email: string, password: string) {
    this.authService.login(email, password);
  }

  toRegister() {
    this.router.navigate(['register']);
  }
}
