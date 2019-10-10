import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';

@Injectable()
export class SubirArchivoService {

  constructor() { }

  subirArchivo(archivo: File, tipo:string, id: string)
  {

    console.log(archivo);
    console.log(tipo);
    console.log(id);
    return new Promise((resolve,reject)=>{

     let formData=new FormData();
     let xhr=new XMLHttpRequest();

     formData.append('imagen',archivo,archivo.name);
     xhr.onreadystatechange=function () {
       if(xhr.readyState==4)
       {
         if(xhr.status==200)
         {
           console.log('Imagen Subida');
           resolve(JSON.parse(xhr.response));
         }
         else
         {
          console.log('Fallo Subida');
          reject(xhr.response);
         }
       }
     };

     let url=URL_SERVICIOS+'/upload/'+tipo+'/'+id;

     xhr.open('PUT',url,true);
     xhr.send(formData);
     
    })
  }
}
