import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent implements OnInit {
  user: any;
  listaUsers?: any = [];
  users: any;
  paginatedUsers: any[] = []; // Lista de usuários exibidos na página atual
  pageSize: number = 3; // Tamanho da página
  currentPage: number = 1; // Página atual

  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.authService.loggedIn();
    this.getUser();
    this.getUsers();
  }

  getUser() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('authorization', `${token}`);
    this.http.get('http://localhost:3000/api/user', { headers }).subscribe(
      (res: any) => {
        this.user = res;
        console.log(this.user);
      },
      (error) => {
        this.authService.openSnackBar(error.error.msg, '❗');
      }
    );
  }

  getUsers() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('authorization', `${token}`);
    this.http.get('http://localhost:3000/api/users', { headers }).subscribe(
      (res: any) => {
        this.listaUsers = res;
        this.updatePaginatedUsers();
      },
      (error) => {
        this.authService.openSnackBar(error.error.msg, '❗');
      }
    );
  }
  // Método chamado quando a página é alterada
  pageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.updatePaginatedUsers();
  }
  trackByIndex(index: number, item: any): number {
  return index;
}

  // Atualiza a lista de usuários exibidos na página atual
  updatePaginatedUsers() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedUsers = this.listaUsers.slice(startIndex, endIndex);
  }
  
  filterfirstName(event: any) {
    const searchTerm = event.target.value;
  
    if (!searchTerm) {
      this.updatePaginatedUsers();
      return;
    }
  
    this.paginatedUsers = this.listaUsers
      .filter((user: any) => user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()))
      .slice(0, this.pageSize);
  }
  
}
