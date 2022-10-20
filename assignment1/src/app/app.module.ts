import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, en_US, NzFormModule, NzLayoutModule, NzIconModule, NzPaginationModule, NzModalRef } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CardViewComponent } from './card-view/card-view.component';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { ListViewComponent } from './list-view/list-view.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { MainPageComponent } from './main-page/main-page.component';
import { MockComponentComponent } from './mock-component/mock-component.component';
import { NgxPaginationModule } from 'ngx-pagination';


registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    CardViewComponent,
    EmployeeFormComponent,
    LoginFormComponent,
    ListViewComponent,
    RegistrationFormComponent,
    MainPageComponent,
    MockComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzButtonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientJsonpModule,
    NzFormModule,
    NzLayoutModule,
    NzIconModule,
    NzPaginationModule,
    NgxPaginationModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
