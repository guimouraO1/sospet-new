import { Component, ElementRef, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { EmmitNavToHomeService } from '../../services/emmit-nav-to-home.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { environment } from '../../environments/environment';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    FormsModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    MatDividerModule,
    MatListModule,
    MatPaginatorModule,
    MatProgressBarModule,
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userForm: FormGroup;
  user: any;
  petList?: any = [];
  paginaterdPets: any[] = []; // Lista de pets exibidos na página atual
  pageSize: number = 3; // Tamanho da página
  currentPage: number = 1; // Página atual
  currentFilter: any;
  totalItems: number = 0;
  private urlApi = `${environment.urlApi}`;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private clickEventService: EmmitNavToHomeService,
    private el: ElementRef,
    private _userService: UserService
  ) {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.maxLength(60)]],
      lastName: ['', [Validators.maxLength(60)]],
      telephone: ['', [Validators.maxLength(60)]],
      address: ['', [Validators.maxLength(60)]],
      cep: ['', [Validators.maxLength(60)]],
    });
  }
  selectedFile: File | null = null;

  ngOnInit(): void {
    this._userService.getUser().subscribe({
      next: (_user: User[]) => {
        this.user = _user;
        this.userForm.patchValue({
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          telephone: this.user.telephone,
          address: this.user.address,
          cep: this.user.cep,
        });
      },
      error: (error) => {
        console.error('Erro ao obter usuário:', error);
      },
    });
    this.getPublications();
  }

  onSubmit() {
    if (this.userForm.valid) {
      const firstName = this.userForm.get('firstName')!.value;
      const lastName = this.userForm.get('lastName')!.value;
      const telephone = this.userForm.get('telephone')!.value;
      const cep = this.userForm.get('cep')!.value;
      const address = this.userForm.get('address')!.value;
      this.updateProfile(firstName, lastName, telephone, cep, address);
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.userForm.get(controlName);

    if (!control) {
      return '';
    }

    if (control.hasError('required')) {
      return 'Field is required';
    }

    if (controlName === 'email' && control.hasError('email')) {
      return 'Invalid email';
    }

    return '';
  }

  openDialog() {
    const dialogRef = this.dialog.open(ConfirmationModalComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.onSubmit();
      } else {
        console.log(result);
      }
    });
  }

  updateProfile(
    firstName: string,
    lastName: string,
    telephone: any,
    cep: any,
    address: any
  ) {
    this.authService.updateProfile(
      firstName,
      lastName,
      telephone,
      cep,
      address
    );
  }

  handleFileInput(event: any): void {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      this.selectedFile = files[0];
      this.uploadImage();
    }
  }

  uploadImage(): void {
    if (this.selectedFile) {
      const formData: FormData = new FormData();
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('authorization', `${token}`);

      formData.append('file', this.selectedFile);
      this.http
        .post(`${this.urlApi}/upload`, formData, { headers })
        .subscribe((response: any) => {
          try {
            if (response.update) {
              this._userService.getUser().subscribe({
                next: (_user: User[]) => {
                  this.user = _user;
                  this.userForm.patchValue({
                    firstName: this.user.firstName,
                    lastName: this.user.lastName,
                    telephone: this.user.telephone,
                    address: this.user.address,
                    cep: this.user.cep,
                  });
                },
                error: (error) => {
                  console.error('Erro ao obter usuário:', error);
                },
              });
              this.clickEventService.emitir();
              this.authService.openSnackBar(
                'Image successfully uploaded!',
                '✅'
              );
            } else {
              this.authService.openSnackBar(
                'Image upload failed. Please try again',
                '❗'
              );
            }
          } catch (e) {}
        });
    }
  }

  getPublications() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('authorization', `${token}`);
    this.http.get(`${this.urlApi}/userPublications`, { headers }).subscribe({
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

  // Método chamado quando a página é alterada
  pageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.updatepaginaterdPets();
  }

  updatepaginaterdPets() {
    let filteredList = this.petList;

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

  scrollToContainer() {
    // Obtenha uma referência ao elemento com id 'container'
    const containerElement =
      this.el.nativeElement.querySelector('#container-posts');

    // Verifique se o elemento foi encontrado
    if (containerElement) {
      // Rola até o elemento
      containerElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
