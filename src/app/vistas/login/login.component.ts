import { Component, OnInit } from '@angular/core';

import{FormGroup, FormControl, Validators} from'@angular/forms'
import {ApiService} from '../../servicios/api/api.service'
import {LoginI} from '../../models/login.interface'
import {ResponseI} from '../../models/reponse.interface'

import{Router}from'@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm= new FormGroup({
    usuario : new FormControl('',Validators.required),
    password: new FormControl('', Validators.required)

  })

  constructor(private api:ApiService, private router:Router) { }

errorStatus:boolean=false;
errorMsj:any="";

  ngOnInit(): void {
  this.checklocalStorage();
  }

  checklocalStorage(){
    if(localStorage.getItem('token')){
      this.router.navigate(['home']);
    }
  }

  onLogin(form: LoginI){
    this.api.loginbyemail(form).subscribe(data =>{
      let dataResponse:ResponseI =data;
      if(dataResponse.status== "ok"){
        localStorage.setItem("token", dataResponse.result.token);
        // this.router.navigate(['dashboard']);
        this.router.navigate(['home']);
      }else{
        this.errorStatus=true;
        this.errorMsj=dataResponse.result.error_msg;
      }
    })
  }

}
