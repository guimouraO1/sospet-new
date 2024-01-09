import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  user = { email: '', password: '' };
  hide = true;
  ngOnInit(): void {
    this.authService.loggedIn();
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
