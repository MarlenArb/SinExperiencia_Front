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



const routes: Routes = [
  { path: "", redirectTo: "/userinterface", pathMatch: "full" },
  {path: 'home', component: HomeComponent},
  {path: 'user', component: UserComponent},
  {path: 'login', component: LoginComponent}

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
    ExperienceFilterPipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
