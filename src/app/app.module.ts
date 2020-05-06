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
import { JobComponent } from './job/job.component';
import { JobInterfaceComponent } from './job-interface/job-interface.component';
import { JformComponent } from './job/jform.component';
import { JobService } from './job/job.service';

registerLocaleData(localeEs, 'es');

const routes: Routes = [
  { path: "", redirectTo: "/jobinterface", pathMatch: "full" },
  {path: 'home', component: HomeComponent},
  {path: 'user', component: UserComponent},
  {path: 'job', component: JobComponent},
  {path: 'login', component: LoginComponent},
  {path: 'userdetails', component: UserDetailsComponent},
  {path: 'userdetails/:idUser', component: UserDetailsComponent},
  {path: 'userinterface', component: UserInterfaceComponent},
  {path: 'jobinterface', component: JobInterfaceComponent},
  { path: 'user/form', component: FormComponent },
  { path: 'user/form/:idUser', component: FormComponent },
  { path: 'job/form', component: JformComponent },
  { path: 'job/form/:idJob', component: JformComponent }

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
    SecurityConfigComponent,
    JobComponent,
    JobInterfaceComponent,
    JformComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule
  ],
  providers: [UserService, AuthService, JobService],
  bootstrap: [AppComponent]
})
export class AppModule { }
