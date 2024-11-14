import { Component, OnInit } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { ConfiguracionFechasService } from '../../../services/configuracionFechas/configuracion-fechas.service';
import { ThemePalette } from '@angular/material/core';
import { ConfiguracionFechasRequest } from '../../../services/configuracionFechas/configuracionFechasRequest';
import Swal from 'sweetalert2';
import { LoginService } from '../../../services/auth/login.service';
import { ConfigService } from '../../../services/config/config.service';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

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
  userDataToken!: any;
  modalVisible = true;
  uploadedFile: any;

  submittedInformacionGeneral!: boolean;

  configs: any[] = [];

  nombreRector: string | null = null;
  nombreInstitucion: string | null = null;
  codigoAMIE: string | null = null;
  anioLectivo: string | null = null;
  imageBase64: string | null = null;

  constructor(
    private primengConfig: PrimeNGConfig,
    private configuracionFechasService: ConfiguracionFechasService,
    private loginService: LoginService,
    private messageService: MessageService,
    private configService: ConfigService
  ) {}

  ngOnInit(): void {
    this.loginService.userData.subscribe({
      next: (userDataToken) => {
        this.userDataToken = this.loginService.decodeToken(userDataToken);
        if (this.userDataToken.role === 'ADMIN') {
          this.modalVisible = false;
        } else {
        }
      },
    });

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

    this.configService.getAllConfig().subscribe({
      next: (configRes) => {
        this.configs = configRes;

        /* const imageBase64Obj = this.configs.find(item => item.key === "imagenLogo" )
        this.imageBase64 = imageBase64Obj.value
        console.log('this.imageBase64', this.imageBase64); */
      },
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
              title: 'Ok',
              text: `${res.message}`,
              icon: 'success',
            });
            console.log('res', res);
          },
        });
    } else {
      console.log('Por favor selecciona todos los rangos de fechas');
    }
  }

  /* onUpload(event: UploadEvent) {
    this.uploadedFile = event.files;

    this.messageService.add({
      severity: 'info',
      summary: 'File Uploaded',
      detail: '',
    });
  } */

  guardarInformacionGeneral() {
    this.submittedInformacionGeneral = true;

    this.configs.forEach((config) => {
      if (!config.value) {
        return
      }
    });

    console.log('Valores a guardar', this.configs);
    this.configService.postConfiguracion(this.configs).subscribe({
      next:(res)=>{
        Swal.fire({
          icon: 'success',
          title: 'Guardado.',
          text: `${res.message}`,
        });
      },
      error:(error)=>{
        Swal.fire({
          icon: 'error',
          title: 'Error.',
          text: `${error.message}`,
        });
      }
    })

  }

  onFileSelected(event: Event): void {
    this.submittedInformacionGeneral = false;
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      if (file.type !== 'image/png') {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Solo se permite imágenes tipo PNG!',
        });

        //this.setImagenLogoValueToNull(this.configs);

        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        //this.configs.find(item => item.key === "imagenLogo")
        const imagenLogo = this.configs.find(
          (item) => item.key === 'imagenLogo'
        );
        if (imagenLogo) {
          imagenLogo.value = reader.result as string;
        }
      };
      reader.readAsDataURL(file);
    }
    console.log('IMAGEN', this.imageBase64);
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onDrop(event: DragEvent): void {
    this.submittedInformacionGeneral = false;
    event.preventDefault();
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      this.onFileSelected({ target: event.dataTransfer } as any);
    }
  }

  clearImage(data: { key: string; value: any }[]): void {
    this.setImagenLogoValueToNull(data);
  }

  setImagenLogoValueToNull(data: { key: string; value: any }[]): void {
    const imagenLogo = data.find((item) => item.key === 'imagenLogo');
    if (imagenLogo) {
      imagenLogo.value = null;
    }
  }
}
