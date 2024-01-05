import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acerca',
  templateUrl: './acerca.component.html',
  styleUrls: ['./acerca.component.css']
})
export class AcercaComponent implements OnInit {

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
