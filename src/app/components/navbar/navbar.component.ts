import { Component, HostBinding, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  constructor(
    private router: Router,
    public dialog: MatDialog,
    public authService: AuthService
  ) {}

  ngOnInit(): void {}

  toHome() {
    this.router.navigate(['/home']);
  }
  toLogin() {
    this.router.navigate(['']);
  }
  toRegister() {
    this.router.navigate(['register']);
  }
  toProfile() {
    this.router.navigate(['profile']);
  }
  signOut() {
    localStorage.removeItem('token');
    this.authService.navItemLogin = false;
    this.router.navigate(['']);
  }
}
