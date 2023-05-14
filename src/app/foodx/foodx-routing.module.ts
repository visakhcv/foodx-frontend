import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoodxComponent } from './foodx.component';
import { FoodsComponent } from './foods/foods.component';
import { ViewComponent } from './view/view.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';


const routes: Routes = [{ path: 'login', component: LoginComponent },
{path:'login/register',component:RegisterComponent},
{path:'login/admin',component:AdminloginComponent},
{path:'admin-home',component:AdminhomeComponent},
{path:'',component:FoodsComponent},
{path:'view/:id',component: ViewComponent},
{path:'cart',component:CartComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoodxRoutingModule { }
