import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import {FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './user/user.service';
import { OccupationFilterPipe } from './pipes/occupation-filter.pipe';
import { NameFilterPipe } from './pipes/name-filter.pipe';
import { ExperienceFilterPipe } from './pipes/experience-filter.pipe';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserInterfaceComponent } from './user-interface/user-interface.component';
import { AuthService } from './login/auth.service';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { FormComponent } from './user/form.component';
import { SecurityConfigComponent } from './security-config/security-config.component';

registerLocaleData(localeEs, 'es');

const routes: Routes = [
  { path: "", redirectTo: "/userinterface", pathMatch: "full" },
  {path: 'home', component: HomeComponent},
  {path: 'user', component: UserComponent},
  {path: 'login', component: LoginComponent},
  {path: 'userdetails', component: UserDetailsComponent},
  {path: 'userdetails/:idUser', component: UserDetailsComponent},
  {path: 'userinterface', component: UserInterfaceComponent},
  { path: 'user/form', component: FormComponent },
  { path: 'user/form/:idUser', component: FormComponent }

  ]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    UserComponent,
    LoginComponent,
    OccupationFilterPipe,
    NameFilterPipe,
    ExperienceFilterPipe,
    UserDetailsComponent,
    UserInterfaceComponent,
    FormComponent,
    SecurityConfigComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule
  ],
  providers: [UserService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
