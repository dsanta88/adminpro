import { Component, OnInit, ɵConsole } from '@angular/core';
import { SubirArchivoService } from '../../services/service.index';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

 imagenSubir: File;
 imagenTemp: string;

  constructor(
    public _subirArchivoService: SubirArchivoService,
    public _modalUploadService: ModalUploadService
  ) {

   }

  ngOnInit() {
  }

  cerrarModal()
  {
    this.imagenTemp=null;
    this.imagenSubir=null;

    this._modalUploadService.ocultarModal();
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

  subirImagen(){
    this._subirArchivoService.subirArchivo(this.imagenSubir,this._modalUploadService.tipo,this._modalUploadService.id)
     .then(resp=>{

      this._modalUploadService.notificacion.emit(resp);
      this.cerrarModal();
      
     })
     .catch(err=>{
       console.log('Eror en la carga');
     })
  }
}
