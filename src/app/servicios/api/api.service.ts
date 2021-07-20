import { Injectable } from '@angular/core';
import {LoginI} from  '../../models/login.interface'
import {ResponseI} from  '../../models/reponse.interface'
import{ListaempleadosI} from '../../models/listaempleados.interface'
import{EmpleadoI}from'../../models/empleado.interface'
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http'
import{Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url :string="https://api.solodata.es/"

  constructor(private http:HttpClient) { }

  loginbyemail(form:LoginI):Observable<ResponseI>{
   let direccion= this.url+"auth"
    return this.http.post<ResponseI>(direccion,form);
  }

  getallemployee(page:number):Observable<ListaempleadosI[]>{
    let direccion=this.url + "pacientes?page="+page
    return this.http.get<ListaempleadosI[]>(direccion);
  }

  getsingleEmployee(id: string | null):Observable<EmpleadoI[]>{
    let direccion = this.url + "pacientes?id="+id;
    return this.http.get<EmpleadoI[]>(direccion);
  }

  putEmployee(form:EmpleadoI):Observable<ResponseI>{
    let direccion = this.url + "pacientes";
    return this.http.put<ResponseI>(direccion, form);
  }

  deleteEmployee(from:EmpleadoI):Observable<ResponseI>{
    let direccion = this.url + "pacientes";
    let Options = {
      headers: new HttpHeaders({
         'Content-type': 'application/json'
      }),
      body:from
    }
    return this.http.delete<ResponseI>(direccion, Options);
  }

  postEmployee(form:EmpleadoI):Observable<ResponseI>{
    let direccion = this.url+ "pacientes";
    return this.http.post<ResponseI>(direccion,form);
  }

}
