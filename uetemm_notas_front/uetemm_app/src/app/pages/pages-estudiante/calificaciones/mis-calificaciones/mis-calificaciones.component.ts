import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { LoginService } from '../../../../services/auth/login.service';
import { LoginRequest } from '../../../../services/auth/loginRequest';
import Swal from 'sweetalert2';
import { EstudianteService } from '../../../../services/estudiante/estudiante.service';
import { Codec } from '../../../../services/codec/codec';
import { NotaService } from '../../../../services/nota/nota.service';
import { CalificacionService } from '../../../../services/calificacion/calificacion.service';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { style } from '@angular/animations';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-mis-calificaciones',
  templateUrl: './mis-calificaciones.component.html',
  styleUrl: './mis-calificaciones.component.css',
})
export class MisCalificacionesComponent implements OnInit {
  estudiante!: any;
  notas: any[] = [];
  notasGenerales: any[] = [];
  notaAnimacionLectura: any;
  notaAcompaniamientoIntegralAula: any;
  notaComportamiento: any;
  codec: Codec;
  cedulaCodificada: any;

  constructor(
    private loginService: LoginService,
    private estudianteService: EstudianteService,
    private activatedRoute: ActivatedRoute,
    private notaService: NotaService,
    private calificacionService: CalificacionService
  ) {
    this.codec = new Codec();
  }
  async ngOnInit(): Promise<void> {
    this.activatedRoute.params.subscribe((params) => {
      this.cedulaCodificada = +params['cedulaCodificada']; // El signo '+' convierte el string a número

      this.estudianteService
        .getEstudianteByCedula(
          this.codec.decode(this.cedulaCodificada.toString())
        )
        .subscribe({
          next: (estudiante) => {
            if (estudiante) {
              this.estudiante = estudiante;
              console.log('this.estudiante', this.estudiante);
              this.notaService
                .getNotasByEstudiante(this.estudiante.id)
                .subscribe({
                  next: (notas) => {
                    this.notaService
                      .getNotasByEstudiante(this.estudiante.id)
                      .subscribe({
                        next: (notasGenerales) => {
                          this.notasGenerales = notasGenerales;
                        },
                      });

                    this.notas = notas;

                    console.log('estudiante.id', estudiante.id);
                    console.log('estudiante.curs_id', estudiante.curso.id);
                    this.notaService
                      .getNotaAnimacionLecturaByEstudianteIdAndCursoId(
                        estudiante.id,
                        estudiante.curso.id
                      )
                      .subscribe({
                        next: (notaAnimacionLectura) => {
                          if (notaAnimacionLectura) {
                            this.notaAnimacionLectura = notaAnimacionLectura;
                            const cursoProfesor = {
                              asignatura: {
                                nombre: 'Animación a la Lectura',
                              },
                              user: {
                                firstname: estudiante.curso.user.firstname,
                                lastname: estudiante.curso.user.lastname,
                              },
                            };
                            notaAnimacionLectura = {
                              ...notaAnimacionLectura,
                              cursoProfesor,
                            };

                            // Agregar notaAnimacionLectura y cursoProfesor a this.notas
                            this.notas = [
                              ...this.notas,
                              notaAnimacionLectura, // Agrega cursoProfesor como objeto
                            ];
                          }
                        },
                      });

                    this.notaService
                      .getNotaAcompaniamientoIntegralAulaByEstudianteIdAndCursoId(
                        estudiante.id,
                        estudiante.curso.id
                      )
                      .subscribe({
                        next: (notaAcompaniamientoAula) => {
                          if (notaAcompaniamientoAula) {
                            this.notaAcompaniamientoIntegralAula =
                              notaAcompaniamientoAula;
                            const cursoProfesor = {
                              asignatura: {
                                nombre: 'Acompañamiento Integral en el Aula',
                              },
                              user: {
                                firstname: estudiante.curso.user.firstname,
                                lastname: estudiante.curso.user.lastname,
                              },
                            };
                            notaAcompaniamientoAula = {
                              ...notaAcompaniamientoAula,
                              cursoProfesor,
                            };

                            // Agregar notaAcompaniamientoAula y cursoProfesor a this.notas
                            this.notas = [
                              ...this.notas,
                              notaAcompaniamientoAula, // Agrega cursoProfesor como objeto
                            ];
                          }
                        },
                      });

                    this.notaService
                      .getNotaComportamientoByEstudianteIdAndCursoId(
                        estudiante.id,
                        estudiante.curso.id
                      )
                      .subscribe({
                        next: (notaComportamiento) => {
                          if (notaComportamiento) {
                            this.notaComportamiento = notaComportamiento;
                            const cursoProfesor = {
                              asignatura: {
                                nombre: 'Comportamiento',
                              },
                              user: {
                                firstname: estudiante.curso.user.firstname,
                                lastname: estudiante.curso.user.lastname,
                              },
                            };
                            notaComportamiento = {
                              ...notaComportamiento,
                              cursoProfesor,
                            };

                            // Agregar notaComportamiento y cursoProfesor a this.notas
                            this.notas = [
                              ...this.notas,
                              notaComportamiento, // Agrega cursoProfesor como objeto
                            ];
                          }
                        },
                      });
                  },
                });
            }
          },
        });
    });
  }

  convertirCulitativo(nota: number): string {
    return this.calificacionService.convertirCualitativo(nota);
  }

  getNotaColorBackground(nota: number): string {
    return this.calificacionService.getNotaColorBackground(nota);
  }

  getNotaColorText(nota: number): string {
    return this.calificacionService.getNotaColorText(nota);
  }

  redondear(nota: number): number {
    return this.calificacionService.redondear(nota);
  }

  estado(estudiante: any, notaFinal: number) {
    // console.log(estudiante.estado)
    if (estudiante.estado === 0) {
      return 'Retirado';
    }

    if (notaFinal >= 7) {
      return 'Aprobado';
    } else if (notaFinal > 0) {
      return 'Reprobado';
    }
    return '-';
  }

  estadoColorBackground(estudiante: any, notaFinal: number) {
    if (estudiante.estado === 0) {
      return '#e9ecef';
    }

    if (notaFinal >= 7) {
      return '#d4edda';
    } else if (notaFinal > 0) {
      return '#f8d7da';
    }
    return '';
  }

  estadoColorText(estudiante: any, notaFinal: number) {
    if (estudiante.estado === 0) {
      return '#6c757d';
    }

    if (notaFinal >= 7) {
      return '#155724';
    } else if (notaFinal > 0) {
      return '#721c24';
    }
    return '#6c757d';
  }

  async exportarPDF(): Promise<void> {
    const contenidoTabla = [
      [
        { text: 'ASIGNATURAS', rowSpan: 2, style: 'tableHeader' },
        { text: 'TRIMESTRES', colSpan: 3, style: 'tableHeader' },
        {}, // Celda vacía para la segunda columna combinada
        {}, // Celda vacía para la tercera columna combinada
        { text: 'PROMEDIO FINAL', rowSpan: 2, style: 'tableHeader' },
      ],
      [
        {}, // Celda vacía debajo de "ASIGNATURAS"
        { text: 'I', style: 'tableHeaderCenter' },
        { text: 'II', style: 'tableHeaderCenter' },
        { text: 'III', style: 'tableHeaderCenter' },
        {}, // Celda vacía debajo de "PROMEDIO FINAL"
      ],
    ];

    this.notasGenerales.forEach((nota) => {
      const promedioTrimestral = this.redondear(
        (nota.calificacionT1 + nota.calificacionT2 + nota.calificacionT3) / 3
      );

      contenidoTabla.push([
        { text: nota.cursoProfesor.asignatura.nombre },
        { text: this.convertirCulitativo(nota.calificacionT1) },
        { text: this.convertirCulitativo(nota.calificacionT2) },
        { text: this.convertirCulitativo(nota.calificacionT3) },
        { text: this.convertirCulitativo(promedioTrimestral) },
      ]);
    });

    // Añadir una fila final con dos columnas
    contenidoTabla.push([
      {
        text: 'TOTAL ANUAL',
        colSpan: 4,
        style: 'finalRow',
        rowSpan: undefined,
      },
      {},
      {},
      {}, // Celdas vacías combinadas
      {
        text: this.convertirCulitativo(await this.calcularPromedioAnual()),
        colSpan: 1,
        style: 'tableBody',
      },
    ]);

    // Añadir fila - ANIMACION A LA LECTURA
    contenidoTabla.push([
      {
        text: 'Animación a la Lectura',
        colSpan: 1,
        style: '',
        rowSpan: undefined,
      },
      {
        text: this.convertirCulitativo(
          this.notaAnimacionLectura.calificacionT1
        ),
        colSpan: 1,
        style: 'tableBody',
        rowSpan: undefined,
      },
      {
        text: this.convertirCulitativo(
          this.notaAnimacionLectura.calificacionT2
        ),
        colSpan: 1,
        style: 'tableBody',
        rowSpan: undefined,
      },
      {
        text: this.convertirCulitativo(
          this.notaAnimacionLectura.calificacionT3
        ),
        colSpan: 1,
        style: 'tableBody',
        rowSpan: undefined,
      },
      {
        text: this.convertirCulitativo(
          (this.notaAnimacionLectura.calificacionT1 +
            this.notaAnimacionLectura.calificacionT2 +
            this.notaAnimacionLectura.calificacionT3) /
            3
        ),
        colSpan: 1,
        style: 'tableBody',
        rowSpan: undefined,
      },
    ]);

    // Añadir fila - ACOMPAÑAMIENTO INTEGRAL EN EL AULA
    contenidoTabla.push([
      {
        text: 'Acompañamiento Integral en el Aula',
        colSpan: 1,
        style: '',
        rowSpan: undefined,
      },
      {
        text: this.convertirCulitativo(
          this.notaAcompaniamientoIntegralAula.calificacionT1
        ),
        colSpan: 1,
        style: 'tableBody',
        rowSpan: undefined,
      },
      {
        text: this.convertirCulitativo(
          this.notaAcompaniamientoIntegralAula.calificacionT2
        ),
        colSpan: 1,
        style: 'tableBody',
        rowSpan: undefined,
      },
      {
        text: this.convertirCulitativo(
          this.notaAcompaniamientoIntegralAula.calificacionT3
        ),
        colSpan: 1,
        style: 'tableBody',
        rowSpan: undefined,
      },
      {
        text: this.convertirCulitativo(
          (this.notaAcompaniamientoIntegralAula.calificacionT1 +
            this.notaAcompaniamientoIntegralAula.calificacionT2 +
            this.notaAcompaniamientoIntegralAula.calificacionT3) /
            3
        ),
        colSpan: 1,
        style: 'tableBody',
        rowSpan: undefined,
      },
    ]);

    // Añadir fila - Vacia
    contenidoTabla.push([
      { text: '', colSpan: 5, style: 'leyenda', rowSpan: undefined },
      {},
      {},
      {},
      {},
    ]);

    // Añadir fila - Comportamiento
    contenidoTabla.push([
      {
        text: 'Comportamiento',
        colSpan: 1,
        style: '',
        rowSpan: undefined,
      },
      {
        text: this.convertirCualitativoComportamiento(this.notaComportamiento.calificacionT1),
        colSpan: 1,
        style: 'tableBody',
        rowSpan: undefined,
      },
      {
        text: this.convertirCualitativoComportamiento(this.notaComportamiento.calificacionT2),
        colSpan: 1,
        style: 'tableBody',
        rowSpan: undefined,
      },
      {
        text: this.convertirCualitativoComportamiento(this.notaComportamiento.calificacionT3),
        colSpan: 1,
        style: 'tableBody',
        rowSpan: undefined,
      },
      {
        text: 'PROMEDIO FINAL: '+this.convertirCualitativoComportamiento(
          (this.notaComportamiento.calificacionT1 +
            this.notaComportamiento.calificacionT2 +
            this.notaComportamiento.calificacionT3) /
            3
        ),
        colSpan: 1,
        style: 'tableBody',
        rowSpan: undefined,
      },
    ]);


    const fechaActual = new Date();
    const opciones: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    const fechaFormateada = fechaActual.toLocaleDateString('es-ES', opciones);

    const docDefinition: any = {
      content: [
        { text: 'UNIDAD EDUCATIVA MITAD DEL MUNDO', style: 'header' },
        { text: 'CÓDIGO AMIE: 17H02050', style: 'header' },
        {
          text: 'AÑO LECTIVO : SIERRA - AMAZONÍA : 2023 - 2024',
          style: 'header',
        },
        {
          text: `JORNADA: ${this.estudiante?.curso.jornada.nombre} - GRADO : ${this.estudiante?.curso.grado.nombre} DE ${this.estudiante?.curso.nivel.nombre} - PARALELO: ${this.estudiante?.curso.paralelo.nombre}`.toUpperCase(),
          style: 'subheader',
        },
        {
          text: `NOMBRE DEL ESTUDIANTE: ${this.estudiante?.apellidosNombres}`.toUpperCase(),
          margin: [0, 0, 0, 10],
          bold: true,
        },
        {
          table: {
            headerRows: 2,
            widths: [200, '*', '*', '*', 100],
            body: contenidoTabla,
          },
          fontSize: 8,
          alignment: 'center',
        },
        {
          text: `S - SIEMPRE     F - FRECUENTEMENTE     O - OCASIONALMENTE     N - NUNCA`.toUpperCase(),
          style: 'leyenda',
        },
        {
          text: `Dado y firmado en: Quito, Pichincha, el ${fechaFormateada}`,
          style: 'leyendaFecha',
        },
      ],
      styles: {
        header: {
          fontSize: 10,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 10],
        },
        subheader: {
          fontSize: 8,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 10],
        },
        leyenda: {
          fontSize: 8,
          alignment: 'center',
          margin: [0, 8, 0, 0],
        },
        leyendaFecha: {
          fontSize: 8,
          alignment: 'center',
          color: 'gray',
          margin: [0, 4, 0, 0],
        },
        tableHeader: {
          fontSize: 8,
          bold: true,
        },
        tableHeaderCenter: {
          fontSize: 8,
          bold: true,
          alignment: 'center',
        },
        finalRow: {
          bold: true,
          fontSize: 8,
          alignment: 'right',
        },
        tableBody: {
          alignment: 'center',
        },
      },
      defaultStyle: {
        fontSize: 8,
      },
      footer: (currentPage: number, pageCount: number) => {
        return {
          columns: [
            {
              text: `_________________________________\nNOMBRE DEL RECTOR \n Rector(a) / Director(a)`,
              alignment: 'center',
              margin: [80, -50, 0, 0],
              fontSize: 9,
            },
            {
              text: `_________________________________\n${this.estudiante.curso.user.firstname} ${this.estudiante.curso.user.lastname} \n Tutor(a)`,
              alignment: 'center',
              margin: [0, -50, 80, 0],
              fontSize: 9,
            },
          ],
        };
      },
    };
    

    pdfMake.createPdf(docDefinition).download('reporte_calificaciones.pdf');
  }

  calcularPromedioAnual(): Promise<number> {
    return new Promise((resolve, reject) => {
      this.notaService.getNotasByEstudiante(this.estudiante.id).subscribe({
        next: (notasGenerales) => {
          this.notasGenerales = notasGenerales;

          const totalNotas = this.notasGenerales.length;
          console.log(
            'this.notasGenerales.length:',
            this.notasGenerales.length
          );

          const sumaPromedios = this.notasGenerales.reduce((suma, nota) => {
            const promedioFinal = this.redondear(
              (nota.calificacionT1 +
                nota.calificacionT2 +
                nota.calificacionT3) /
                3
            );
            return suma + promedioFinal;
          }, 0);

          const promedioAnual = totalNotas ? sumaPromedios / totalNotas : 0;
          resolve(promedioAnual);
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }

  convertirCualitativoComportamiento(notaComportamiento: number): string {
    return this.calificacionService.convertirCualitativoComportamiento(
      notaComportamiento
    );
  }

  getNotaComportamientoColorBackground(notaComportamiento: number): string {
    return this.calificacionService.getNotaComportamientoColorBackground(
      notaComportamiento
    );
  }

  getNotaComportamientoColorText(notaComportamiento: number): string {
    return this.calificacionService.getNotaComportamientoColorText(
      notaComportamiento
    );
  }
}
