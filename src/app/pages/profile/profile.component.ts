import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  
  user: any;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private http: HttpClient,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.authService.loggedIn();
    this.getUser();
  }
  getUser() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('authorization', `${token}`);
    this.http.get('http://localhost:3000/api/user', { headers }).subscribe(
      (res: any) => {
        this.user = res;
        console.log(this.user);
      },
      (error) => {
        this.authService.openSnackBar(error.error.msg, '❗');
      }
    );
  }
}
