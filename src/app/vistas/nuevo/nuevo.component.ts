import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { EmpleadoI } from '../../models/empleado.interface';
import { ResponseI } from '../../models/reponse.interface';
import { ApiService } from '../../servicios/api/api.service';
import { AvisosService } from '../../servicios/avisos/avisos.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css']
})
export class NuevoComponent implements OnInit {

  newForm = new FormGroup({
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


  constructor(private api:ApiService, private router:Router, private alert:AvisosService) { }

  ngOnInit(): void {
    let token = localStorage.getItem('token');
    this.newForm.patchValue({
      'token' : token
    });
  }

   postForm(form:EmpleadoI){

       this.api.postEmployee(form).subscribe( data =>{
           console.log(data);
           let respuesta:ResponseI = data;
          if(respuesta.status == "ok"){
              this.alert.showSuccess('Nuevo empleado Guardado','Operacion realizada con exito');
       }else{
            this.alert.showError(respuesta.result.error_msg,'Error');
        }
       })
   }

  salir(){
    this.router.navigate(['dashboard']);
  }

}
