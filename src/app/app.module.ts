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
import {MatMenuModule} from '@angular/material/menu';
import { ProfileComponent } from './pages/profile/profile.component';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomepageComponent,
    NotFoundComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent
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
    
  ],
  providers: [    
    provideNgxMask({ }),

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
