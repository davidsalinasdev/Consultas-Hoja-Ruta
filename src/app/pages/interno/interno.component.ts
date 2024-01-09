import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

// Formularios
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { CorrespondenciaService } from 'src/app/services/correspondencia.service';

// Alertas sweetalert2
import Swal from 'sweetalert2';

// Notificaciones toastr
import { ToastrService } from 'ngx-toastr';

// Servicios
import { DestinatariosService } from 'src/app/services/destinatarios.service';

import Keyboard from "simple-keyboard";
import { throwError } from 'rxjs';

// Utilizando jquery
declare var JQuery: any;
declare var $: any;


@Component({
  selector: 'app-interno',
  templateUrl: './interno.component.html',
  styleUrls: ['./interno.component.css']
})
export class InternoComponent implements OnInit {

  // 
  public correspondenciaValue: string = "";
  public carnetValue: string = "";

  public keyboardCorrespondencia?: Keyboard;
  public keyboardCarnet?: Keyboard;

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

  public nro_correspondencia?: string;
  public nro_carnet?: string;

  private isCorrespondenciaFocused: boolean = false;
  private isCarnetFocused: boolean = false;


  constructor(
    private formBuilder: FormBuilder,
    private correspondenciaServices: CorrespondenciaService,
    private toastr: ToastrService,
    private destinatarioService: DestinatariosService,   // Inyectando el servico al Componente padre

  ) { }

  ngOnInit(): void {

    // Enfocar el campo correspondencia al inicio
    document.getElementById('correspondenciaId')?.focus();

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
      correspondencia: [''],
      // Validacion para numeros y letras con guion
      carnet: [''],
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
      hojaruta: this.nro_correspondencia,
      carnet: this.nro_carnet
    }

    console.log(formData);
    if ((this.nro_correspondencia === undefined || this.nro_correspondencia === '') ||
      (this.nro_carnet === undefined || this.nro_carnet === '')) {
      // Tu código aquí si la condición es verdadera
      Swal.fire({
        icon: 'error',
        title: 'Solicitud Inválida',
        text: 'Ningun campo debe estar vacio.',
        footer: 'Sistema de Seguimiento a Trámites'
      })
    } else {
      // Mostrar Loader
      this.loader = true;
      this.mostrarSeguimiento = false;

      // Peticion http
      this.correspondenciaServices.listaSeguimiento(formData)
        .subscribe(({ destinatario, detalleSeguimiento, status }) => {

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

              // Destruimos los teclados virtuales
              this.keyboardCorrespondencia?.destroy();
              this.keyboardCarnet?.destroy();

              // Esperar a que la vista se actualice antes de desplazar
              setTimeout(() => {
                // Obtener el elemento con el id "miElemento"
                const elemento = document.getElementById('detalleSolicitud');

                if (elemento) {
                  // Desplazar hacia el elemento
                  window.scrollTo({
                    top: 450,
                    behavior: 'smooth'
                  });
                }
              }, 0);

              this.toastr.success('SEGUIMIENTO A TRÁMITES', 'Solicitud Encontrada..!');

              // Mostrar loader
              this.loader = false;

              // Muestra toda la informacion solicitada
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
                footer: 'Sistema de Seguimiento a Trámites'
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

    }

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


  /**
   * limpiarConsulta
   */
  public limpiarConsulta(formDirective: FormGroupDirective) {


    // Regresar al inicio
    window.scroll({
      top: 0,
      // left: 100,
      behavior: 'smooth' // regresa suavemente arriba
    });

    // Muestra toda la informacion solicitada
    this.mostrarSeguimiento = false;

    // Restablecer el formulario
    formDirective.resetForm();
    this.formulario.reset();

    // Destruir instancias anteriores de los teclados virtuales
    this.keyboardCorrespondencia?.destroy();
    this.keyboardCarnet?.destroy();

    this.nro_correspondencia = '';
    this.nro_carnet = '';

    // Crear nuevas instancias de los teclados virtuales
    this.keyboardCorrespondencia = new Keyboard({
      onChange: input => this.onChangeCorrespondencia(input),
      onKeyPress: button => this.onKeyPressCorrespondencia(button),
      display: {
        '{bksp}': 'borrar',
        '{enter}': '< enter',
        '@': 'at',
        '{space}': 'espacio',
        '{shift}': 'shift',
        '{tab}': 'tab',
        '{lock}': 'lock'
      },
    });

    // Enfocar el campo correspondencia al inicio
    document.getElementById('correspondenciaId')?.focus();

  }

  ngAfterViewInit() {

    // Crear solo el teclado de correspondencia al inicio
    this.keyboardCorrespondencia = new Keyboard({
      onChange: input => this.onChangeCorrespondencia(input),
      onKeyPress: button => this.onKeyPressCorrespondencia(button),
      display: {
        '{bksp}': 'borrar',
        '{enter}': '< enter',
        '@': 'at',
        '{space}': 'espacio',
        '{shift}': 'shift',
        '{tab}': 'tab',
        '{lock}': 'lock'
      },
    });

    // Destruir la instancia del teclado de carnet si ya existe
    this.keyboardCarnet?.destroy();
  }

  onChangeCorrespondencia = (input: string) => {
    this.correspondenciaValue = input;
    this.nro_correspondencia = input;
    console.log("Input changed for Correspondencia", input);
  };

  onKeyPressCorrespondencia = (button: string) => {
    console.log("Button pressed for Correspondencia", button);
    if (button === "{shift}" || button === "{lock}") this.handleShiftCorrespondencia();
  };

  onChangeCarnet = (input: string) => {
    this.carnetValue = input;
    this.nro_carnet = input;
    console.log("Input changed for Carnet", input);
  };

  onKeyPressCarnet = (button: string) => {
    console.log("Button pressed for Carnet", button);
    // Handle shift and other keypress events as needed
    if (button === "{shift}" || button === "{lock}") this.handleShiftCarnet();
  };

  public onInputChangeNroCorrespondencia = (event: any) => {
    console.log('Hola_1');
    this.keyboardCorrespondencia!.setInput(event.target.value);
  };

  public onInputChangeCarnet = (event: any) => {
    console.log('Hola_2');
    // this.keyboardCarnet!.setInput(event.target.value);
  };

  handleShiftCorrespondencia = () => {
    let currentLayout = this.keyboardCorrespondencia!.options.layoutName;
    let shiftToggle = currentLayout === "default" ? "shift" : "default";

    this.keyboardCorrespondencia!.setOptions({
      layoutName: shiftToggle
    });
  };

  handleShiftCarnet = () => {
    let currentLayout = this.keyboardCarnet!.options.layoutName;
    let shiftToggle = currentLayout === "default" ? "shift" : "default";

    this.keyboardCarnet!.setOptions({
      layoutName: shiftToggle
    });
  };

  // Evento carnet
  onClickCorrespondencia(event: any) {

    // Destruir la instancia del teclado de carnet si ya existe
    this.keyboardCarnet?.destroy();
    this.keyboardCorrespondencia?.destroy();

    // Crear solo el teclado de correspondencia al inicio
    this.keyboardCorrespondencia = new Keyboard({
      onChange: input => this.onChangeCorrespondencia(input),
      onKeyPress: button => this.onKeyPressCorrespondencia(button),
      display: {
        '{bksp}': 'borrar',
        '{enter}': '< enter',
        '@': 'at',
        '{space}': 'espacio',
        '{shift}': 'shift',
        '{tab}': 'tab',
        '{lock}': 'lock'
      },
    });
    this.keyboardCorrespondencia!.setInput(event.target.value);
  }


  // Evento carnet
  onClickCarnet(event: any) {

    // Destruir la instancia del teclado de carnet si ya existe
    this.keyboardCorrespondencia?.destroy();
    this.keyboardCarnet?.destroy();

    // Crear solo el teclado de correspondencia al inicio
    this.keyboardCarnet = new Keyboard({
      onChange: input => this.onChangeCarnet(input),
      onKeyPress: button => this.onKeyPressCarnet(button),
      display: {
        '{bksp}': 'borrar',
        '{enter}': '< enter',
        '@': 'at',
        '{space}': 'espacio',
        '{shift}': 'shift',
        '{tab}': 'tab',
        '{lock}': 'lock'
      },
    });
    this.keyboardCarnet!.setInput(event.target.value);
  }



}
