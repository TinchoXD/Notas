import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UserService } from '../../services/user/user.service';
import { LoginService } from '../../services/auth/login.service';
import { NavigationEnd, Router } from '@angular/router';
import { LoadingService } from '../../services/loading/loading.service';
import { filter } from 'rxjs/operators';





@Component({
  selector: 'app-administracion-usuarios',
  templateUrl: './administracion-usuarios.component.html',
  styleUrl: './administracion-usuarios.component.css',

})
export class AdministracionUsuariosComponent implements AfterViewInit, OnInit {


  displayedColumns: string[] = ['index', 'Nombres', 'Apellidos', 'Cédula', 'Rol', 'E-mail institucional', 'Acciones'];
  addButtonLabel: string = ''; // Propiedad para controlar el texto del botón
  buttonState: string = 'collapsed'; // Estado inicial de la animación del botón

  dataSource = new MatTableDataSource<any>;

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private userService: UserService,
    private loginService: LoginService,
    private router: Router,
    private loadingService: LoadingService

  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.loadingService.hide();
    });
  }

  ngOnInit(): void {
    this.userService.getAllUser().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {

  }


  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
      console.log(sortState.direction)
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
      console.log(sortState.direction)
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




}


