import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})

export class HomepageComponent implements OnInit{
  constructor(private router: Router, public dialog: MatDialog, private http: HttpClient, private loginService: LoginService) {

  }
  ngOnInit(): void {
    if(this.loginService.loggedIn){
      console.log('Bem vindo ' + this.loginService.user.email)
    }else{
      this.router.navigate(['']);
    }
  }
}
