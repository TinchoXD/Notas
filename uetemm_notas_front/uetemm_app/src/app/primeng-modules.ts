import { NgModule } from "@angular/core";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { KnobModule } from 'primeng/knob';


@NgModule({
exports:[
    BrowserAnimationsModule,
    CascadeSelectModule,
    KnobModule

]
})
export class PrimeNGModule{}