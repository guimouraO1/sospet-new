import { Component, HostBinding, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { EmmitNavToHomeService } from '../../services/emmit-nav-to-home.service';
import { Subscription } from 'rxjs';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  user: any;
  ouvir: Subscription;
  messages: any | null;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    public authService: AuthService,
    private _userService: UserService,
    private clickEventService: EmmitNavToHomeService
  ) {
    this.ouvir = this.clickEventService
      .getClickEvent()
      .subscribe((bol: any) => {
        if (bol) {
          this._userService.getUser().subscribe({
            next: (_user: User[]) => {
              this.user = _user;
            },
            error: (error) => {
              console.error('Erro ao obter usuário:', error);
            },
          });
        }
      });
  }
  ngOnInit(): void {
    this._userService.getUser().subscribe({
      next: (_user: User[]) => {
        this.user = _user;
      },
      error: (error) => {
        // console.error('Erro ao obter usuário:', error);
      },
    });
    // this.messages = 1
  }
  toHome() {
    this.router.navigate(['home']);
  }
  toMap() {
    this.router.navigate(['map']);
  }
  toPublications() {
    this.router.navigate(['publications']);
  }
  toPubPet() {
    this.router.navigate(['post']);
  }
  toLogin() {
    this.router.navigate(['login']);
  }
  toRegister() {
    this.router.navigate(['register']);
  }
  toProfile() {
    this.router.navigate(['profile']);
  }

  signOut() {
    localStorage.clear();
    this.authService._isAuthenticated = false;
    this.router.navigate(['']);
  }
}
