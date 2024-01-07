import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrl: './publications.component.css',
})
export class PublicationsComponent {
  user: any;
  petList?: any = [];
  users: any;
  paginaterdPets: any[] = []; // Lista de pets exibidos na página atual
  pageSize: number = 3; // Tamanho da página
  currentPage: number = 1; // Página atual
  currentFilter: any;
  totalItems: number = 0;

  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getPublications();
  }

  getPublications() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('authorization', `${token}`);
    this.http
      .get('http://localhost:3000/api/publications', { headers })
      .subscribe({
        next: (res: any) => {
          this.petList = res;
          this.totalItems = this.petList.length;
          this.updatepaginaterdPets('all');
        },
        error: (error) => {
          this.authService.openSnackBar(error.error.msg, '❗');
        },
      });
  }

  // Método chamado quando a página é alterada
  pageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.updatepaginaterdPets('all');
  }

  updatepaginaterdPets(filter: any) {
    let filteredList = this.petList;

    if (
      this.currentFilter &&
      this.currentFilter.length > 0 &&
      !this.currentFilter.includes('all')
    ) {
      filteredList = this.petList.filter((pet: any) => {
        if (filter === 'status') {
          return this.currentFilter.includes(pet.status?.toLowerCase());
        } else if (filter === 'petSpecies') {
          return this.currentFilter.includes(pet.pet_species?.toLowerCase());
        }
        return false;
      });
    }

    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    // Ajuste para garantir que a quantidade de animais por página seja consistente
    const remainingItems = filteredList.length - startIndex;
    this.paginaterdPets =
      remainingItems >= this.pageSize
        ? filteredList.slice(startIndex, endIndex)
        : filteredList.slice(startIndex);

    // Atualize o comprimento total da lista para a variável totalItems
    this.totalItems = filteredList.length;
  }

  filter(event: any, filter: any) {
    if (filter === 'status') {
      const selectedStatus = event.value;
      this.currentFilter = selectedStatus;
      if (
        !selectedStatus ||
        selectedStatus.length === 0 ||
        selectedStatus.includes('all')
      ) {
        this.updatepaginaterdPets(filter);
        return;
      }

      this.paginaterdPets = this.petList
        .filter((pet: any) =>
          selectedStatus.includes(pet.status?.toLowerCase())
        )
        .slice(0, this.pageSize);
      this.updatepaginaterdPets(filter);
    }

    if (filter === 'petSpecies') {
      const selectedSpecies = event.value;
      this.currentFilter = selectedSpecies;
      if (
        !selectedSpecies ||
        selectedSpecies.length === 0 ||
        selectedSpecies.includes('all')
      ) {
        this.updatepaginaterdPets(filter);
        return;
      }

      this.paginaterdPets = this.petList
        .filter((pet: any) =>
          selectedSpecies.includes(pet.petSpecies?.toLowerCase())
        )
        .slice(0, this.pageSize);
      this.updatepaginaterdPets(filter);
    }
  }

  rescue() {
    try {
      if (!this.authService._loggedIn) {
        this.authService.openSnackBar(
          "You do not have permission to access this function, please log'in .",
          '❗'
        );
      }
    } catch (error) {}
  }
}
