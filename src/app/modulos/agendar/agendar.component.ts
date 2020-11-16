import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import $ from 'jquery';
import {CitaService} from "../../services/cita.service";
import Swal from 'sweetalert2';
import {FireStorageService} from "../../services/fire-storage.service";

@Component({
  selector: 'app-agendar',
  templateUrl: './agendar.component.html',
  styleUrls: ['./agendar.component.css']
})
export class AgendarComponent implements OnInit, AfterViewInit {

  /** Formulario **/
  agendarForm: FormGroup;
  /** Variable para mostrar el porcentaje de carga **/
  percent: number = 0;
  /** Variable para saber si se subira un archivo **/
  archivoASubir = {
    archivo: undefined,
    nombre: undefined,
    hayArchivo: false
  };
  /** Validar que solo acepte imagenes **/
  extensionesDeArchivoAceptadas = ['image/png', 'image/jpeg'];
  /** Selector para que info mostrar **/
  selector = 0;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private citaService: CitaService,
    private storage: FireStorageService,
  ) { }

  /** Asignar valores al formulario **/
  ngOnInit(): void {
    // this.citaService.get().subscribe(res => {
    //   console.log(res)
    // });

    this.agendarForm = this.fb.group({
      'nombre': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'whatsapp': new FormControl('', [Validators.required, Validators.minLength(10),
        Validators.pattern('[0-9]{10,}')]),
      'correo': new FormControl('', [Validators.email]),
      'comentario': new FormControl('', [Validators.required, Validators.minLength(25)]),
    });
  }

  /** Funcion para mostrar el nombre del archivo en el input file **/
  ngAfterViewInit() {
    $(".custom-file-input").on("change", function() {
      var fileName = $(this).val().split("\\").pop();
      $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
    });
  }

  /** Función que valida la imagen a subir **/
  almacenarArchivo(event) {
    this.archivoASubir.archivo = event.target.files[0];
    if (this.archivoASubir.archivo) {
      const extencionAceptada: Boolean = this.extensionesDeArchivoAceptadas.includes(this.archivoASubir.archivo.type);
      const lengthFile = this.archivoASubir.archivo.size * .000001;
      if (extencionAceptada && lengthFile < 3) {
        this.archivoASubir.nombre = event.target.files[0].name;
      } else {
        let titulo: string;
        let texto: string;
        if (!extencionAceptada) {
          titulo = 'Extensión no soportada';
          texto = 'Solo puedes subir imagenes png o jpg';
        } else {
          titulo = 'Archivo demasiado grande';
          texto = 'El archivo que subas debe pesar menos de 3 MB';
        }
        Swal.fire({
          title: titulo,
          text: texto,
          icon: 'error',
        }).then(() => {
          this.archivoASubir.archivo = undefined;
        })
      }
    }
    this.archivoASubir.hayArchivo = true;
  }

  /** Hacer post del formulario y en caso de haber una imagen la sube **/
  enviar() {
    this.selector = 1;
    this.citaService.post(this.agendarForm.getRawValue()).then(data => {
      if(this.archivoASubir.hayArchivo) {
       this.selector = 2;
       this.uploadFile(data.key)
      } else {
        this.selector = 3;
      }
    }).catch(e => {
      this.selector = 4;
      console.log(e)
    })
  }

  /** PAra reiniciar el formulario ya sea por error o finalizado **/
  resetearFormulario() {
    this.agendarForm.reset();
    this.archivoASubir = {
      archivo: undefined,
      nombre: undefined,
      hayArchivo: false
    };
    $(".custom-file-label").html('Subir Diseño');
  }

  /** Función que sube el archivo  **/
  uploadFile(key) {
    const file = this.archivoASubir.archivo;
    const filePath = 'citas/' + key;
    const fileRef = this.storage.referencia(filePath);
    const task = this.storage.upload(filePath, file);

    task.percentageChanges().subscribe({
      next: porcentaje => {
        this.percent = Math.round(porcentaje);
      },
      complete: () => {
        console.log('se logro');
        // fileRef.getDownloadURL().subscribe({
        //   next: (url) => {
        //     console.log(url);
        //   }
        // })
        this.selector = 3;
      }
    });
  }
}
