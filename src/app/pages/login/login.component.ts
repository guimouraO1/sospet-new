import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  user = {login: '', password: ''}

  ngOnInit(): void {
  }

  constructor(private router: Router, public dialog: MatDialog, private http: HttpClient, private loginService: LoginService) {}
  
  login(){
    this.loginService.login(this.user);
  }
}
