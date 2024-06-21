import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrl: './editar-usuario.component.css'
})
export class EditarUsuarioComponent implements OnInit {

  userId?: number;
  constructor(private activatedRoute: ActivatedRoute) {



  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.userId = +params['id']; // El signo '+' convierte el string a número
      console.log(this.userId);
    });
  }

  /*   ngOnInit(): void {
      // Obtiene el ID del usuario de los parámetros de la ruta
      this.userId = +this.activatedRoute.snapshot.paramMap.get('id');
    } */

}
