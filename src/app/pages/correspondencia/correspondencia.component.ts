
import { Component, OnInit } from '@angular/core';

// Formularios
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CorrespondenciaService } from 'src/app/services/correspondencia.service';

// Alertas sweetalert2
import Swal from 'sweetalert2';

// Notificaciones toastr
import { ToastrService } from 'ngx-toastr';

// Servicios
import { DestinatariosService } from 'src/app/services/destinatarios.service';

// Utilizando jquery
declare var JQuery: any;
declare var $: any;


@Component({
  selector: 'app-correspondencia',
  templateUrl: './correspondencia.component.html',
  styleUrls: ['./correspondencia.component.css']
})

export class CorrespondenciaComponent implements OnInit {

  public p: number = 1;

  // Formulario de inscripcion
  public formulario!: FormGroup;

  // Lista de destinatarios
  public listDestinatarios: any = [];
  public listDetalleSeguimiento: any = [];
  public primeraLista: any[] = [];
  public primeraListaNdestinatarios: any[] = [];
  public primeraListaNdestinatarios2: any[] = [];

  // Ocultar y mostrar información
  public loader: boolean = false;
  public mostrarSeguimiento: boolean = false;

  // Derivar a N destinatarios
  public cantidadDestinatarios: number = 0;
  public cantidadRecepcionistas: any = [];

  // Ng-class
  public activo: string = '';

  // Contador
  public cont: number = 0;
  public contVerDestinatario: number = 0;

  // Ultima posicion de primera lista
  public primeraListaUltimaPosicion: number = 0;

  public primerReemplazo: any[] = [];


  public posicion: number = 0;


  // Nuevos Cambios
  public viewNdestinos: boolean = false;
  public viewNdestinosPrimero: boolean = false;
  public tipoDestinatario: number = 0;


  constructor(
    private formBuilder: FormBuilder,
    private correspondenciaServices: CorrespondenciaService,
    private toastr: ToastrService,
    private destinatarioService: DestinatariosService,   // Inyectando el servico al Componente padre

  ) { }

  ngOnInit(): void {

    // Regresar al inicio
    window.scroll({
      top: 0,
      behavior: 'auto'
    });

    this.crearFormulario();

  }

  /**
   * crearFormulario
   */
  public crearFormulario() {
    this.formulario = this.formBuilder.group({
      correspondencia: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]+$/)])],
      // Validacion para numeros y letras con guion
      carnet: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z0-9,-]*$/)])],
    });
  }

  // Validaciones para formulario
  get correspondencia() {
    return this.formulario.get('correspondencia');
  }
  get carnet() {
    return this.formulario.get('carnet');
  }

  /**
   * onSubmit
   */
  public onSubmit() {
    // this.cont = 0;
    const formData = {
      hojaruta: this.correspondencia?.value,
      carnet: this.carnet?.value,
    }

    // Mostrar Loader
    this.loader = true;
    this.mostrarSeguimiento = false;

    // Peticion http
    this.correspondenciaServices.listaSeguimiento(formData)
      .subscribe(({ destinatario, detalleSeguimiento, status }) => {

        this.carnet?.reset();

        // console.log(detalleSeguimiento);
        // console.log(destinatario);

        // console.log(status);
        this.listDestinatarios = [];
        this.primeraLista = [];
        this.primeraListaNdestinatarios = [];
        this.primeraListaNdestinatarios2 = [];
        this.primerReemplazo = [];
        this.p = 1;
        this.viewNdestinos = false;
        this.viewNdestinosPrimero = false;
        this.tipoDestinatario = 0;
        // this.view = false;
        this.cont = 0;
        if (status === 'success') {

          // Logica para N destinatarios
          if (destinatario != false) {
            this.cantidadDestinatarios = destinatario[0].recepcion.length;
            this.cantidadRecepcionistas = destinatario[0].recepcion;

          } else {
            this.cantidadDestinatarios = 0;
          }

          this.listDetalleSeguimiento = detalleSeguimiento[0];

          if (this.listDetalleSeguimiento.nombretipo === "Comunicacion Externa") {

            this.toastr.success('SEGUIMIENTO A TRÁMITES', 'Solicitud Encontrada..!');

            // Mostrar loader
            this.loader = false;
            this.mostrarSeguimiento = true;
            if (destinatario != false) {

              let contador: number = 0;
              let contadorPocicion: number = 0;

              this.listDestinatarios = destinatario;

              // console.log(this.listDestinatarios);

              // Genarar PRIMERA lISTA de destinatarios
              this.listDestinatarios.forEach((element: any, index: any) => {

                if (element.recepcion.length > 1 && contadorPocicion === 0) {
                  this.posicion = index;
                  contadorPocicion++;
                }

                if (element.recepcion.length > 1) {
                  contador++;
                }

                if (element.recepcion.length === 1 && contador === 0) {
                  this.primeraLista.push(element);
                } else {
                  this.primeraListaNdestinatarios.push(element);
                }

              });
              // console.log(this.primeraLista.length);

              if (this.primeraLista.length != 0) {
                this.primeraListaUltimaPosicion = this.primeraLista.length - 1;
              } else {
                this.primeraListaUltimaPosicion = this.primeraLista.length;
              }

              // console.log(this.primeraLista);
              // console.log(this.primeraListaNdestinatarios);

              // FIN Genarar PRIMERA LISTA de destinatarios

            } else {
              this.listDestinatarios = false;
            }
          } else {
            // Mostrar loader
            this.loader = false;
            this.mostrarSeguimiento = false;
            Swal.fire({
              icon: 'error',
              title: 'Solicitud Inválida',
              text: 'No es una comunicación externa..!',
              footer: 'Sistema de Seguimiento a Trámitese'
            })
          }
        } else {
          // Mostrar loader
          this.loader = false;
          this.mostrarSeguimiento = false;
          Swal.fire({
            icon: 'error',
            title: 'Solicitud Inválida',
            text: 'Credenciales incorrectas..!',
            footer: 'Sistema de Seguimiento a Trámites'
          })
        }

      }, (err) => {
        this.loader = false;
        this.mostrarSeguimiento = false;
        Swal.fire({
          icon: 'error',
          title: 'Solicitud Inválida',
          text: 'Datos Incorrectos!',
          footer: 'Sistema de Seguimiento a Trámites'
        })
      }
      );

    // Para la primera iteración
    // if (this.contVerDestinatario === 0) {
    //   this.verDestinatario(0);
    //   console.log('hola');

    //   this.contVerDestinatario++;
    // }
    // FIN Para la primera iteración
  }

  /**
   * verDestinatario
   */
  public verDestinatario(destinatarios: number) {

    this.primerReemplazo = [];
    this.primeraListaNdestinatarios2 = [];

    this.primerReemplazo.push(this.primeraListaNdestinatarios[0]);

    if (this.primeraListaNdestinatarios.length === 1) {
      if (this.primeraListaNdestinatarios[0].recepcion.length > 1) {
        for (let index = 0; index < this.primeraListaNdestinatarios.length; index++) {
          const element = this.primeraListaNdestinatarios[index];
          if (index === 0) {
            this.primeraListaNdestinatarios2.push(element);
          }
        }
      }
    } else {
      // for (let index = 0; index < this.primeraListaNdestinatarios.length; index++) {
      //   const element = this.primeraListaNdestinatarios[index];
      //   if (index != 0) {
      //     this.primeraListaNdestinatarios2.push(element);
      //   }
      // }
      this.primeraListaNdestinatarios2 = this.primeraListaNdestinatarios;
    }


    const datosEmit: any = {
      level: 'uno',
      detalleSeguimiento: this.primerReemplazo,
      destinatario: this.primeraListaNdestinatarios2,
      tipoDestinatario: destinatarios,
      posicion: this.posicion
      // cantDestinatarios: this.primeraListaNdestinatarios[0].recepcion.length
    }

    // console.log(this.primeraListaNdestinatarios);
    // Aqui emitimos datos a los hijos componenetes
    this.destinatarioService.datos$.emit(datosEmit);
    this.cont++;
  }

  /**
   * cambioPagina
   */
  public cambioPagina(event: any) {
    // console.log(event);
    this.p = event;
    this.verDestinatario(event - 1);
    this.tipoDestinatario = event - 1;
  }


  /**
   * cambioPagina
   */
  public cambioPaginaPrimero(event: any) {
    // console.log(event);
    this.p = event;
    this.verDestinatario(event - 1);
    this.tipoDestinatario = event - 1;
  }

  /**
  * verDestinos
  */
  public async verDestinosPrimero() {
    await this.verDestinatario(0);
    this.viewNdestinosPrimero = true;
    // console.log('destinoPrimero');
  }

  /**
   * verDestinos
   */
  public async verDestinos() {
    await this.verDestinatario(0);
    this.viewNdestinos = true;
    // console.log('Hola primero1');
  }

}
