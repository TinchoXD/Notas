import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursoService } from '../../../services/curso/curso.service';
import { Curso } from '../../../services/curso/curso';
import { EstudianteService } from '../../../services/estudiante/estudiante.service';
import { CursoProfesorService } from '../../../services/cursoProfesor/curso-profesor.service';
import { NotaService } from '../../../services/nota/nota.service';

import * as XLSX from 'xlsx';
//import * as FileSaver from 'file-saver';
import FileSaver, { FileSaverOptions } from 'file-saver';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { style } from '@angular/animations';
// Necesario para pdfmake
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

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

  loading: boolean = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private cursoService: CursoService,
    private estudianteService: EstudianteService,
    private cursoProfesorService: CursoProfesorService,
    private notaService: NotaService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.curs_id = +params['id']; // El signo '+' convierte el string a número
      this.cursoService.getCursoById(this.curs_id).subscribe({
        next: (cursos) => {
          //this.loading = true;
          this.curso = cursos;
          console.log('curso', this.curso);
          console.log('this.curso.user', this.curso.user);
          this.cursos.push(this.curso);

          // Obtiene los estudiantes asociados al curso actual
          this.estudianteService
            .getEstudiantesByCursoId(this.curs_id)
            .subscribe({
              next: (estudiantes) => {
                this.estudiantes = estudiantes;
                console.log('estudiantes', this.estudiantes);

                this.cursoProfesorService
                  .getCursoProfesorByCursoId(this.curs_id)
                  .subscribe({
                    next: (cursosProfesor) => {
                      console.log('estudiantes 123123123123S', cursosProfesor);

                      this.cursosProfesor = cursosProfesor;
                      console.log('this.cursosProfesor', this.cursosProfesor);

                      this.estudiantes.forEach((estudiante) => {
                        // Inicializa un arreglo para almacenar las notas de cada asignatura
                        estudiante.notas = [];

                        this.cursosProfesor.forEach((cursoProfesor) => {
                          // Obtiene las notas del estudiante para cada cursoProfesor
                          this.notaService
                            .getNotaByEstudianteAndCursoProfesor(
                              estudiante.id,
                              cursoProfesor.id
                            )
                            .subscribe({
                              next: (notas) => {
                                // Añade las notas al arreglo `notas` del estudiante
                                estudiante.notas.push({
                                  cursoProfesorId: cursoProfesor.id,
                                  nombreAsignatura:
                                    cursoProfesor.nombreAsignatura, // Suponiendo que `cursoProfesor` tiene el nombre de la asignatura
                                  notaT1: notas?.calificacionT1 || null,
                                  notaT2: notas?.calificacionT2 || null,
                                  notaT3: notas?.calificacionT3 || null,
                                  supletorio:
                                    notas?.calificacionSupletorio || null,
                                });
                                this.loading = false;
                              },
                              
                            });
                        });
                      });
                    },
                  });
              },
            });
        },
      });
    });
  }

  estado(estudiante:any, notaFinal: number) {

   // console.log(estudiante.estado)
   if(estudiante.estado === 0){
    return 'DESERTOR'
   }

    if (notaFinal >= 7) {
      return 'Aprobado';
    } else if (notaFinal > 0) {
      return 'Reprobado';
    }
    return '-';
  }

  estadoColorBackground(estudiante:any, notaFinal: number) {
    if(estudiante.estado === 0){
      return '#e9ecef'
     }

    if (notaFinal >= 7) {
      return '#d4edda';
    } else if (notaFinal > 0) {
      return '#f8d7da';
    }
    return '#e9ecef';
  }

  estadoColorText(estudiante:any, notaFinal: number) {

    if(estudiante.estado === 0){
      return '#6c757d'
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
        error: (err) => reject(err)
      });
    });
  }


  // Método para exportar a Excel
  async exportExcel() {
    // Mapea los datos de los estudiantes para incluir solo los campos necesarios
    const filteredData = await Promise.all(this.estudiantes.map(async (estudiante) => {
      const notas = await estudiante.notas.reduce(async (accPromise: Promise<any>, nota: any) => {
        const acc = await accPromise;
        const asignatura = await this.getNombreAsignatura(nota.cursoProfesorId);
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
      }, Promise.resolve({}));
  
      return {
        apellidosNombres: estudiante.apellidosNombres,
        cedula: estudiante.cedula,
        ...notas,
      };
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
}
