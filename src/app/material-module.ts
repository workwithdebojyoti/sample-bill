import { NgModule } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import {
    MatFormFieldModule
} from '@angular/material';
import { MatSnackBarModule } from '@angular/material/snack-bar';
@NgModule({
    exports: [
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTableModule,
        MatCardModule,
        MatSnackBarModule
    ]
})
export class DemoMaterialModule { }