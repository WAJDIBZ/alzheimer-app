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
  template: `<h2 mat-dialog-title>{{data ? 'Modifier' : 'Ajouter'}} traitement</h2>
  <mat-dialog-content>
    <form [formGroup]="form" class="form-grid">
      <mat-form-field><mat-label>Nom</mat-label><input matInput formControlName="treatmentName"></mat-form-field>
      <mat-form-field><mat-label>Dosage</mat-label><input matInput formControlName="dosage"></mat-form-field>
      <mat-form-field><mat-label>Fréquence</mat-label><input matInput formControlName="frequency"></mat-form-field>
      <mat-form-field><mat-label>Début</mat-label><input matInput type="date" formControlName="startDate"></mat-form-field>
      <mat-form-field><mat-label>Fin</mat-label><input matInput type="date" formControlName="endDate"></mat-form-field>
      <mat-form-field><mat-label>Statut</mat-label><input matInput formControlName="status"></mat-form-field>
    </form>
  </mat-dialog-content>
  <mat-dialog-actions align="end"><button mat-button (click)="ref.close()">Annuler</button><button mat-raised-button color="primary" (click)="save()" [disabled]="form.invalid">Enregistrer</button></mat-dialog-actions>`
})
export class TreatmentDialogComponent {
  form = this.fb.group({
    treatmentName: [this.data?.treatmentName ?? '', Validators.required], dosage: [this.data?.dosage ?? ''], frequency: [this.data?.frequency ?? ''],
    startDate: [this.data?.startDate ?? '', Validators.required], endDate: [this.data?.endDate ?? ''], status: [this.data?.status ?? '']
  });
  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: TreatmentResponse | null, public ref: MatDialogRef<TreatmentDialogComponent>) {}
  save(){ this.ref.close(this.form.value); }
}
