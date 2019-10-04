import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo:string='usuario'): any {
    let url=URL_SERVICIOS+'/img';

    if(!img)
    {
      return url+'/usuarios/xxx';
    }

    //Si es imagen de google
    if(img.indexOf('https')>=0)
    {
      return img;
    }

    switch(tipo)
    {
      case 'usuario':
           url+='/usuarios/'+img;
          break;
      case 'medicos':
          url+='/medicaos/'+img;
          break;
      case 'hospitales':
          url+='/hospitales/'+img;
         break;
      default: 
         console.log('Tipo de imagen no existe: Uusario, Medicos, Hospitales');
         url+='/usuarios/xxx';
    }
    console.log(url);
    return url;
  }
}
