import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrl: './publications.component.css'
})
export class PublicationsComponent {
  
    user: any;
    petList?: any = [];
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
      // this.authService.loggedIn();
      // this.getUser();
      this.getPublications();
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
  
    getPublications() {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('authorization', `${token}`);
      this.http.get('http://localhost:3000/api/publications', { headers }).subscribe(
        (res: any) => {
          this.petList = res;
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
      this.paginatedUsers = this.petList.slice(startIndex, endIndex);
    }

    filter(event: any) {
      const selectedSpecies = event.value;
    
      if (!selectedSpecies || selectedSpecies.length === 0 || selectedSpecies.includes('all')) {
        this.updatePaginatedUsers();
        return;
      }
    
      this.paginatedUsers = this.petList
        .filter((pet: any) => selectedSpecies.includes(pet.pet_species?.toLowerCase()))
        .slice(0, this.pageSize);
    }
}
