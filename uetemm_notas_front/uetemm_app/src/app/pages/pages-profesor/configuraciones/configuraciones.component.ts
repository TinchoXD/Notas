import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configuraciones',
  templateUrl: './configuraciones.component.html',
  styleUrl: './configuraciones.component.css'
})
export class ConfiguracionesComponent implements OnInit{

  rangeDatesTrimestreI: Date[] | undefined;
  rangeDatesTrimestreII: Date[] | undefined;
  rangeDatesTrimestreIII: Date[] | undefined;
  rangeDatesSupletorio: Date[] | undefined;

  ngOnInit(): void {

    
  }
}
