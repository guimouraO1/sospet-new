import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Component, HostBinding, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  ngOnInit(): void {}
  user = {
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
  };
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private http: HttpClient,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  register(
    email: string,
    confirmEmail: string,
    password: string,
    confirmPassword: string
  ) {
    if (
      !email ||
      !confirmEmail ||
      !password ||
      !confirmPassword ||
      email !== confirmEmail ||
      password !== confirmPassword
    ) {
      this.openSnackBar('All fields must be filled in.', '');
    } else {
      this.authService.register(email, password);
    }
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top',
    });
  }
}
