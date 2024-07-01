import { NgModule } from "@angular/core";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { KnobModule } from 'primeng/knob';

import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { ToggleButtonModule } from 'primeng/togglebutton';





@NgModule({
    exports: [
        BrowserAnimationsModule,
        CascadeSelectModule,
        KnobModule,
        ToastModule,
        ToastModule,
        ButtonModule,
        RippleModule,
        CardModule,
        ToolbarModule,
        SplitButtonModule,
        InputTextModule,
        ProgressSpinnerModule,
        TagModule,
        DividerModule,
        ToggleButtonModule
    ]
})
export class PrimeNGModule { }