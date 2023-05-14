import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {

  foodid:string=''
  foods:any=[]
  user:any=[]
  loginstatus:boolean=false
  cartitems:number=0
  constructor (private api:ApiService,private viewactivatedroute:ActivatedRoute,private viewrouter:Router){}

  ngOnInit() : void{
    if(!localStorage.getItem('token')){
      alert("Please login")
      this.viewrouter.navigateByUrl('')
    }
    else{
      this.loginstatus=true 
      this.user = localStorage.getItem('username')
      this.api.cartitemcount.subscribe((result:any)=>{
      this.cartitems=result
      })
      this.viewactivatedroute.params
      .subscribe((result:any)=>{
        console.log(result);
        this.foodid=result.id
      })

      this.api.viewfood(this.foodid)
      .subscribe((result:any)=>{
        this.foods=result
      })
    }
      
  }

  addtocart(foods:any){
    Object.assign(foods,{quantity:1})
    console.log(foods);
    
    this.api.addtocart(foods)
    .subscribe((result:any)=>{
      this.api.cartcount()
      alert(result)
    },(result:any)=>{
      alert(result.error)
    })
    
  }

  logout(){
    localStorage.removeItem('username')
    localStorage.removeItem('token')
    setTimeout(() => {
      this.viewrouter.navigateByUrl('foodx/login')
    }, 2000);
  }
}
