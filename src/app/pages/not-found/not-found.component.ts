import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css',
})
export class NotFoundComponent implements OnInit {
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private http: HttpClient
  ) {}
  ngOnInit(): void {}

  toLogin() {
    this.router.navigate(['/']);
  }
}
