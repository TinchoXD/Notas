import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EstudianteService } from '../../../services/estudiante/estudiante.service';
import { CursoProfesorService } from '../../../services/cursoProfesor/curso-profesor.service';
import { UserService } from '../../../services/user/user.service';
import { NotaService } from '../../../services/nota/nota.service';
import { Observable } from 'rxjs';
import { AlertService } from '../../../services/alert/alert.service';
import { MessageService } from 'primeng/api';

import * as XLSX from 'xlsx';
//import * as FileSaver from 'file-saver';
import FileSaver, { FileSaverOptions } from 'file-saver';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { style } from '@angular/animations';
import { CalificacionService } from '../../../services/calificacion/calificacion.service';
// Necesario para pdfmake
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-detalle-curso-profesor',
  templateUrl: './detalle-curso-profesor.component.html',
  styleUrl: './detalle-curso-profesor.component.css',
})
export class DetalleCursoProfesorComponent implements OnInit {
  loading: boolean = true;

  id!: number;
  codigo!: string;

  cursoProfesor_id: any;
  cursoProfesor: any;
  cursosProfesor: any[] = [];

  notaT1: any;
  notaT2: any;
  notaT3: any;

  notas: any[] = [];

  user: any;

  estudiante: any;
  estudiantes: any[] = [];

  estudianteNotas: any[] = [];

  cursoEstudianteNota: any[] = [];

  notaEstudiante: any[] = [];

  cupr_id: any;
  notaColor: string = '#aaaaaa55';

  constructor(
    private activatedRoute: ActivatedRoute,
    private route: ActivatedRoute,
    private userService: UserService,
    private cursoProfesorService: CursoProfesorService,
    private estudianteService: EstudianteService,
    private notaService: NotaService,
    private messageServicePNG: MessageService,
    private calificacionService: CalificacionService,
  ) {}

  ngOnInit(): void {
    /*
    METODO ALTERNATIVO PARA LA NAVEGACION POR PARÁMETROS EN LA URL
    this.route.queryParamMap.subscribe(params => {
      this.id = +params.get('id')!;
      this.codigo = params.get('codigo')!;
    }); */

    this.activatedRoute.params.subscribe((params) => {
      this.cursoProfesor_id = +params['id']; // El signo '+' convierte el string a número

      this.cursoProfesorService
        .getCursoProfesorById(this.cursoProfesor_id)
        .subscribe({
          next: (data) => {
            this.cursoProfesor = data;
            this.cursosProfesor.push(this.cursoProfesor);

            console.log('aaaa', this.cursoProfesor);
            this.cupr_id = this.cursoProfesor.id;

            this.estudianteService
              .getEstudiantesByCursoId(this.cursoProfesor.curso.id)
              .subscribe({
                next: (estudiantes) => {
                  this.estudiantes = estudiantes;
                  console.log('bbbb', this.estudiantes);

                  this.estudiantes.forEach((estudiante) => {
                    this.notaService
                      .getNotaByEstudianteAndCursoProfesor(
                        estudiante.id,
                        this.cupr_id
                      )
                      .subscribe({
                        next: (notaEstudiante) => {
                          this.notaEstudiante.push(notaEstudiante);
                          this.estudiantes.forEach((estu) => {
                            estu.notaT1 = this.notaEstudiante.find(
                              (nota) =>
                                nota?.estudiante.id === estu.id &&
                                nota.cursoProfesor.id === this.cursoProfesor_id
                            )?.calificacionT1;
                            estu.notaT2 = this.notaEstudiante.find(
                              (nota) =>
                                nota?.estudiante.id === estu.id &&
                                nota.cursoProfesor.id === this.cursoProfesor_id
                            )?.calificacionT2;
                            estu.notaT3 = this.notaEstudiante.find(
                              (nota) =>
                                nota?.estudiante.id === estu.id &&
                                nota.cursoProfesor.id === this.cursoProfesor_id
                            )?.calificacionT3;
                            estu.notaSupletorio = this.notaEstudiante.find(
                              (nota) =>
                                nota?.estudiante.id === estu.id &&
                                nota.cursoProfesor.id === this.cursoProfesor_id
                            )?.calificacionSupletorio;
                            estu.notaFinal =
                              (estu.notaT1 + estu.notaT2 + estu.notaT3) / 3
                                ? (estu.notaT1 + estu.notaT2 + estu.notaT3) / 3
                                : 0.0;
                          });
                        },
                      });
                  });
                  console.log('ccc', this.notaEstudiante);
                },
              });
          },
        });

      /* 
        



        private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }
        
        */

      /*       this.notaService.getNotasByEstudianteAndCursoProfesor(
        this.estudiante,
        this.cursoProfesor_id
      ); */
    });

    this.loading = false;
  }

  guardarNota(notaEstudiante: any) {
    const nota = {
      estu_id: notaEstudiante.id,
      cupr_id: this.cursoProfesor_id,
      notaT1: notaEstudiante.notaT1,
      notaT2: notaEstudiante.notaT2,
      notaT3: notaEstudiante.notaT3,
      notaSupletorio: notaEstudiante.notaSupletorio,
    };
    console.log('AAA', nota);
    this.notaService.saveNota(nota).subscribe({
      next: (res) => {
        this.messageServicePNG.add({
          severity: 'success',
          summary: 'OK',
          detail: 'Nota guardada',
        });
      },
    });
  }

  convertirCulitativo(nota: number): string {
    return this.calificacionService.convertirCualitativo(nota)
  }

  getNotaColorBackground(nota: number): string {
    return this.calificacionService.getNotaColorBackground(nota)
  }

  getNotaColorText(nota: number): string {
   return this.calificacionService.getNotaColorText(nota)
  }
  
  redondear(nota: number): number {
    return this.calificacionService.redondear(nota)
  }
  
  redondearNotaFinal(t1: number, t2: number, t3: number): number {
   return this.calificacionService.redondearNotaFinal(t1,t2,t3)
  }
  


  changePage(notaEstudiante: any) {
    this.guardarNota(notaEstudiante);
    notaEstudiante.notaFinal =
      (notaEstudiante.notaT1 + notaEstudiante.notaT2 + notaEstudiante.notaT3) /
      3;
  }

  // Método para exportar a Excel
  exportExcel() {
    // Mapea los datos de los estudiantes para incluir solo los campos necesarios
    const filteredData = this.estudiantes.map((estudiante) => ({
      apellidosNombres: estudiante.apellidosNombres,
      cedula: estudiante.cedula,
      notaT1: estudiante.notaT1,
      notaT2: estudiante.notaT2,
      notaT3: estudiante.notaT3,
      notaFinal: estudiante.notaFinal
        ? estudiante.notaFinal.toFixed(2).replace('.', ',')
        : '',
      //      notaFinal: estudiante.notaFinal !== undefined ? estudiante.notaFinal.toFixed(2) : '',
      notaSupletorio: estudiante.notaSupletorio,
    }));

    // Crea una hoja de Excel a partir de los datos filtrados
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = {
      Sheets: { Estudiantes: worksheet },
      SheetNames: ['Estudiantes'],
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    // Guarda el archivo Excel
    this.saveAsExcelFile(excelBuffer, 'estudiantes');
  }

  // Método para guardar el archivo Excel
  saveAsExcelFile(buffer: any, fileName: string): void {
    const EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(
      data,
      fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
    );
  }

  // Método para exportar a PDF
  exportPDF() {
    // Mapea los datos de los estudiantes para incluir solo los campos necesarios
    const filteredData = this.estudiantes.map((estudiante) => ({
      ApellidosYNombres: estudiante.apellidosNombres || '-',
      Cedula: estudiante.cedula || '-',
      NotaT1: estudiante.notaT1 !== undefined ? estudiante.notaT1 : '-',
      NotaT2: estudiante.notaT2 !== undefined ? estudiante.notaT2 : '-',
      NotaT3: estudiante.notaT3 !== undefined ? estudiante.notaT3 : '-',
      NotaSupletorio:
        estudiante.notaSupletorio !== undefined
          ? estudiante.notaSupletorio
          : '-',
      NotaFinal:
        estudiante.notaFinal !== undefined ? estudiante.notaFinal : '-',
    }));

    // Define el contenido del PDF
    const documentDefinition = {
      content: [
        {
          text:
            'Notas de ' +
            this.cursoProfesor.asignatura.nombre +
            ' del curso ' +
            this.cursoProfesor.curso.nivel.nombre +
            ' ' +
            this.cursoProfesor.curso.subnivel.nombre +
            ' ' +
            this.cursoProfesor.curso.grado.nombre +
            ' ' +
            this.cursoProfesor.curso.paralelo.nombre +
            ' ' +
            this.cursoProfesor.curso.jornada.nombre +
            ' (' +
            this.cursoProfesor.curso.codigo +
            ')',
          style: 'header',
        },
        {
          text:
            'Docente: ' +
            this.cursoProfesor.user.firstname +
            ' ' +
            this.cursoProfesor.user.lastname,
          style: 'header',
        },
        {
          table: {
            headerRows: 1,
            widths: [20, 180, 60, 25, 25, 25, 25, 40, 40], // Anchos de las columnas en píxeles
            body: [
              [
                'No.',
                'Apellidos y Nombres',
                'Cédula',
                'Nota T1',
                'Nota T2',
                'Nota T3',
                'Nota Final',
                'Supletorio',
              ],
              ...filteredData.map((estudiante, index) =>
                [
                  (index + 1).toFixed(0),
                  estudiante.ApellidosYNombres,
                  estudiante.Cedula,
                  estudiante.NotaT1,
                  estudiante.NotaT2,
                  estudiante.NotaT3,
                  ((estudiante.NotaT1 || 0) +
                    (estudiante.NotaT2 || 0) +
                    (estudiante.NotaT3 || 0)) /
                  3
                    ? ((estudiante.NotaT1 || 0) +
                        (estudiante.NotaT2 || 0) +
                        (estudiante.NotaT3 || 0)) /
                      3
                    : '-',
                  estudiante.NotaSupletorio,
                ].map((cell) =>
                  typeof cell === 'number' ? cell.toFixed(2) : cell
                )
              ),
            ],
          },
          layout: 'lightHorizontalLines', // Puedes ajustar el diseño de la tabla aquí
        },
      ],
      styles: {
        header: {
          fontSize: 10, // Tamaño de fuente para el encabezado
          bold: true,
          margin: [0, 0, 0, 10] as [number, number, number, number], // Ajustado a 4 números
        },
        tableHeader: {
          fontSize: 18, // Tamaño de fuente para los encabezados de la tabla
          bold: true,
        },
        tableCell: {
          fontSize: 8, // Tamaño de fuente para las celdas de la tabla
        },
      },
      defaultStyle: {
        fontSize: 8, // Tamaño de fuente por defecto
      },
    };

    // Genera y guarda el archivo PDF
    pdfMake
      .createPdf(documentDefinition)
      .download(`estudiantes_export_${new Date().getTime()}.pdf`);
  }

  
}
