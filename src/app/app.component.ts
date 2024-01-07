import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private http: HttpClient
  ) {}
  isRootRoute(): boolean {
    return this.router.url === '/' || this.router.url === '/register';
  }
  ngOnInit(): void {}
}
