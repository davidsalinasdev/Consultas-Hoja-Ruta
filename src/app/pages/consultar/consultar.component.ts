import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css']
})
export class ConsultarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // Regresar al inicio
    window.scroll({
      top: 0,
      // left: 100,
      behavior: 'auto'
    });
  }

}
