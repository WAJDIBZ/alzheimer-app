import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  template: `
  <div class="dialog-shell">
    <div class="dialog-header">
      <div class="dialog-eyebrow">Confirmation requise</div>
      <h3 class="dialog-title">{{data.message}}</h3>
      <p class="dialog-subtitle">Cette action est irréversible. Voulez-vous continuer ?</p>
    </div>
    <div class="dialog-actions">
      <button mat-button (click)="close(false)">Annuler</button>
      <button mat-raised-button color="warn" (click)="close(true)">Confirmer</button>
    </div>
  </div>`
})
export class ConfirmDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }, private ref: MatDialogRef<ConfirmDialogComponent>) { }
  close(result: boolean) { this.ref.close(result); }
}
