import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { routingComponents, AppRoutingModule } from './app-routing/app-routing.module';
import { TrackingComponent } from './tracking/tracking.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductComponent } from './add-product/product/product.component';
import { MaterialModule } from './material/material.module';
import { ProductService } from './shared/product.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { LoginServiceService } from './shared/login-service.service';
import { UserHomeComponent } from './user-home/user-home.component';
import { JwtModule, JwtInterceptor } from '@auth0/angular-jwt';
import { ErrorInterceptor } from './helpers/error-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    routingComponents,
    TrackingComponent,
    DashboardComponent,
    AddProductComponent,
    ProductComponent,
    LoginComponent,
    HeaderComponent,
    UserHomeComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:4200'],
        blacklistedRoutes: ['http://localhost:4200/login']
      }
    })

  ],
  providers: [ProductService, LoginServiceService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function tokenGetter() {
  return localStorage.getItem('access_token');
}

