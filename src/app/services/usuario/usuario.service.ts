import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario.model';
import { URL_SERVICIOS } from '../../config/config';
import 'rxjs/add/operator/map'
import { Identifiers } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { map, tap } from 'rxjs/operators';


@Injectable()
export class UsuarioService {
  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
  ) {
    this.cargarStorage();
  }

  estaLogueado() {
    // return ( this.token.length > 5 ) ? true : false;
    return true;
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      console.log(this.token);
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    }
    else {
      this.token = "";
      this.usuario = null;
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token;
  }

  logout() {
    this.usuario = null;
    this.token = null;

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
  }

  loginGoogle(token: string) {
    let url = URL_SERVICIOS + "/login/google";

    return this.http.post(url, { token })
      .map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        return true;
      });
  }


  login(usuario: Usuario, recordar: boolean = false) {
    if (recordar) {
      localStorage.setItem('email', usuario.email);
    }
    {
      localStorage.removeItem('email');
    }


    let url = URL_SERVICIOS + "/login";
    return this.http.post(url, usuario)
      .map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        return true;
      })

  }


  crearUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario';

    return this.http.post(url, usuario)
      .map((resp: any) => {
        // swal('Usuario creado',usuario.email,'success');
        return resp.usuario;
      });
  }


  actualizarUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;

    return this.http.put(url, usuario)
      .map((resp: any) => {

        let usuarioDB: Usuario = resp.usuarios;

        this.guardarStorage(usuarioDB._id, this.token, usuarioDB);
        //  sweetAlert('Usuario Actualizado',usuario.nombre, 'success');
        console.log("Usuario Actualizado");
        return true;
      })
  }

  cambiarImagen(archivo: File, id: string) {
    this._subirArchivoService.subirArchivo(archivo, 'usuarios', id)
      .then(resp => {
        console.log(resp);
      })
      .catch(resp => {
        console.log(resp);
      });
  }

  cargarUsuarios(desde: number = 0) {
    let url = URL_SERVICIOS + '/usuario?desde=' + desde;
    return this.http.get(url);
  }

  buscarUsuario(termino: string) {


    

    let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
    return this.http.get(url)
      .pipe(
        tap(r => console.log("respuesta del get de usuarios =>>", r)),
        map((resp: any) => resp.usuarios)
      )
      
  }
}
