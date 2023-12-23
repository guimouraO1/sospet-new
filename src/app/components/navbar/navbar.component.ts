import { HttpClient,HttpParams,HttpHeaders } from '@angular/common/http';
import { Component, HostBinding, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  
  
  constructor(private router: Router, public dialog: MatDialog, private http: HttpClient, private authService: AuthService) {

  }

  ngOnInit(): void {
    
  }


  toHome(){
    if(this.authService.loggedIn){
      this.router.navigate(['/home'])
    }
   
  }
  
  toLogin(){
    this.router.navigate([''])
  }
  toRegister(){
    this.router.navigate(['register'])
  }

  getUsers() {
    this.http.get('http://localhost:3000/api/users')
      .subscribe((res: any) => {
        console.log(res);
      });
  }

  getUser(id: number) {
    this.http.get(`http://localhost:3000/api/user/${id}`)
      .subscribe((res: any) => {
        console.log(res);
      });
  }



}
