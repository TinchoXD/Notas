import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursoService } from '../../../../services/curso/curso.service';
import { Curso } from '../../../../services/curso/curso';
import { EstudianteService } from '../../../../services/estudiante/estudiante.service';
import { CursoProfesorService } from '../../../../services/cursoProfesor/curso-profesor.service';
import { NotaService } from '../../../../services/nota/nota.service';
import { CalificacionService } from '../../../../services/calificacion/calificacion.service';

import * as XLSX from 'xlsx';
//import * as FileSaver from 'file-saver';
import FileSaver, { FileSaverOptions } from 'file-saver';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { animate, style } from '@angular/animations';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { LoginService } from '../../../../services/auth/login.service';
import { MessageService } from 'primeng/api';
import { forkJoin, map, switchMap } from 'rxjs';
// Necesario para pdfmake
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

interface Frecuencia {
  nombre: string;
  value: number;
}

@Component({
  selector: 'app-detalle-curso-tutor',
  templateUrl: './detalle-curso-tutor.component.html',
  styleUrl: './detalle-curso-tutor.component.css',
})
export class DetalleCursoTutorComponent implements OnInit {
  curs_id: number = 0;
  curso!: any;
  cursos: Curso[] = [];

  estudiantes: any[] = [];
  cursosProfesor: any[] = [];

  notaEstudiante: any[] = [];
  userData: any = null;

  aplicaSupletorio!: boolean;
  colSpanSupletorio!: number;

  promedioAnualFrozen: boolean = false;
  nombresApellidoFrozen: boolean = true;

  loading: boolean = true;

  frecuencia: Frecuencia[] = [];

  test!: Frecuencia;

  constructor(
    private activatedRoute: ActivatedRoute,
    private cursoService: CursoService,
    private estudianteService: EstudianteService,
    private cursoProfesorService: CursoProfesorService,
    private notaService: NotaService,
    private loginService: LoginService,
    private calificacionService: CalificacionService,
    private messageServicePNG: MessageService
  ) {}

  ngOnInit(): void {
    this.frecuencia = [
      { nombre: 'S', value: 4 },
      { nombre: 'F', value: 3 },
      { nombre: 'O', value: 2 },
      { nombre: 'N', value: 1 },
    ];
    /* this.frecuencia = [
      { nombre: 'Siempre', value: 4 },
      { nombre: 'Frecuentemente', value: 3 },
      { nombre: 'Ocasionalmente', value: 2 },
      { nombre: 'Nunca', value: 1 },
    ]; */

    this.loginService.userData.subscribe((token) => {
      if (token) {
        // Decodifica el token para obtener la información del usuario
        this.userData = this.loginService.decodeToken(token);
        this.loginService.verificarCambioDeContrasenia(this.userData);
      }
    });

    //***********************************************************************************/
    //************************** CODIGO NO OPTIMIZADO ***********************************/
    //***********************************************************************************/
    /* this.activatedRoute.params.subscribe((params) => {
      this.curs_id = +params['id']; // El signo '+' convierte el string a número
      this.cursoService.getCursoById(this.curs_id).subscribe({
        next: (cursos) => {
          this.curso = cursos;
          console.log('curso', this.curso);
          console.log('this.curso.user', this.curso.user);
          this.cursos.push(this.curso);
          // Obtiene los estudiantes asociados al curso actual
          this.estudianteService.getEstudiantesByCursoId(this.curs_id).subscribe({
            next: (estudiantes) => {
              this.estudiantes = estudiantes ;
              this.estudiantes.forEach(estudiante => {
                estudiante.notaAnimacionLectura = { calificacionT1: 0, calificacionT2: 0, calificacionT3: 0 };
                estudiante.notaAcompaniamientoIntegralAula = { calificacionT1: 0, calificacionT2: 0, calificacionT3: 0 };
                estudiante.notaComportamiento = { calificacionT1: 0, calificacionT2: 0, calificacionT3: 0 };
              });
              console.log('estudiantes', this.estudiantes);
              // Obtiene los profesores del curso
              this.cursoProfesorService.getCursoProfesorByCursoId(this.curs_id).subscribe({
                next: (cursosProfesor) => {
                  this.cursosProfesor = cursosProfesor;
                  console.log('this.cursosProfesor', this.cursosProfesor);
                  // Itera sobre cada estudiante
                  this.estudiantes.forEach((estudiante) => {
                    
                    estudiante.notas = []; // Inicializa el array de notas del estudiante
                    let totalNotas = 0;
                    let numCursos = 0;
                    // Itera sobre cada asignatura del curso
                    this.cursosProfesor.forEach((cursoProfesor, index, array) => {
                      numCursos++;
                      // Obtiene las notas del estudiante para cada cursoProfesor
                      this.notaService
                        .getNotaByEstudianteAndCursoProfesor(estudiante.id, cursoProfesor.id)
                        .subscribe({
                          next: (notas) => {
                            // Añade las notas al array de `notas` del estudiante
                            estudiante.notas.push({
                              cursoProfesorId: cursoProfesor.id,
                              nombreAsignatura: cursoProfesor.nombreAsignatura, // Asignatura del curso
                              notaT1: notas?.calificacionT1 || 0,
                              notaT2: notas?.calificacionT2 || 0,
                              notaT3: notas?.calificacionT3 || 0,
                              supletorio: notas?.calificacionSupletorio || 0,
                            });
                            // Calcula el promedio de la asignatura actual
                            const promedioAsignatura = ((notas?.calificacionT1 || 0) + (notas?.calificacionT2 || 0) + (notas?.calificacionT3 || 0)) / 3;
                            totalNotas += promedioAsignatura; // Suma el promedio de la asignatura
                            // Si ya hemos iterado sobre todas las asignaturas
                            if (index === array.length - 1) {
                              // Calcula el promedio anual
                              estudiante.promedioAnual = totalNotas / numCursos;
                              
                            }
                            // Detén el loading cuando todas las notas han sido procesadas
                            if (this.estudiantes.every(e => e.promedioAnual !== undefined)) {
                              this.loading = false;
                            }
                          },
                        });
                    });
                    this.notaService.getNotaAnimacionLecturaByEstudianteIdAndCursoId(estudiante.id, this.curs_id).subscribe({
                      next: (notaAnimacionLectura) => {
                        estudiante.notaAnimacionLectura = notaAnimacionLectura || { calificacionT1: 0, calificacionT2: 0, calificacionT3: 0 };
                      }
                    });
                    this.notaService.getNotaAcompaniamientoIntegralAulaByEstudianteIdAndCursoId(estudiante.id, this.curs_id).subscribe({
                      next: (notaAcompaniamientoIntegralAula) => {
                        estudiante.notaAcompaniamientoIntegralAula = notaAcompaniamientoIntegralAula || { calificacionT1: 0, calificacionT2: 0, calificacionT3: 0 };
                      }
                    });
                    this.notaService.getNotaComportamientoByEstudianteIdAndCursoId(estudiante.id, this.curs_id).subscribe({
                      next: (notaComportamiento) => {
                        estudiante.notaComportamiento = notaComportamiento || { calificacionT1: 0, calificacionT2: 0, calificacionT3: 0 };
                      }
                    });
                  });
                  
                },
              });
              
            },
          });
        },
      });
    }); */

    //***********************************************************************************/
    //*************************** CODIGO OPTIMIZADO *************************************/
    //***********************************************************************************/
    this.activatedRoute.params
      .pipe(
        switchMap((params) => {
          this.curs_id = +params['id']; // Convierte el parámetro 'id' a número
          return forkJoin([
            this.cursoService.getCursoById(this.curs_id), // Obtiene el curso
            this.estudianteService.getEstudiantesByCursoId(this.curs_id), // Obtiene estudiantes
            this.cursoProfesorService.getCursoProfesorByCursoId(this.curs_id), // Obtiene profesores del curso
          ]);
        })
      )
      .subscribe({
        next: ([curso, estudiantes, cursosProfesor]) => {
          this.curso = curso;

          console.log('CURSO', curso);
          console.log('this.curso', this.curso);

          //Validación de Nivel y Subnivel del Curso
          //************** CONDICION PARA MOSTRAR EL CAMPO DE SUPLETORIO *************/
          if (this.curso.nivel.id === 123 && this.curso.subnivel.id === 99) {
            this.aplicaSupletorio = false;
            this.colSpanSupletorio = 9;
          } else {
            this.aplicaSupletorio = true;
            this.colSpanSupletorio = 10;
          }

          this.estudiantes = estudiantes;
          this.estudiantes.forEach((estudiante) => {
            estudiante.notaAnimacionLectura = {
              calificacionT1: 0,
              calificacionT2: 0,
              calificacionT3: 0,
            };
            estudiante.notaAcompaniamientoIntegralAula = {
              calificacionT1: 0,
              calificacionT2: 0,
              calificacionT3: 0,
            };
            estudiante.notaComportamiento = {
              calificacionT1: 0,
              calificacionT2: 0,
              calificacionT3: 0,
            };
          });
          this.cursosProfesor = cursosProfesor;
          // Procesar notas de todos los estudiantes y cursos en paralelo
          this.loading = true; // Comienza el loading
          const estudianteNotasRequests = this.estudiantes.map((estudiante) => {
            // Combina todas las solicitudes de notas en un solo `forkJoin`
            return forkJoin([
              this.notaService.getNotaAnimacionLecturaByEstudianteIdAndCursoId(
                estudiante.id,
                this.curs_id
              ),
              this.notaService.getNotaAcompaniamientoIntegralAulaByEstudianteIdAndCursoId(
                estudiante.id,
                this.curs_id
              ),
              this.notaService.getNotaComportamientoByEstudianteIdAndCursoId(
                estudiante.id,
                this.curs_id
              ),
              forkJoin(
                this.cursosProfesor.map((cursoProfesor) =>
                  this.notaService
                    .getNotaByEstudianteAndCursoProfesor(
                      estudiante.id,
                      cursoProfesor.id
                    )
                    .pipe(
                      map((notas) => ({
                        cursoProfesorId: cursoProfesor.id,
                        nombreAsignatura: cursoProfesor.nombreAsignatura,
                        notaT1: notas?.calificacionT1 || 0,
                        notaT2: notas?.calificacionT2 || 0,
                        notaT3: notas?.calificacionT3 || 0,
                        supletorio: notas?.calificacionSupletorio || null,
                      }))
                    )
                )
              ),
            ]).pipe(
              map(
                ([
                  notaAnimacionLectura,
                  notaAcompaniamientoIntegralAula,
                  notaComportamiento,
                  notasCurso,
                ]) => {
                  // Asigna todas las notas al estudiante
                  estudiante.notaAnimacionLectura = notaAnimacionLectura || {
                    calificacionT1: 0,
                    calificacionT2: 0,
                    calificacionT3: 0,
                  };
                  estudiante.notaAcompaniamientoIntegralAula =
                    notaAcompaniamientoIntegralAula || {
                      calificacionT1: 0,
                      calificacionT2: 0,
                      calificacionT3: 0,
                    };
                  estudiante.notaComportamiento = notaComportamiento || {
                    calificacionT1: 0,
                    calificacionT2: 0,
                    calificacionT3: 0,
                  };
                  estudiante.notas = notasCurso;
                  // Calcular promedio del estudiante
                  let totalNotas = 0;
                  let numCursos = notasCurso.length;
                  notasCurso.forEach((nota) => {
                    const promedioAsignatura =
                      (nota.notaT1 + nota.notaT2 + nota.notaT3) / 3;
                    totalNotas += promedioAsignatura;
                  });
                  estudiante.promedioAnual = numCursos
                    ? totalNotas / numCursos
                    : 0;
                  return estudiante;
                }
              )
            );
          });
          // Procesa las solicitudes de todos los estudiantes y detiene el loading
          forkJoin(estudianteNotasRequests).subscribe({
            next: (estudiantesConNotas) => {
              this.estudiantes = estudiantesConNotas;
              this.loading = false; // Detiene el loading cuando todo está cargado
            },
            error: () => {
              this.loading = false;
            },
          });
        },
        error: () => {
          this.loading = false;
        },
      });
  }

  estado(estudiante: any, notaFinal: number) {
    // console.log(estudiante.estado)
    if (estudiante.estado === 0) {
      return 'Retirado';
    }

    if (notaFinal >= 7) {
      return 'Aprobado';
    } else if (notaFinal > 0) {
      return 'Refuerzo \nAcadémico';
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

  async getNombreAsignatura(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cursoProfesorService.getCursoProfesorById(id).subscribe({
        next: (data) => resolve(data),
        error: (err) => reject(err),
      });
    });
  }

  // Método para exportar a Excel
  async exportExcel() {
    // Mapea los datos de los estudiantes para incluir solo los campos necesarios
    const filteredData = await Promise.all(
      this.estudiantes.map(async (estudiante) => {
        const notas = await estudiante.notas.reduce(
          async (accPromise: Promise<any>, nota: any) => {
            const acc = await accPromise;
            const asignatura = await this.getNombreAsignatura(
              nota.cursoProfesorId
            );
            const nombreAsignatura = asignatura.asignatura.nombre;

            acc[`T1 (${nombreAsignatura})`] = nota.notaT1
              ? nota.notaT1.toFixed(2).replace('.', ',')
              : '';
            acc[`T2 (${nombreAsignatura})`] = nota.notaT2
              ? nota.notaT2.toFixed(2).replace('.', ',')
              : '';
            acc[`T3 (${nombreAsignatura})`] = nota.notaT3
              ? nota.notaT3.toFixed(2).replace('.', ',')
              : '';
            acc[`Final (${nombreAsignatura})`] = (
              (nota.notaT1 + nota.notaT2 + nota.notaT3) /
              3
            )
              .toFixed(2)
              .replace('.', ',');
            acc[`Supletorio (${nombreAsignatura})`] = nota.supletorio
              ? nota.supletorio.toFixed(2).replace('.', ',')
              : '';
            return acc;
          },
          Promise.resolve({})
        );

        return {
          apellidosNombres: estudiante.apellidosNombres,
          cedula: estudiante.cedula,
          ...notas,
        };
      })
    );

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

  async exportPDF() {
    // Crear el encabezado de la tabla
    const headers = [
      { text: 'Apellidos y Nombres', style: 'tableHeader' },
      { text: 'Cédula', style: 'tableHeader' },
      ...this.cursosProfesor.flatMap((cursoProfesor) => [
        {
          text: `T1 (${cursoProfesor.asignatura.nombre})`,
          style: 'tableHeader',
        },
        {
          text: `T2 (${cursoProfesor.asignatura.nombre})`,
          style: 'tableHeader',
        },
        {
          text: `T3 (${cursoProfesor.asignatura.nombre})`,
          style: 'tableHeader',
        },
        {
          text: `Final (${cursoProfesor.asignatura.nombre})`,
          style: 'tableHeader',
        },
        {
          text: `Supletorio (${cursoProfesor.asignatura.nombre})`,
          style: 'tableHeader',
        },
        { text: 'Estado', style: 'tableHeader' },
      ]),
    ];

    // Crear el cuerpo de la tabla
    const tableBody = [
      // Encabezado de la tabla
      headers,
      // Filas de estudiantes
      ...this.estudiantes.map((estudiante) => {
        const row = [
          estudiante.apellidosNombres,
          estudiante.cedula,
          ...this.cursosProfesor.flatMap((cursoProfesor) => {
            const nota = estudiante.notas.find(
              (nota: { cursoProfesorId: any }) =>
                nota.cursoProfesorId === cursoProfesor.id
            );
            const finalNota = nota
              ? (nota.notaT1 + nota.notaT2 + nota.notaT3 || 0) / 3
              : null;
            return [
              nota?.notaT1 ? nota.notaT1.toFixed(2).replace('.', ',') : '',
              nota?.notaT2 ? nota.notaT2.toFixed(2).replace('.', ',') : '',
              nota?.notaT3 ? nota.notaT3.toFixed(2).replace('.', ',') : '',
              finalNota ? finalNota.toFixed(2).replace('.', ',') : '',
              nota?.supletorio
                ? nota.supletorio.toFixed(2).replace('.', ',')
                : '',
              this.estado(estudiante, finalNota!),
            ];
          }),
        ];
        return row;
      }),
    ];

    // Definir la estructura del documento PDF
    const documentDefinition: TDocumentDefinitions = {
      pageOrientation: 'landscape', // Cambiar la orientación a horizontal
      pageMargins: [10, 10, 10, 10], // Ajustar márgenes
      content: [
        { text: 'Reporte de Estudiantes', style: 'header' },
        {
          table: {
            headerRows: 1,
            widths: [
              '*',
              '*',
              ...Array(this.cursosProfesor.length * 6).fill('*'),
            ],
            body: tableBody,
          },
          layout: {
            fillColor: (rowIndex, node, columnIndex) => null,
            hLineWidth: () => 0, // Sin líneas horizontales
            vLineWidth: () => 0, // Sin líneas verticales
            paddingLeft: () => 2, // Ajustar el relleno a la izquierda
            paddingRight: () => 2, // Ajustar el relleno a la derecha
            paddingTop: () => 2, // Ajustar el relleno arriba
            paddingBottom: () => 2, // Ajustar el relleno abajo
          },
        },
      ],
      styles: {
        header: {
          fontSize: 10,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        tableHeader: {
          bold: true,
          fontSize: 8, // Ajustar tamaño de fuente de encabezado
          color: 'black',
        },
        tableCell: {
          fontSize: 8, // Tamaño de fuente de las celdas
          margin: [0, 0, 0, 0], // Eliminar márgenes en las celdas
        },
      },
      defaultStyle: {
        fontSize: 8, // Tamaño de fuente por defecto
      },
    };

    // Generar el PDF y guardarlo
    pdfMake.createPdf(documentDefinition).download('reporte_estudiantes.pdf');
  }

  changePageAnimacionLectura(notaAnimacionLecturaEstudiante: any) {
    this.guardarNotaAnimacionLectura(notaAnimacionLecturaEstudiante);
  }

  guardarNotaAnimacionLectura(notaAnimacionLecturaEstudiante: any) {
    const notaAnimacionLectura = {
      estu_id: notaAnimacionLecturaEstudiante.id,
      curs_id: this.curs_id,
      notaT1:
        notaAnimacionLecturaEstudiante.notaAnimacionLectura.calificacionT1 > 10
          ? 10
          : notaAnimacionLecturaEstudiante.notaAnimacionLectura.calificacionT1,
      notaT2:
        notaAnimacionLecturaEstudiante.notaAnimacionLectura.calificacionT2 > 10
          ? 10
          : notaAnimacionLecturaEstudiante.notaAnimacionLectura.calificacionT2,
      notaT3:
        notaAnimacionLecturaEstudiante.notaAnimacionLectura.calificacionT3 > 10
          ? 10
          : notaAnimacionLecturaEstudiante.notaAnimacionLectura.calificacionT3,
    };
    this.notaService.saveNotaAnimacionLectura(notaAnimacionLectura).subscribe({
      next: () => {},
      complete: () => {
        this.messageServicePNG.add({
          severity: 'success',
          summary: 'OK',
          detail: 'Nota guardada',
        });
      },
    });
  }
  changePageAcompaniamientoIntegralAula(
    notaAcompaniamientoIntegralAulaEstudiante: any
  ) {
    this.guardarNotaAcompaniamientoIntegralAula(
      notaAcompaniamientoIntegralAulaEstudiante
    );
  }

  guardarNotaAcompaniamientoIntegralAula(
    notaAcompaniamientoIntegralAulaEstudiante: any
  ) {
    const notaAcompaniamientoIntegralAula = {
      estu_id: notaAcompaniamientoIntegralAulaEstudiante.id,
      curs_id: this.curs_id,
      notaT1:
        notaAcompaniamientoIntegralAulaEstudiante
          .notaAcompaniamientoIntegralAula.calificacionT1 > 10
          ? 10
          : notaAcompaniamientoIntegralAulaEstudiante
              .notaAcompaniamientoIntegralAula.calificacionT1,
      notaT2:
        notaAcompaniamientoIntegralAulaEstudiante
          .notaAcompaniamientoIntegralAula.calificacionT2 > 10
          ? 10
          : notaAcompaniamientoIntegralAulaEstudiante
              .notaAcompaniamientoIntegralAula.calificacionT2,
      notaT3:
        notaAcompaniamientoIntegralAulaEstudiante
          .notaAcompaniamientoIntegralAula.calificacionT3 > 10
          ? 10
          : notaAcompaniamientoIntegralAulaEstudiante
              .notaAcompaniamientoIntegralAula.calificacionT3,
    };
    this.notaService
      .saveNotaAcompaniamientoIntegralAula(notaAcompaniamientoIntegralAula)
      .subscribe({
        next: () => {},
        complete: () => {
          this.messageServicePNG.add({
            severity: 'success',
            summary: 'OK',
            detail: 'Nota guardada',
          });
        },
      });
  }

  changePageComportamiento(notaComportamientoEstudiante: any) {
    this.guardarNotaComportamiento(notaComportamientoEstudiante);
  }
  guardarNotaComportamiento(notaComportamientoEstudiante: any) {
    const notaComportamiento = {
      estu_id: notaComportamientoEstudiante.id,
      curs_id: this.curs_id,
      notaT1:
        notaComportamientoEstudiante.notaComportamiento.calificacionT1 > 4
          ? 4
          : notaComportamientoEstudiante.notaComportamiento.calificacionT1,
      notaT2:
        notaComportamientoEstudiante.notaComportamiento.calificacionT2 > 4
          ? 4
          : notaComportamientoEstudiante.notaComportamiento.calificacionT2,
      notaT3:
        notaComportamientoEstudiante.notaComportamiento.calificacionT3 > 4
          ? 4
          : notaComportamientoEstudiante.notaComportamiento.calificacionT3,
    };
    this.notaService.saveNotaComportamiento(notaComportamiento).subscribe({
      next: () => {},
      complete: () => {
        this.messageServicePNG.add({
          severity: 'success',
          summary: 'OK',
          detail: 'Nota guardada',
        });
      },
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

  redondearNotaFinal(t1: number, t2: number, t3: number): number {
    return this.calificacionService.redondearNotaFinal(t1, t2, t3);
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
