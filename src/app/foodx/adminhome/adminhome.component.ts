import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { timeout } from 'rxjs';



@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css']
})
export class AdminhomeComponent {

  

  addproductclickedstatus:boolean=false
  productaddstatus:string=''
  productimage:any=[]
  showimagestatus:boolean=false
  productform = this.fb.group({
    id:['',[Validators.required]],
    name:['',[Validators.required]],
    image:['',[Validators.required]],
    price:['',[Validators.required]],
    description:['',[Validators.required]],
    category:['',[Validators.required]]
  })
  userdetails:any=[]
  user:any=[]
  allfoods:any=[]
  showproductclicked:boolean=false
  viewclickedstatus:boolean=false
  p:any=[]
  
  constructor (private api:ApiService,private fb:FormBuilder,private adminrouter:Router){

  }

  ngOnInit() : void {
    // if(!localStorage.getItem('token')){
    //   alert("Please login")
    //   this.adminrouter.navigateByUrl('foodx/login/admin')
    // }
    
    this.api.getusers()
    .subscribe((result:any)=>{
     this.userdetails=result 
     this.user = localStorage.getItem('username')
    })
    this.getfoods()
    
  }
  addproductclicked(){
    this.addproductclickedstatus=true
  }
  closeaddproduct(){
    this.addproductclickedstatus=false
  }

  showimage(){
    this.productimage= this.productform.value.image
    this.showimagestatus=true
  }

  hideimage(){
    this.productimage=[]
    this.showimagestatus=false
  }

  addproduct(){
   
    if(this.productform.valid){
      let id= this.productform.value.id
      let name=this.productform.value.name
      let image=this.productform.value.image
      let price=this.productform.value.price
      let description=this.productform.value.description
      let category=this.productform.value.category
      
      this.api.addproduct(id,name,image,price,category,description)
      .subscribe((result:any)=>{
        alert(result)
        this.productform.reset()
      },(result:any)=>{
        alert(result.error)
      })
    }
    else{
      alert('invalid form')
    }
  }

  removeuser(username:any){
    console.log(username);
    
    this.api.removeuser(username)

    .subscribe((result:any)=>{
      console.log(result);
      
      this.userdetails= result
    },(result:any)=>{
      alert(result.error)
    })
  }

  logout(){
    localStorage.removeItem('username')
    localStorage.removeItem('token')
      this.adminrouter.navigateByUrl('foodx/login/admin')
  }

  showproduct(){
    this.showproductclicked=true
    this.getfoods()
    
  }
  closeshowproduct(){
    this.showproductclicked=false
  }

  getfoods(){
    this.api.showfoods().subscribe((result:any)=>{
      this.allfoods=result
    })
  }

  removefood(id:any){
    this.api.removefooddb(id)
    .subscribe((result:any)=>{
      this.allfoods=result
    })
  }

  viewclicked(){
    this.viewclickedstatus=true
  }
  viewcloseclicked(){
    this.viewclickedstatus=false
  }
}
