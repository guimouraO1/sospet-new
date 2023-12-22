import { HttpClient } from '@angular/common/http';
import { Component, HostBinding, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  
  
  constructor(private router: Router, public dialog: MatDialog, private http: HttpClient) {

  }

  ngOnInit(): void {

    
  }


  toHome(){
    this.router.navigate(['/home'])
  }
  
  toLogin(){
    this.router.navigate([''])
  }
}
