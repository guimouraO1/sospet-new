import { NgModule } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { AppRoutingModule } from './app-routing.module';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations'; // Adicione esta linha
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { provideNgxMask } from 'ngx-mask';
import { ConfirmationModalComponent } from './pages/profile/confirmation-modal/confirmation-modal.component';
import { EmmitNavToHomeService } from './services/emmit-nav-to-home.service';
import { PublicationsComponent } from './pages/find-pet/find-pet.component';
import { PostPetComponent } from './pages/post-pet/post-pet.component';
import { MapComponent } from './pages/map/map.component';

@NgModule({
  declarations: [AppComponent],

  imports: [
    // Pages
    LoginComponent,
    RegisterComponent,
    HomepageComponent,
    PostPetComponent,
    MapComponent,
    NotFoundComponent,
    ProfileComponent,
    ConfirmationModalComponent,
    PublicationsComponent,
    NavbarComponent,

    // Obrigatórios
    RouterModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSlideToggleModule,
    AppRoutingModule,
  ],
  providers: [provideNgxMask({}), EmmitNavToHomeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
