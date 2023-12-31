import { Component, HostBinding, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EmmitNavToHomeService } from '../../services/emmit-nav-to-home.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  user: any;
  ouvir: Subscription;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    public authService: AuthService,
    private http: HttpClient,
    private clickEventService: EmmitNavToHomeService

  ) {
    this.ouvir = this.clickEventService
    .getClickEvent()
    .subscribe((bol: any) => {
      if (bol) {
        this.getUser();
      }
    });
  }

  ngOnInit(): void {
    this.getUser();
  }

  toHome() {
   if(this.authService.navItemLogin){
    this.router.navigate(['/home']);
   }else{
    this.authService.openSnackBar('Sorry, you do not have permission to access this page.', '❗');
   }
  }
  toLogin() {
    this.router.navigate(['']);
  }
  toRegister() {
    this.router.navigate(['register']);
  }
  toProfile() {
    if(this.authService.navItemLogin){
      this.router.navigate(['profile']);
     }
  }
  signOut() {
    localStorage.removeItem('token');
    this.authService.navItemLogin = false;
    this.router.navigate(['']);
  }
  getUser() {
    
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('authorization', `${token}`);
    this.http.get('http://localhost:3000/api/user', { headers }).subscribe(
      (res: any) => {
        this.user = res;
      },
      (error) => {
        // this.authService.openSnackBar(error.error.msg, '❗');
      }
    );
  }
}
