import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  userloginclicked:boolean=false
  loginstatus:boolean=false
  userloginform = this.fb.group({
    username:['',[Validators.required]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })

  constructor (private api:ApiService,private fb:FormBuilder,private userrouter:Router){
    
  }

  ngOnInit() :void {
    this.userloginclicked=true
  }

  userlogin(){
    if(this.userloginform.valid){
      let username=this.userloginform.value.username
      let password=this.userloginform.value.password
      this.api.userlogin(username,password)
      .subscribe((result:any)=>{
        this.loginstatus=true
        localStorage.setItem('token',result.token)
        localStorage.setItem('username',result.username)
        setTimeout(() => {
          this.userrouter.navigateByUrl('foodx')
        }, 1000);
      },(result:any)=>{
        setTimeout(() => {
          this.userloginform.reset()
      }, 3000);
      })
    }
    else{
      alert('invalid form')
    }
  }
  
}
