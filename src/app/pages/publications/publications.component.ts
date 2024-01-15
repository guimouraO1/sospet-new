import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { PageEvent } from '@angular/material/paginator';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrl: './publications.component.scss',
})
export class PublicationsComponent {
  petList?: any = [];
  paginaterdPets: any[] = []; // Lista de pets exibidos na página atual
  pageSize: number = 3; // Tamanho da página
  currentPage: number = 1; // Página atual
  totalItems: number = 0;
  private urlApi = `${environment.urlApi}`;
  pet: any = {
    petSpecies: 'all',
    status: 'all',
  };

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
      .get(`${this.urlApi}/publications`, { headers })
      .subscribe({
        next: (res: any) => {
          this.petList = res;
          this.totalItems = this.petList.length;
          this.updatepaginaterdPets();
        },
        error: (error) => {
          this.authService.openSnackBar(error.error.msg, '❗');
        },
      });
  }
  getHintMessage(): string {
    switch (this.pet.petSpecies) {
      case 'dog':
        return 'Woof, woof!';
      case 'cat':
        return 'Meeeoooow!';
      case 'bird':
        return 'Tweet, tweet!';
      case 'other':
        return '';
      default:
        return '';
    }
  }

  // Método chamado quando a página é alterada
  pageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.updatepaginaterdPets();
  }

  updatepaginaterdPets() {
    let filteredList = this.petList;

    if (this.pet.status !== 'all' || this.pet.petSpecies !== 'all') {
      if (this.pet.status !== 'all' && this.pet.petSpecies !== 'all') {
        filteredList = this.petList
          .filter((pet: any) =>
            this.pet.status.includes(pet.status?.toLowerCase())
          )
          .filter((pet: any) =>
            this.pet.petSpecies.includes(pet.pet_species?.toLowerCase())
          );
      } else if (this.pet.status === 'all') {
        filteredList = this.petList.filter((pet: any) =>
          this.pet.petSpecies.includes(pet.pet_species?.toLowerCase())
        );
      } else if (this.pet.petSpecies === 'all') {
        filteredList = this.petList.filter((pet: any) =>
          this.pet.status.includes(pet.status?.toLowerCase())
        );
      }
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

    return this.paginaterdPets;
  }

  filter(event: any, filter: any) {
    if (filter === 'status') {
      this.pet.status = event.value;
    }

    if (filter === 'petSpecies') {
      this.pet.petSpecies = event.value;
    }
    this.updatepaginaterdPets();
  }

  rescue() {
    try {
      if (!this.authService._isAuthenticated) {
        this.authService.openSnackBar(
          "You do not have permission to access this function, please log'in .",
          '❗'
        );
      }
    } catch (error) {}
  }
}
