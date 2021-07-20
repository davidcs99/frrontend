import { Component, OnInit } from '@angular/core';
import{ ApiService }from'../../servicios/api/api.service'
import{Router}from'@angular/router'

import{ListaempleadosI}from'../../models/listaempleados.interface'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


   empleados:ListaempleadosI[ ] = [ ];

  //


  constructor(private api:ApiService, private router:Router) { }

  ngOnInit(): void {

    this.api.getallemployee(1).subscribe(data=>{
      this.empleados=data;
    })

  }

  editarEmpleado(id: any){
    this.router.navigate(['editar', id])
  }


  nuevoEmpleado(){
    this.router.navigate(['nuevo']);


  }


}
