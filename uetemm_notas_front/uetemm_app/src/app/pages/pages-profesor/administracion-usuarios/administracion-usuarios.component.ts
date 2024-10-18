import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UserService } from '../../../services/user/user.service';
import { LoginService } from '../../../services/auth/login.service';
import { NavigationEnd, Router } from '@angular/router';
import { LoadingService } from '../../../services/loading/loading.service';
import { filter } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { AgregarUsuarioComponent } from '../agregar-usuario/agregar-usuario.component';
import { User } from '../../../services/auth/user';
import { CursoProfesorService } from '../../../services/cursoProfesor/curso-profesor.service';

@Component({
  selector: 'app-administracion-usuarios',
  templateUrl: './administracion-usuarios.component.html',
  styleUrl: './administracion-usuarios.component.css',
})
export class AdministracionUsuariosComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = [
    'index',
    'Nombres',
    'Apellidos',
    'Cédula',
    'Rol',
    'E-mail institucional',
    'Activo',
    'Acciones',
  ];
  addButtonLabel: string = ''; // Propiedad para controlar el texto del botón
  buttonState: string = 'collapsed'; // Estado inicial de la animación del botón
  dataSource = new MatTableDataSource<any>();
  severity: string = 'severity';

  sizes!: any[];
  selectedSize: any = { name: 'Small', class: 'p-datatable-sm' };
  userDataToken!: any

  //usuarios!: User[];
  usuarios!: any[];

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private userService: UserService,
    private loginService: LoginService,
    private router: Router,
    private loadingService: LoadingService,
    private dialog: MatDialog,
    private cursoProfesorService: CursoProfesorService
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.loadingService.hide();
      });
  }

  dialogAgregarUsuario(): void {
    const dialogRef = this.dialog.open(AgregarUsuarioComponent, {
      width: '900px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService
          .getAllUser()
          .subscribe((data) => (this.usuarios = data));
      }
    });
  }

  ngOnInit(): void {

    this.loginService.userData.subscribe({
      next:(userDataToken)=>{
        this.userDataToken = this.loginService.decodeToken(userDataToken)
      }
    })

    this.userService.getAllUser().subscribe({
      next: (data) => {
        this.usuarios = data;
        console.log('USUARIOS', data);
        this.usuarios.forEach((usuario) => {
          this.cursoProfesorService.getAllCursoProfesorByProfesorId(usuario.id)
            .subscribe({
              next: (cursos) => {
                usuario.curso = cursos;
    
                // Extraer los códigos únicos de los cursos
                const codigosUnicos = Array.from(
                  new Set(cursos.map((curso: any) => curso.curso.codigo))
                );
    
                // Crear un string concatenado con los códigos únicos
                usuario.cursosCodigos = codigosUnicos.join('|');
    
                console.log('Usuario con cursosCodigos únicos:', usuario.cursosCodigos);
              },
            });
        });
      },
    });

    this.sizes = [
      { name: 'Small', class: 'p-datatable-sm' },
      { name: 'Normal', class: '' },
      { name: 'Large', class: 'p-datatable-lg' },
    ];
  }



  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {}

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
      console.log(sortState.direction);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
      console.log(sortState.direction);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editar(id: number) {
    this.loadingService.show(); // Muestra el spinner de carga
    setTimeout(() => {
      this.router.navigate([`/editar-usuario/${id}`]).then(() => {
        this.loadingService.hide(); // Oculta el spinner de carga
      });
    }, 550); // Retraso de 2 segundos antes de la navegación
  }

  highlightCondition(row: any): boolean {
    // Define la condición para resaltar la fila
    return row.user_estado_usuario == 0;
  }
}
