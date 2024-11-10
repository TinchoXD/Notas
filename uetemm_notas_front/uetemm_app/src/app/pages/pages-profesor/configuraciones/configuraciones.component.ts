import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { ConfiguracionFechasService } from '../../../services/configuracionFechas/configuracion-fechas.service';
import { ThemePalette } from '@angular/material/core';
import { ConfiguracionFechasRequest } from '../../../services/configuracionFechas/configuracionFechasRequest';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-configuraciones',
  templateUrl: './configuraciones.component.html',
  styleUrl: './configuraciones.component.css',
})
export class ConfiguracionesComponent implements OnInit {
  rangeDatesTrimestreI: Date[] = [];
  rangeDatesTrimestreII: Date[] = [];
  rangeDatesTrimestreIII: Date[] = [];
  rangeDatesSupletorio: Date[] = [];
  es: any;
  rangosFechas: any[] = [];
  color: ThemePalette = 'primary';
  fechaConfigRequest: ConfiguracionFechasRequest[] = [];

  constructor(
    private primengConfig: PrimeNGConfig,
    private configuracionFechasService: ConfiguracionFechasService
  ) {}

  ngOnInit(): void {
    this.primengConfig.setTranslation({
      dayNames: [
        'domingo',
        'lunes',
        'martes',
        'miércoles',
        'jueves',
        'viernes',
        'sábado',
      ],
      dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
      dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
      monthNames: [
        'enero',
        'febrero',
        'marzo',
        'abril',
        'mayo',
        'junio',
        'julio',
        'agosto',
        'septiembre',
        'octubre',
        'noviembre',
        'diciembre',
      ],
      monthNamesShort: [
        'ene',
        'feb',
        'mar',
        'abr',
        'may',
        'jun',
        'jul',
        'ago',
        'sep',
        'oct',
        'nov',
        'dic',
      ],
      today: 'Hoy',
      clear: 'Borrar',
      firstDayOfWeek: 1,
    });

    this.configuracionFechasService.getConfiguracionFechas().subscribe({
      next: (fechas) => {
        this.rangosFechas = fechas;
        console.log('rangosFechas', this.rangosFechas);
        this.rangosFechas.forEach((fechaConfig) => {
          if (fechaConfig.tipo === 'trimestre_i') {
            this.rangeDatesTrimestreI = [
              new Date(
                fechaConfig.fechaInicio !== null
                  ? fechaConfig.fechaInicio
                  : new Date()
              ),
              new Date(
                fechaConfig.fechaFin !== null
                  ? fechaConfig.fechaFin
                  : new Date()
              ),
            ];
          } else if (fechaConfig.tipo === 'trimestre_ii') {
            this.rangeDatesTrimestreII = [
              new Date(
                fechaConfig.fechaInicio !== null
                  ? fechaConfig.fechaInicio
                  : new Date()
              ),
              new Date(
                fechaConfig.fechaFin !== null
                  ? fechaConfig.fechaFin
                  : new Date()
              ),
            ];
          } else if (fechaConfig.tipo === 'trimestre_iii') {
            this.rangeDatesTrimestreIII = [
              new Date(
                fechaConfig.fechaInicio !== null
                  ? fechaConfig.fechaInicio
                  : new Date()
              ),
              new Date(
                fechaConfig.fechaFin !== null
                  ? fechaConfig.fechaFin
                  : new Date()
              ),
            ];
          } else if (fechaConfig.tipo === 'supletorio') {
            this.rangeDatesSupletorio = [
              new Date(
                fechaConfig.fechaInicio !== null
                  ? fechaConfig.fechaInicio
                  : new Date()
              ),
              new Date(
                fechaConfig.fechaFin !== null
                  ? fechaConfig.fechaFin
                  : new Date()
              ),
            ];
          }
        });
      },
    });
  }

  esFormularioValido(): boolean {
    return (
      this.rangeDatesTrimestreI[0] !== null &&
      this.rangeDatesTrimestreI[1] !== null &&
      this.rangeDatesTrimestreII[0] !== null &&
      this.rangeDatesTrimestreII[1] !== null &&
      this.rangeDatesTrimestreIII[0] !== null &&
      this.rangeDatesTrimestreIII[1] !== null &&
      this.rangeDatesSupletorio[0] !== null &&
      this.rangeDatesSupletorio[1] !== null
    );
  }

  guardarConfiguracionFechas() {
    if (this.esFormularioValido()) {
      // Lógica para guardar la configuración de fechas
      console.log('Configuración guardada correctamente');
      this.fechaConfigRequest = [
        {
          fechaConfigTipo: 'trimestre_i',
          fechaConfigInicio: new Date(this.rangeDatesTrimestreI[0]),
          fechaConfigFin: new Date(this.rangeDatesTrimestreI[1]),
        },
        {
          fechaConfigTipo: 'trimestre_ii',
          fechaConfigInicio: new Date(this.rangeDatesTrimestreII[0]),
          fechaConfigFin: new Date(this.rangeDatesTrimestreII[1]),
        },
        {
          fechaConfigTipo: 'trimestre_iii',
          fechaConfigInicio: new Date(this.rangeDatesTrimestreIII[0]),
          fechaConfigFin: new Date(this.rangeDatesTrimestreIII[1]),
        },
        {
          fechaConfigTipo: 'supletorio',
          fechaConfigInicio: new Date(this.rangeDatesSupletorio[0]),
          fechaConfigFin: new Date(this.rangeDatesSupletorio[1]),
        },
      ];

      console.log('his.fechaConfigRequest', this.fechaConfigRequest);

      this.configuracionFechasService
        .postConfiguracionFechas(this.fechaConfigRequest)
        .subscribe({
          next: (res) => {
            Swal.fire({
              title: "Ok",
              text: `${res.message}`,
              icon: "success"
            });
            console.log('res', res);
          },
        });
    } else {
      console.log('Por favor selecciona todos los rangos de fechas');
    }
  }
}
