import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  user = { email: '', password: '' };
  hide = true;

  async ngOnInit() {
    let result = await this.authService.loggedIn();

    if (result) {
      this.router.navigate(['/publications']);
    }
  }

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private authService: AuthService
  ) {}

  login(email: string, password: string) {
    this.authService.login(email, password);
  }

  toRegister() {
    this.router.navigate(['register']);
  }
}
