import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  public payPalConfig?: IPayPalConfig;

  cartitems:any=[]
  carttotal:number=0
  name:string=''
  flat:string=''
  street:string=''
  state:string=''
  loginstatus:boolean=false
  offerclickedstatus:boolean= false
  proceedtopaymentstatus:boolean= false
  discountclickedstatus:boolean=false
  user:any=[]
  username:string=""
  showsuccess:boolean=false
  showcancel:boolean=false
  showerror:boolean=false
  showpaypal:boolean=false
  reload:boolean=false
  addressform=this.fb.group({
    name:[''],
    flat:[''],
    street:[''],
    state:['']
  })
  constructor (private api:ApiService,private fb:FormBuilder,private cartrouter:Router){

  }
  ngOnInit(): void{
    
    this.loginstatus=true
    this.user=localStorage.getItem('username')
    this.api.getcart()
    .subscribe((result:any)=>{
      console.log(result);
      this.cartitems=result
      this.getcarttotal()
      this.initConfig();
    },(result:any)=>{
      alert(result.error)
    })
    
}
  

  getcarttotal(){
    let total=0
    this.cartitems.forEach((item:any) => {
     total += item.total
      this.carttotal = Math.ceil(total)
    });
   }

   removecartitem(id:any){
    this.api.removecartitem(id)
    .subscribe((result:any)=>{
      this.cartitems=result
      this.getcarttotal()
      this.api.cartcount()
    },(result:any)=>{
      alert(result.error)
    })
   }


   incart(id:any){
    this.api.incart(id)
    .subscribe((result:any)=>{
      this.cartitems=result
      this.getcarttotal()
      
    },(result:any)=>{
      alert(result.error)
    })
   } 

   decart(id:any){
    this.api.decart(id)
    .subscribe((result:any)=>{
      this.cartitems=result
      this.getcarttotal()
  
    },(result:any)=>{
      alert(result.error)
    })
   } 


   submitbtnclicked(){
    if(this.addressform.valid){
      this.proceedtopaymentstatus= true
      this.username=this.user
      this.name=this.addressform.value.name||''
      this.flat=this.addressform.value.flat||''
      this.street=this.addressform.value.street||''
      this.state=this.addressform.value.state||''
      console.log(this.username);
      
    }
    else{
      alert('please enter valid inputs')
    }
   }

   offerclicked(){
    this.offerclickedstatus=true
   }

   discount10(){
    let discount=Math.ceil(this.carttotal*10/100)
    this.carttotal=this.carttotal-discount
    this.discountclickedstatus=true
   }
   discount50(){
    let discount=Math.ceil(this.carttotal*50/100)
    this.carttotal=this.carttotal-discount
    this.discountclickedstatus=true
   }

   search(event:any){
    this.api.searchterm.next(event.target.value)
  }

   logout(){
    localStorage.removeItem('username')
    localStorage.removeItem('token')
    this.cartitems= this.api.logout()
    setTimeout(() => {
      this.cartrouter.navigateByUrl('foodx/login')
    }, 2000);
  }

  private initConfig(): void {
    let amount= this.carttotal.toString()
    this.payPalConfig = {
    currency: 'USD',
    clientId: 'sb',
    createOrderOnClient: (data:any) => <ICreateOrderRequest>{
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: amount,
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: amount
              }
            }
          },
          items: [
            {
              name: 'Enterprise Subscription',
              quantity: '1',
              category: 'DIGITAL_GOODS',
              unit_amount: {
                currency_code: 'USD',
                value: amount,
              },
            }
          ]
        }
      ]
    },
    advanced: {
      commit: 'true'
    },
    style: {
      label: 'paypal',
      layout: 'vertical'
    },
    onApprove: (data, actions) => {
      console.log('onApprove - transaction was approved, but not authorized', data, actions);
      actions.order.get().then((details:any) => {
        console.log('onApprove - you can get full order details inside onApprove: ', details);
      });
    },
    onClientAuthorization: (data) => {
      console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      this.showsuccess = true;
      // hide paypal view
      this.showpaypal=false
      alert("transaction completed")
      // hide make payment button
      this.proceedtopaymentstatus=false
      this.api.submituseraddress(this.username,this.name,this.flat,this.street,this.state).subscribe((result:any)=>{
        console.log(result);
        
      })
      this.cartitems=this.api.logout()
      
    },
    onCancel: (data, actions) => {
      console.log('OnCancel', data, actions);
      this.showcancel=true
       // hide paypal view
       this.showpaypal=false
    },
    onError: err => {
      console.log('OnError', err);
      this.showerror=true
       // hide paypal view
       this.showpaypal=false
    },
    onClick: (data, actions) => {
      console.log('onClick', data, actions);
    },
  };
  }
  
  makepayment(){
    this.showpaypal=true
  }
  

}

