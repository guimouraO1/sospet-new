import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private router: Router) { 

  }
  login(user: { login?: string; password?: string; }){

    console.info(user)
  }
}
