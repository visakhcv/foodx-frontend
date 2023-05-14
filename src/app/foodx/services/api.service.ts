import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs'

const options={
  headers:new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  base_url='http://localhost:3000'
  constructor(private http:HttpClient) { }

  searchterm= new BehaviorSubject('')
  cartitemcount= new BehaviorSubject(0)
  cartitems:any=[]

  appendtoken(){
    let token=localStorage.getItem('token')
    let headers = new HttpHeaders()
    if (token){
      headers= headers.append('verify',token)
      options.headers=headers
    }
    return options
  }

  getfoods(){
    return this.http.get(`${this.base_url}/foodx/foods`,this.appendtoken())
  }

  viewfood(id:any){
    return this.http.get(`${this.base_url}/foodx/viewfood/${id}`,this.appendtoken())
  }

  addtocart(foods:any){
    const body={
      id:foods.id,
      name:foods.name,
      price:foods.price,
      image:foods.image,
      quantity:foods.quantity,
    }
    return this.http.post(`${this.base_url}/foodx/addtocart`,body,this.appendtoken())

  }

  getcart(){
    return this.http.get(`${this.base_url}/foodx/getcartitems`,this.appendtoken())
  }

  emptycart(){
    return this.http.delete(`${this.base_url}/foodx/emptycart`)
  }
  

  cartcount(){
    this.getcart().subscribe((result:any)=>{
      this.cartitemcount.next(result.length)
    })
  }

  logout(){
    this.emptycart().subscribe((result:any)=>{
      this.cartitems=result
    })
  }
  removecartitem(id:any){
    return this.http.delete(`${this.base_url}/foodx/removeitem/${id}`,this.appendtoken())
  }

  incart(id:any){
    return this.http.get(`${this.base_url}/foodx/incart/${id}`)
  }
  decart(id:any){
    return this.http.get(`${this.base_url}/foodx/decart/${id}`)
  }

  signup(inputdata:any){
    return this.http.post(`${this.base_url}/foodx/register`,inputdata)
  }
  adminlogin(username:any,password:any){
    const body={
    username,
    password
    }
   return this.http.post(`${this.base_url}/foodx/adminlogin`,body) 
  }
  userlogin(username:any,password:any){
    const body={
    username,
    password
    }
   return this.http.post(`${this.base_url}/foodx/userlogin`,body) 
  }

  addproduct(id:any,name:any,image:any,price:any,description:any,category:any){
    const body={
      id,
      name,
      image,
      price,
      description,
      category
    }
    return this.http.post(`${this.base_url}/foodx/addfood`,body)
  }

  getusers(){
    return this.http.get(`${this.base_url}/foodx/getuserdetails`)
  }

  removeuser(username:any){
    return this.http.delete(`${this.base_url}/foodx/removeuser/${username}`)
  }

  showfoods(){
    return this.http.get(`${this.base_url}/foodx/showfoods`)
  }
  removefooddb(id:any){
    return this.http.delete(`${this.base_url}/foodx/removedbfood/${id}`)
  }

  submituseraddress(name:any,username:any,flat:any,street:any,state:any){
    const body={
      name,
      username,
      flat,
      street,
      state
    }
    return this.http.post(`${this.base_url}/foodx/useraddress`,body)
  }

  getpizza(){
    return this.http.get(`${this.base_url}/foodx/getpizza`)
  }

  getsalad(){
    return this.http.get(`${this.base_url}/foodx/getsalad`)
  }
  getdrink(){
    return this.http.get(`${this.base_url}/foodx/getdrink`)
  }
  getsauce(){
    return this.http.get(`${this.base_url}/foodx/getsauce`)
  }

}