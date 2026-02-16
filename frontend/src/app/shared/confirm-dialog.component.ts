import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  template: `<h2 mat-dialog-title>Confirmation</h2>
  <mat-dialog-content>{{data.message}}</mat-dialog-content>
  <mat-dialog-actions align="end">
    <button mat-button (click)="close(false)">Annuler</button>
    <button mat-raised-button color="warn" (click)="close(true)">Supprimer</button>
  </mat-dialog-actions>`
})
export class ConfirmDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {message: string}, private ref: MatDialogRef<ConfirmDialogComponent>) {}
  close(result: boolean) { this.ref.close(result); }
}
