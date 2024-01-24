import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { environment } from '../../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { Observable, lastValueFrom, of, take } from 'rxjs';
import { Pet } from '../../models/pet.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-find-pet',
  standalone: true,
  imports: [
    FormsModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatListModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatSelectModule,
    CommonModule
  
  ],
  templateUrl: './find-pet.component.html',
  styleUrl: './find-pet.component.scss',
})
export class PublicationsComponent {
  petList: Pet[] = [];
  updatedListPet$: Observable<Pet[]> | undefined;

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

  async ngOnInit(): Promise<void> {
    await this.getPublications();
  }

  async getPublications() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('authorization', `${token}`);
    
    try {
      const observable: Observable<Pet[]> = this.http.get<Pet[]>(`${this.urlApi}/publications`, { headers }).pipe(take(1));
      const res: Pet[] = await lastValueFrom(observable);
  
      this.petList = res;
      this.totalItems = this.petList.length;
      this.updateupdatedListPet$();
    } catch (error) {
      // this.authService.openSnackBar(error, '❗');
    }
  }
  
  getHintMessage(): string {
    switch (this.pet.petSpecies) {
      case 'dog':
        return 'Woof, woof!';
      case 'cat':
        return 'Meeoow!';
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
    this.updateupdatedListPet$();
  }

  updateupdatedListPet$() {
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
    this.updatedListPet$ =
      remainingItems >= this.pageSize
      ? of(filteredList.slice(startIndex, endIndex))
      : of(filteredList.slice(startIndex));

    // Atualize o comprimento total da lista para a variável totalItems
    this.totalItems = filteredList.length;

    return this.updatedListPet$;
  }

  filter(event: any, filter: any) {
    if (filter === 'status') {
      this.pet.status = event.value;
    }

    if (filter === 'petSpecies') {
      this.pet.petSpecies = event.value;
    }
    this.updateupdatedListPet$();
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
