import { Component, OnInit, ɵConsole } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import { URL_SERVICIOS } from '../../config/config';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
//import * as swal from 'sweetalert';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;


  constructor(
    public _usuarioService: UsuarioService,
    public _modalUploadService:ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarUsuarios();
    this._modalUploadService.notificacion
    .subscribe(resp=>this.cargarUsuarios());
  }

  mostrarModal(id:string)
  {
    console.log(id);
  this._modalUploadService.mostrarModal('usuarios',id);
  }


  cargarUsuarios() {
    this.cargando = true;
    this._usuarioService.cargarUsuarios(this.desde)
      .subscribe((resp: any) => {

        this.totalRegistros = resp.total;
        this.usuarios = resp.usuarios;
        this.cargando = false;

      })
  }

  cambiarDesde(valor: number) {
    let desde = this.desde + valor;
    console.log(desde);

    if (desde >= this.totalRegistros) {
      return;
    }

    if (desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();
  }


  buscarUsuario(termino: string) {

    if (termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;

    this._usuarioService.buscarUsuario(termino)
      .subscribe((usuarios: Usuario[]) => {

        this.usuarios = usuarios;
        this.cargando = false;
      });

  }

  borrarUsuario(usuario: Usuario) {
    console.log(usuario);
    if (usuario._id === this._usuarioService.usuario._id) {
      //swal('No se puede borrar el usuario', 'No se puede borrar a si mismo', 'error');
      return;
    }

      // swal({
       // title: "Esta seguro?",
       //  text: "Esta seguro de borrar a" + usuario.nombre,
       //  icon: "warning",
      //  dangerMode: true,
    // })
       // .then(borrar => {
         // if (borrar) {
            //this._usuarioService.borrarUsuario(usuario._id)
            //    .subscribe(borrado => {
             //    console.log(borrado);
            //     this.cargarUsuarios();
            //   })
          //  }
       // });
  }

  guardarUsuario(usuario: Usuario) {
    console.log(usuario);
    this._usuarioService.actualizarUsuario(usuario)
      .subscribe();

  }

 
}

