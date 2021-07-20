import { Component, OnInit } from '@angular/core';
import{Router, ActivatedRoute}from'@angular/router'
import{EmpleadoI}from'../../models/empleado.interface'
import { ResponseI } from 'src/app/models/reponse.interface';
import{ApiService}from '../../servicios/api/api.service'
import { AvisosService } from '../../servicios/avisos/avisos.service';
import {FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule} from '@angular/forms'


@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {
//
  constructor(private activerouter:ActivatedRoute , private router:Router, private api:ApiService, private alertas:AvisosService) { }

  datosEmpleado!: EmpleadoI ;
  editarForm = new FormGroup({
     nombre: new FormControl(''),
     correo : new FormControl(''),
     dni: new FormControl(''),
     direccion: new FormControl(''),
     codigoPostal: new FormControl(''),
     genero: new FormControl(''),
     telefono: new FormControl(''),
     token: new FormControl(''),
     pacienteId: new FormControl(''),
     fechaNacimiento: new FormControl('')
});


  ngOnInit(): void {
     let pacienteid = this.activerouter.snapshot.paramMap.get('id');
     let token = this.getToken();
     this.api.getsingleEmployee(pacienteid).subscribe(data  =>{
      this.datosEmpleado = data[0];

      // console.log(this.datosEmpleado);
           this.editarForm.setValue({
          'nombre': this.datosEmpleado.Nombre,
          'correo': this.datosEmpleado.Correo,
          'dni': this.datosEmpleado.DNI,
          'direccion': this.datosEmpleado.Direccion,
          'codigoPostal': this.datosEmpleado.CodigoPostal,
          'genero': this.datosEmpleado.Genero,
          'telefono': this.datosEmpleado.Telefono,
          'token': token,
          'pacienteId': pacienteid,
          'fechaNacimiento': this.datosEmpleado.FechaNacimiento
           });
     })
  }


  getToken(){
    return localStorage.getItem('token');
  }

   postForm(form:EmpleadoI){

    console.log(form);
      this.api.putEmployee(form).subscribe( data =>{
        console.log(data)
          let respuesta:ResponseI = data;
          if(respuesta.status == "ok"){
              this.alertas.showSuccess('Datos modificados ','Operacion realizada con exito');
              this.router.navigate(['dashboard']);
       }else{
            this.alertas.showError(respuesta.result.error_msg,'Error');
        }
    })
   }

   eliminar(){
     console.log("eliminar");
     let datos:EmpleadoI = this.editarForm.value;
     this.api.deleteEmployee(datos).subscribe(data =>{
      console.log(data);

       let respuesta:ResponseI = data;
         if(respuesta.status == "ok"){
             this.alertas.showSuccess('Empleado eliminado','Operacion realizada con exito');
             this.router.navigate(['dashboard']);
         }else{
             this.alertas.showError(respuesta.result.error_msg,'Error');
       }
     })
   }


  salir(){
    this.router.navigate(['dashboard']);
  }



}
