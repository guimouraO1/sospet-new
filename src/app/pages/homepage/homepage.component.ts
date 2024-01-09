import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})

export class HomepageComponent implements OnInit {
  date: any;

  action: string = '';
  helper = false;

  setFind() {
    this.action = 'find';
  }

  setPost() {
    this.action = 'post';
  }
  setNone(){
    this.action = '';
  }
  help(){
    this.helper = true;
  }
  noHelp(){
    this.helper = false;
  }
  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.authService.loggedIn();
  }

  dateNow(){
    this.date = new Date();
    console.log(this.date)
  }

  toLogin(){
    this.router.navigate(['']);
  }
  toRegister(){
    this.router.navigate(['/register']);
  }
}
