
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public contador: number = 0;

  constructor() {

    // const paralax = localStorage.getItem('parallax');
    // console.log(paralax);

    // if (paralax) {
    //   this.contador = 1;
    // } else {
    //   localStorage.setItem('parallax', '0')
    // }

  }

  ngOnInit(): void {

    // Regresar al inicio
    window.scroll({
      top: 0,
      // left: 100,
      behavior: 'auto'
    });

  }



}
