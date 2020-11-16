import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from "@angular/fire/database";
import {Cita} from "../models/cita";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  /** Contiene la conexion con la DB **/
  itemsRef: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) {
    this.itemsRef = this.db.list('citas');
  }

  /** Obtener todos los archivos **/
  get() {
    return this.itemsRef.snapshotChanges().pipe(
      map(archivos =>
        archivos.map(c => ({
          "key": c.key,
          "datos": c.payload.val(),
        }))),
    );
  }

  /** Insertar en firebase **/
  post(cita: Cita) {
    return this.itemsRef.push({
      nombre: cita.nombre,
      whatsapp: cita.whatsapp,
      correo: cita.correo,
      comentario: cita.comentario
    });
  }

  /** Actualizar **/
  update(cita: Cita) {
    this.itemsRef.update(cita.$key, {
      nombre: cita.nombre,
      whatsapp: cita.whatsapp,
      correo: cita.correo,
      comentario: cita.comentario
    });
  }

  /** Borrar **/
  delete($key: string) {
    this.itemsRef.remove($key);
  }
}
