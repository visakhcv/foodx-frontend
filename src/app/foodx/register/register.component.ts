import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm = this.fb.group({
    username: this.fb.control('', Validators.compose([Validators.required, Validators.minLength(5)])),
    name: this.fb.control('', Validators.required),
    password: this.fb.control('', Validators.required),
    role: this.fb.control(''),
    isactive: this.fb.control(false)
  });
  registerstatus:boolean=false
constructor (private api:ApiService,private fb:FormBuilder,private registerrouter:Router){

}

signup(){
  if(this.registerForm.valid){
     this.api.signup(this.registerForm.value).subscribe((result:any)=>{
      
      this.registerstatus=true
      setTimeout(() => {
        alert('registered successfully')
        this.registerrouter.navigateByUrl('foodx/login')
      }, 2000);
      
     })
  }else{
    alert('Invalid form')
  }
}



}
