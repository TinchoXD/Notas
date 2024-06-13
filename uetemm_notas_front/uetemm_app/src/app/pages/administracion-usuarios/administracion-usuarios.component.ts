import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UserService } from '../../services/user/user.service';
import { LoginService } from '../../services/auth/login.service';





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

  constructor(private _liveAnnouncer: LiveAnnouncer,
     private userService: UserService,
     private loginService: LoginService,
    ) {
     /*  this.loadUserData(); */
  }
  
  ngOnInit(): void {
    this.userService.getAllUser().subscribe(data=>{
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

/*   private loadUserData() {
    this.userService.getAllUser().subscribe({next: (userData) => {
      },
      error: (errorData) => {
       // this.errorMessage = errorData;
      },
      complete: () => {
        console.info('lista de USUARIOS completa');
      },})
  } */

}


