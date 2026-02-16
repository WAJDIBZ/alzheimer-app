import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  template: `<div class="glass-card" style="padding:18px;">
    <div class="eyebrow">Please confirm</div>
    <h3 style="margin:6px 0 12px;">{{data.message}}</h3>
    <p>Action cannot be undone. Continue?</p>
    <div class="actions" style="justify-content:flex-end;margin-top:14px;">
      <button mat-button (click)="close(false)">Cancel</button>
      <button mat-raised-button color="warn" (click)="close(true)">Confirm</button>
    </div>
  </div>`
})
export class ConfirmDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {message: string}, private ref: MatDialogRef<ConfirmDialogComponent>) {}
  close(result: boolean) { this.ref.close(result); }
}
