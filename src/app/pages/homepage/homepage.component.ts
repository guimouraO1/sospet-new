import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
  }

}
