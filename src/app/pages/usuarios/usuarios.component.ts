import { Component, OnInit, ɵConsole } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import { URL_SERVICIOS } from '../../config/config';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

usuarios: Usuario[]=[];
desde:number=0;
totalRegistros: number=0;
cargando:boolean=true;



  constructor(
    public _usuarioService:UsuarioService
  ) { }

  ngOnInit()
  {
    this.cargarUsuarios();
  }

  cargarUsuarios()
  {
      this.cargando=true;
      this._usuarioService.cargarUsuarios(this.desde)
      .subscribe((resp:any)=>{
       
        this.totalRegistros=resp.total;
        this.usuarios=resp.usuarios;
        this.cargando=false;
     
      })
  }

  cambiarDesde(valor:number)
  {
     let desde=this.desde+valor;
     console.log(desde); 

        if(desde>=this.totalRegistros)
        {
         return;
        }

        if(desde<0)
        {
          return ;
        }

        this.desde +=valor;
        this.cargarUsuarios();
  }

  buscarUsuario(termino:string)
  {
    this._usuarioService.buscarUsuario(termino)
    .subscribe((usuarios : Usuario[])=>
    {
      console.log(usuarios);
    });
  }
}
