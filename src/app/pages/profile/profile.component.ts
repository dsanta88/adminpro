import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import swal from 'sweetalert';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: string;

  constructor(
public _usuarioService: UsuarioService

  ) { 
    this.usuario=this._usuarioService.usuario;
  }

  ngOnInit() {
  }

  guardar(usuario: Usuario)
  {
   this.usuario.nombre=usuario.nombre;
   if(!this.usuario.google)
   {
    this.usuario.email=usuario.email;
   }


   this._usuarioService.actualizarUsuario(this.usuario)
   .subscribe(resp=>{
     console.log(resp);
   })
  }

  seleccionImagen( archivo: File)
  {
    if(!archivo)
    {
      this.imagenSubir=null;
      return;
    }
 
    if(archivo.type.indexOf('image')<0)
    {
    // swal('Sólo imágenes','El archivo seleccionado no es una imagen','error');
    console.log('El archivo seleccionado no es una imagen');
     this.imagenSubir=null;
     return;
    }

  
   this.imagenSubir=archivo;
   let reader=new FileReader();
   let urlImageTemp=reader.readAsDataURL(archivo);

   reader.onloadend = ()=> this.imagenTemp=reader.result;

  }


  cambiarImagen()
  {
    this._usuarioService.cambiarImagen(this.imagenSubir,this.usuario._id);
  }
}
