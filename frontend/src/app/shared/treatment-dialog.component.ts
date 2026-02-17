import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TreatmentResponse } from '../models/medical.models';

@Component({
  standalone: true,
  imports: [MatDialogModule, ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  template: `
  <div class="dialog-shell">
    <div class="dialog-header">
      <div class="dialog-eyebrow">{{data ? 'Modifier' : 'Ajouter'}} un traitement</div>
      <h3 class="dialog-title">Plan de traitement</h3>
    </div>
    <form [formGroup]="form" class="form-grid">
      <mat-form-field appearance="outline"><mat-label>Nom</mat-label><input matInput formControlName="treatmentName"></mat-form-field>
      <mat-form-field appearance="outline"><mat-label>Dosage</mat-label><input matInput formControlName="dosage"></mat-form-field>
      <mat-form-field appearance="outline"><mat-label>Fréquence</mat-label><input matInput formControlName="frequency"></mat-form-field>
      <mat-form-field appearance="outline"><mat-label>Date de début</mat-label><input matInput type="date" formControlName="startDate"></mat-form-field>
      <mat-form-field appearance="outline"><mat-label>Date de fin</mat-label><input matInput type="date" formControlName="endDate"></mat-form-field>
      <mat-form-field appearance="outline"><mat-label>Statut</mat-label><input matInput formControlName="status"></mat-form-field>
    </form>
    <div class="dialog-actions">
      <button mat-button (click)="ref.close()">Annuler</button>
      <button mat-raised-button color="primary" (click)="save()" [disabled]="form.invalid">Enregistrer</button>
    </div>
  </div>`
})
export class TreatmentDialogComponent {
  form = this.fb.group({
    treatmentName: [this.data?.treatmentName ?? '', Validators.required], dosage: [this.data?.dosage ?? ''], frequency: [this.data?.frequency ?? ''],
    startDate: [this.data?.startDate ?? '', Validators.required], endDate: [this.data?.endDate ?? ''], status: [this.data?.status ?? '']
  });
  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: TreatmentResponse | null, public ref: MatDialogRef<TreatmentDialogComponent>) { }
  save() { this.ref.close(this.form.value); }
}
