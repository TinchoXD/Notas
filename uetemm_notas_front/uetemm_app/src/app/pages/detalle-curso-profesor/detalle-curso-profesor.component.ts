import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-curso-profesor',
  templateUrl: './detalle-curso-profesor.component.html',
  styleUrl: './detalle-curso-profesor.component.css'
})
export class DetalleCursoProfesorComponent implements OnInit {
  
  id!: number;
  codigo!: string;

  cursoProfesor_id: any

  constructor(
    private activatedRoute: ActivatedRoute,
    private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    /*
    METODO ALTERNATIVO PARA LA NAVEGACION POR PARÁMETROS EN LA URL
    this.route.queryParamMap.subscribe(params => {
      this.id = +params.get('id')!;
      this.codigo = params.get('codigo')!;
    }); */

    this.activatedRoute.params.subscribe((params) => {
      this.cursoProfesor_id = +params['id']; // El signo '+' convierte el string a número
    });
  }
}
