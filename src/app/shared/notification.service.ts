import { Injectable } from '@angular/core';

import { MatSnackBarModule, MatSnackBarConfig, MatSnackBar } from '@angular/material'
import { validateHorizontalPosition, validateVerticalPosition } from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar ) { }
  
  config:MatSnackBarConfig={
    duration:5000,
    horizontalPosition:'right',
    verticalPosition:'bottom'
  }

  success(msg) {
    this.config['pannelClass']=['notification','success'];
    this.snackBar.open(msg, "",this.config)
  }
  fail(msg) {
    this.config['pannelClass']=['notification','success'];
    this.snackBar.open(msg, "",this.config)
  }
}
