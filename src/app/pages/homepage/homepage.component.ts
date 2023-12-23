import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})

export class HomepageComponent implements OnInit{

  user: any;
  constructor(private router: Router, public dialog: MatDialog, private http: HttpClient, private authService: AuthService) {

  }
  ngOnInit(): void {
    if(this.authService.loggedIn){
      this.user = this.authService.user;
    }else{
      this.router.navigate(['']);
    }
  }
  
}
