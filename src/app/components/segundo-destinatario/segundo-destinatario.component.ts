import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

// Servicios
import { DestinatariosService } from './../../services/destinatarios.service';

@Component({
  selector: 'app-segundo-destinatario',
  templateUrl: './segundo-destinatario.component.html',
  styleUrls: ['./segundo-destinatario.component.css']
})
export class SegundoDestinatarioComponent implements OnInit {

  public dataSubcripcion!: Subscription;

  // Para el algoritmo de busqueda
  public listDestinatarios1: any[] = [];

  // Tipo de destinatario
  public tipoDestinatario: number = 0;

  // Posicion Final
  public posicionFinal: number = 0;

  // posicion de la trayectoria
  public posisionTrayectoria: any[] = [];

  // Resultado final del algoritmo
  public newArray: any[] = [];

  // Lista destinatarios
  public listDestinatarios: any = [];

  public p: number = 1;

  // Contador
  public cont: number = 1;

  // Derivar a N destinatarios
  public cantidadDestinatarios: number = 0;
  public cantidadRecepcionistas: any = [];
  public primeraLista: any[] = [];
  public primeraListaNdestinatarios: any[] = [];


  public posicion: number = 0;
  public posicionFinal2: number = 0;

  // Ultima posicion de primera lista
  public primeraListaUltimaPosicion: number = 0;

  // Nuevos parametros
  public viewNdestinos: boolean = false;
  public viewNdestinosPrimero: boolean = false;
  public tipoDestinatarioNivel: number = 0;

  // Inyectanto el servicio DestinatarioService
  constructor(private destinatarioService: DestinatariosService) { }




  ngOnInit(): void {
    this.dataSubcripcion = this.destinatarioService.datosDos$
      .subscribe(({ destinatario, tipoDestinatario, posicionFinal, level }) => {


        // Para el algoritmo de Busqueda

        // console.log(destinatario);
        // console.log(tipoDestinatario);
        // console.log(posicionFinal);
        this.listDestinatarios1 = [];

        this.listDestinatarios1 = destinatario;
        this.tipoDestinatario = tipoDestinatario;
        this.posicionFinal = posicionFinal;


        // Para el algoritmo
        let receptor: number = 0;
        let trayectoria: number = 0;
        this.posisionTrayectoria = [];
        this.newArray = [];
        this.primeraListaNdestinatarios = [];
        // FIN Para el algoritmo

        // Reset
        this.listDestinatarios = [];
        this.primeraLista = [];
        // this.p = 1;
        // FIN Reset

        this.viewNdestinos = false;
        this.viewNdestinosPrimero = false;
        this.tipoDestinatarioNivel = 0;


        // // Algoritmo de Seguimiento
        for (let index = this.posicionFinal; index < this.listDestinatarios1.length; index++) {

          const element = this.listDestinatarios1[index];
          // console.log(element);


          if (index === this.posicionFinal) {
            this.posisionTrayectoria.push(index);
            receptor = element.recepcion[this.tipoDestinatario].destinatario;
            trayectoria = element.recepcion[this.tipoDestinatario].idtrayectoria;
          }

          if (index === this.posicionFinal) {
            if (trayectoria === element.remite.idtrayectoria && receptor === element.remite.destinatario) {
              this.posisionTrayectoria.push(index);
              receptor = element.recepcion[this.tipoDestinatario].destinatario;
              trayectoria = element.recepcion[this.tipoDestinatario].idtrayectoria;
            }
          } else {
            if (trayectoria === element.remite.idtrayectoria && receptor === element.remite.destinatario) {
              this.posisionTrayectoria.push(index);
              receptor = element.recepcion[0].destinatario;
              trayectoria = element.recepcion[0].idtrayectoria;
            }
          }

        }
        this.posisionTrayectoria.forEach((element: any) => {
          this.newArray.push(this.listDestinatarios1[element]);
        });

        // console.log(this.newArray);
        // // FIN Algoritmo de Seguimiento


        // Algoritmo para sacar dos arrays
        if (destinatario != false) {
          this.cantidadDestinatarios = this.newArray[0].recepcion.length;
          this.cantidadRecepcionistas = this.newArray[0].recepcion;

        } else {
          this.cantidadDestinatarios = 0;
        }


        if (destinatario != false) {

          let contador: number = 0;
          let contadorPocicion: number = 0;

          this.listDestinatarios = this.newArray;

          this.primeraLista.push(this.listDestinatarios[0]);

          // Genarar PRIMERA lISTA de destinatarios
          for (let index = 1; index < this.listDestinatarios.length; index++) {

            const element = this.listDestinatarios[index];

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

          }

          if (this.primeraLista.length != 0) {
            this.primeraListaUltimaPosicion = this.primeraLista.length - 1;
          } else {
            this.primeraListaUltimaPosicion = this.primeraLista.length;
          }
          // FIN Genarar PRIMERA LISTA de destinatarios
        } else {
          this.listDestinatarios = false;
        }
        // Fin Algoritmo para sacar dos arrays

        // Para pruebas
        // Buscar el array de la posicion  final
        // console.log(destinatario);

        // console.log(this.newArray[this.posicion]);

        if (this.newArray[this.posicion] != undefined) {
          destinatario.forEach((element: any, index: number) => {
            if (this.newArray[this.posicion].idtrayectoria === element.idtrayectoria) {
              this.posicionFinal = index;
            }
          });
        }

        // FIN Buscar el array de la posicion  final



      });
  }

  /**
  * verDestinatario
  */
  public verDestinatario(destinatarios: number) {



    const datosEmit: any = {
      level: 'dos',
      posicionFinal: this.posicionFinal,
      tipoDestinatario: destinatarios,
      destinatario: this.listDestinatarios1

    }

    // Aqui emitimos datos a los hijos componenetes
    this.destinatarioService.datosTres$.emit(datosEmit);
    this.cont++;
  }

  /**
    * cambioPagina
    */
  public cambioPagina(event: any) {
    // console.log(event);
    this.p = event;
    this.verDestinatario(event - 1);
    this.tipoDestinatarioNivel = event - 1;
  }

  /**
 * cambioPagina
 */
  public cambioPaginaPrimero(event: any) {
    console.log(event);
    this.p = event;
    this.verDestinatario(event - 1);
    this.tipoDestinatarioNivel = event - 1;
  }


  /**
  * verDestinos
  */
  public async verDestinos() {
    this.cont = 0;
    await this.verDestinatario(0);
    this.viewNdestinos = true;
    console.log('Hola destino');
  }

  /**
  * verDestinos
  */
  public async verDestinosPrimero() {
    await this.verDestinatario(0);
    this.viewNdestinosPrimero = true;
    console.log('Hola destinoPrimero');
  }



  // Importante
  // ngOnDestroy(): void {
  //   this.dataSubcripcion.unsubscribe();
  // }
  // Fin Importante

}