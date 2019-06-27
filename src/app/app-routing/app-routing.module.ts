import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from '../cart/cart.component';
import { ProductsComponent } from '../products/products.component';
import { TrackingComponent } from '../tracking/tracking.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AddProductComponent } from '../add-product/add-product.component';
import { LoginComponent } from '../login/login.component';
import { AuthGuard } from '../guards/auth.guard';
import { UserHomeComponent } from '../user-home/user-home.component';



const routes: Routes = [{ path: " ", redirectTo: 'product' },
 {path: 'login', component: LoginComponent},
 
 {path:'ArtoCartHome',component:UserHomeComponent,canActivate:[AuthGuard],children:[{path: 'dashboard', component: DashboardComponent, children: [{ path: "addprod", component: AddProductComponent },],canActivate: [AuthGuard] }]},
 {path: '', redirectTo: 'login', pathMatch: 'full' }

]
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ProductsComponent, CartComponent, TrackingComponent]
