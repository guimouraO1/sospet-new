import { NgModule } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { AppRoutingModule } from './app-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Adicione esta linha
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './pages/register/register.component';
import { MatMenuModule } from '@angular/material/menu';
import { ProfileComponent } from './pages/profile/profile.component';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ConfirmationModalComponent } from './pages/profile/confirmation-modal/confirmation-modal.component';
import { EmmitNavToHomeService } from './services/emmit-nav-to-home.service';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { PublicationsComponent } from './pages/publications/publications.component';
import { MatSelectModule } from '@angular/material/select';
import { PostPetComponent } from './pages/post-pet/post-pet.component';
import {MatBadgeModule} from '@angular/material/badge';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomepageComponent,
    NotFoundComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ConfirmationModalComponent,
    PublicationsComponent,
    PostPetComponent
  ],
  imports: [
    RouterModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSlideToggleModule,
    AppRoutingModule,
    // Obrigatórios
    FormsModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatMenuModule,
    NgxMaskDirective,
    MatDividerModule,
    MatListModule,
    MatPaginatorModule,
    CommonModule,
    MatProgressBarModule,
    MatSelectModule,
    MatBadgeModule
  ],
  providers: [provideNgxMask({}), EmmitNavToHomeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
