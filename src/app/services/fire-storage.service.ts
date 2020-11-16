import { Injectable } from '@angular/core';
import {AngularFireStorage} from "@angular/fire/storage";

@Injectable({
  providedIn: 'root'
})
export class FireStorageService {

  constructor(
    private storage: AngularFireStorage
  ) { }

  /** Subir el archivo **/
  public upload(nombreArchivo: string, datos: any) {
    return this.storage.upload(nombreArchivo, datos);
  }

  /** Obtener referencia del archivo donde sera gaurdado **/
  public referencia(nombreArchivo: string) {
    return this.storage.ref(nombreArchivo);
  }
}
