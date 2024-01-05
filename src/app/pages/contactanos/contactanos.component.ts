import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.component.html',
  styleUrls: ['./contactanos.component.css']
})
export class ContactanosComponent implements OnInit {

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
