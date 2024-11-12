import { Inject, Injectable } from '@angular/core';
import { LoginService } from '../auth/login.service';
import { EstudianteService } from '../estudiante/estudiante.service';
import { ActivatedRoute } from '@angular/router';
import { NotaService } from '../nota/nota.service';
import { CalificacionService } from '../calificacion/calificacion.service';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root',
})
export class ExportarNotasIndividualPdfService {
  constructor(
    private notaService: NotaService,
    private calificacionService: CalificacionService
  ) {}

  estudiante: any;

  async exportarPDF(
    notas: any[],
    notasGenerales: any[],
    notaAnimacionLectura: any,
    notaAcompaniamientoIntegralAula: any,
    notaComportamiento: any,
    estudiante: any
  ): Promise<void> {
    this.estudiante = estudiante;

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

    notasGenerales.forEach((nota) => {
      const promedioTrimestral = this.redondear(
        (nota.calificacionT1 + nota.calificacionT2 + nota.calificacionT3) / 3
      );

      contenidoTabla.push([
        { text: nota.cursoProfesor.asignatura.nombre },
        {
          text:
            nota.calificacionT1 +
            ' - ' +
            this.convertirCulitativo(nota.calificacionT1),
        },
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
        text: this.convertirCulitativo(notaAnimacionLectura?.calificacionT1),
        colSpan: 1,
        style: 'tableBody',
        rowSpan: undefined,
      },
      {
        text: this.convertirCulitativo(notaAnimacionLectura?.calificacionT2),
        colSpan: 1,
        style: 'tableBody',
        rowSpan: undefined,
      },
      {
        text: this.convertirCulitativo(notaAnimacionLectura?.calificacionT3),
        colSpan: 1,
        style: 'tableBody',
        rowSpan: undefined,
      },
      {
        text: this.convertirCulitativo(
          (notaAnimacionLectura?.calificacionT1 +
            notaAnimacionLectura?.calificacionT2 +
            notaAnimacionLectura?.calificacionT3) /
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
          notaAcompaniamientoIntegralAula?.calificacionT1
        ),
        colSpan: 1,
        style: 'tableBody',
        rowSpan: undefined,
      },
      {
        text: this.convertirCulitativo(
          notaAcompaniamientoIntegralAula?.calificacionT2
        ),
        colSpan: 1,
        style: 'tableBody',
        rowSpan: undefined,
      },
      {
        text: this.convertirCulitativo(
          notaAcompaniamientoIntegralAula?.calificacionT3
        ),
        colSpan: 1,
        style: 'tableBody',
        rowSpan: undefined,
      },
      {
        text: this.convertirCulitativo(
          (notaAcompaniamientoIntegralAula?.calificacionT1 +
            notaAcompaniamientoIntegralAula?.calificacionT2 +
            notaAcompaniamientoIntegralAula?.calificacionT3) /
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
        text: this.convertirCualitativoComportamiento(
          notaComportamiento?.calificacionT1
        ),
        colSpan: 1,
        style: 'tableBody',
        rowSpan: undefined,
      },
      {
        text: this.convertirCualitativoComportamiento(
          notaComportamiento?.calificacionT2
        ),
        colSpan: 1,
        style: 'tableBody',
        rowSpan: undefined,
      },
      {
        text: this.convertirCualitativoComportamiento(
          notaComportamiento?.calificacionT3
        ),
        colSpan: 1,
        style: 'tableBody',
        rowSpan: undefined,
      },
      {
        text:
          'PROMEDIO FINAL: ' +
          this.convertirCualitativoComportamiento(
            (notaComportamiento?.calificacionT1 +
              notaComportamiento?.calificacionT2 +
              notaComportamiento?.calificacionT3) /
              3
          ),
        colSpan: 1,
        style: 'tableBody',
        rowSpan: undefined,
      },
    ]);

    const fechaActual = new Date();
    const opciones: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };
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
          text: `JORNADA: ${estudiante?.curso.jornada.nombre} - GRADO : ${estudiante?.curso.grado.nombre} DE ${estudiante?.curso.nivel.nombre} - PARALELO: ${estudiante?.curso.paralelo.nombre}`.toUpperCase(),
          style: 'subheader',
        },
        {
          text: `NOMBRE DEL ESTUDIANTE: ${estudiante?.apellidosNombres}`.toUpperCase(),
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
              text: `_________________________________\n${
                estudiante.curso.user?.firstname === undefined
                  ? '---'
                  : estudiante.curso.user?.firstname
              } ${estudiante.curso.user?.lastname === undefined
                ? '---' 
                : estudiante.curso.user?.lastname
              } \n Tutor(a)`,
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

  calcularPromedioAnual(): Promise<number> {
    return new Promise((resolve, reject) => {
      this.notaService.getNotasByEstudiante(this.estudiante.id).subscribe({
        next: (notasGenerales) => {
          notasGenerales = notasGenerales;

          const totalNotas = notasGenerales.length;

          const sumaPromedios = notasGenerales.reduce(
            (
              suma: number,
              nota: {
                calificacionT1: any;
                calificacionT2: any;
                calificacionT3: any;
              }
            ) => {
              const promedioFinal = this.redondear(
                (nota.calificacionT1 +
                  nota.calificacionT2 +
                  nota.calificacionT3) /
                  3
              );
              return suma + promedioFinal;
            },
            0
          );

          const promedioAnual = totalNotas ? sumaPromedios / totalNotas : 0;
          resolve(promedioAnual);
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }
}
