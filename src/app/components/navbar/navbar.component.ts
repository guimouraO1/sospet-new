import { Component, HostBinding, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EmmitNavToHomeService } from '../../services/emmit-nav-to-home.service';
import { Subscription } from 'rxjs';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  user: any;
  ouvir: Subscription;
  messages: any | null;
  private urlApi = `${environment.urlApi}`;

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
    this.authService.loggedIn();
    this.getUser();
    // this.messages = 1
  }
  toHome() {
    if (this.authService._isAuthenticated) {
      this.router.navigate(['/home']);
    } else {
      this.authService.openSnackBar(
        'Sorry, you do not have permission to access this page.',
        '❗'
      );
    }
    //  this.router.navigate(['/home']);
  }
  toPublications() {
    this.router.navigate(['publications']);
  }
  toPubPet() {
    if (this.authService._isAuthenticated) {
      this.router.navigate(['post']);
    } else {
      this.authService.openSnackBar(
        'Sorry, you do not have permission to access this page.',
        '❗'
      );
    }
  }
  toLogin() {
    this.router.navigate(['']);
  }
  toRegister() {
    this.router.navigate(['register']);
  }

  toProfile() {
    if (this.authService._isAuthenticated) {
      this.router.navigate(['profile']);
    }
  }

  signOut() {
    localStorage.clear();
    this.authService._isAuthenticated = false;
    this.router.navigate(['']);
  }

  getUser() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('authorization', `${token}`);
    this.http.get(`${this.urlApi}/user`, { headers }).subscribe({
      next: (res: any) => {
        this.user = res;
      },
      error: (e: any) => {
        // this.authService.openSnackBar(e.error.msg, '❗');
      },
    });
  }
}
