import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import * as Material from '@angular/material'
// import { MatToolbar, MatToolbarModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    Material.MatToolbarModule,
    Material.MatGridListModule,
    BrowserAnimationsModule,
    Material.MatFormFieldModule,
    Material.MatInputModule,
    Material.MatSelectModule,
    Material.MatButtonModule,
    Material.MatSnackBarModule,
    Material.MatTableModule,
    Material.MatIconModule

  ],
  exports: [    Material.MatTableModule, Material.MatIconModule, Material.MatSnackBarModule,Material.MatButtonModule, Material.MatSelectModule, Material.MatInputModule, Material.MatToolbarModule, Material.MatFormFieldModule, MatGridListModule, BrowserAnimationsModule],
  declarations: []
})
export class MaterialModule { }
