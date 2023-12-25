import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
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

}
