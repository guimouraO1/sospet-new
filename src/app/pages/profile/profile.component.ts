import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userForm: FormGroup;
  user: any;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      firstName: ['', [Validators.maxLength(60)]],
      lastName: ['', [Validators.maxLength(60)]],
    });
  }

  ngOnInit(): void {
    this.authService.loggedIn();
    this.getUser();
  }

  getUser() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('authorization', `${token}`);
    this.http.get('http://localhost:3000/api/user', { headers }).subscribe(
      (res: any) => {
        this.user = res;
        this.userForm.patchValue({
          email: this.user.email,
          firstName: this.user.firstName,
          lastName: this.user.lastName,
        });
      },
      (error) => {
        this.authService.openSnackBar(error.error.msg, '❗');
      }
    );
  }

  onSubmit() {
    if (this.userForm.valid) {
      const email = this.userForm.get('email')!.value;
      const firstName = this.userForm.get('firstName')!.value;
      const lastName = this.userForm.get('lastName')!.value;
      // console.log(email, firstName, lastName);
      this.updateProfile(email, firstName, lastName);
    }
  }
  getErrorMessage(controlName: string): string {
    const control = this.userForm.get(controlName);

    if (!control) {
      return ''; // Return an empty string if the control is null
    }

    if (control.hasError('required')) {
      return 'Field is required';
    }

    if (controlName === 'email' && control.hasError('email')) {
      return 'Invalid email';
    }

    return '';
  }

  updateProfile(email: string, firstName: string, lastName: string) {
    this.authService.updateProfile(email, firstName, lastName);
  }
}
