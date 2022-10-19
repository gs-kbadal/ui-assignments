import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuardService } from './auth-guard.service';
import { CardViewComponent } from './card-view/card-view.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { ListViewComponent } from './list-view/list-view.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { MainPageComponent } from './main-page/main-page.component';
import { MockComponentComponent } from './mock-component/mock-component.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';

// canActivate: [AuthGuardService]
const routes: Routes = [
  {path: '', component: RegistrationFormComponent},
  {path: 'home/:name', component: MainPageComponent, children:[
    {path: 'cardview', component: CardViewComponent},
    {path: 'listview', component: ListViewComponent},
  ]},
  {path: 'login', component: LoginFormComponent},
  {path: 'employee', component: EmployeeFormComponent},
  {path: 'editemployee', component: EditEmployeeComponent},
  {path: 'mock/:id', component: MockComponentComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
