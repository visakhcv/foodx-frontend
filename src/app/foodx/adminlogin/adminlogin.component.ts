import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent {
adminloginclicked:boolean=false
loginstatus=false

adminloginform = this.fb.group({
  username:['',[Validators.required]],
  password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
})

constructor(private api:ApiService,private fb:FormBuilder,private adrouter:Router){}
ngOnInit() : void {
  this.adminloginclicked=true
}

adminlogin(){
  if(this.adminloginform.valid){
    let username=this.adminloginform.value.username
    let password=this.adminloginform.value.password
    this.api.adminlogin(username,password)
    .subscribe((result:any)=>{
      this.loginstatus=true
      localStorage.setItem("username",result.username)
      setTimeout(() => {
        this.adrouter.navigateByUrl('foodx/admin-home')
      }, 3000);
    },(result:any)=>{
      setTimeout(() => {
        this.adminloginform.reset()
    }, 3000);
    })
  }
  else{
    alert('invalid form')
  }
}


}
