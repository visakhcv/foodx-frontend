import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoodxRoutingModule } from './foodx-routing.module';
import { FoodxComponent } from './foodx.component';
import { FoodsComponent } from './foods/foods.component';
import { ViewComponent } from './view/view.component';
import { CartComponent } from './cart/cart.component';
import { FilterPipe } from './pipe/filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MaterialModule } from 'src/material.module';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { NgxPayPalModule } from 'ngx-paypal';
import {NgxPaginationModule} from 'ngx-pagination';



@NgModule({
  declarations: [
    FoodxComponent,
    FoodsComponent,
    ViewComponent,
    CartComponent,
    
    FilterPipe,
         LoginComponent,
         RegisterComponent,
         AdminloginComponent,
         AdminhomeComponent,

  ],
  imports: [
    CommonModule,
    FoodxRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    NgxPayPalModule,
    NgxPaginationModule
  ]
})
export class FoodxModule { }
