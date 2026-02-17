import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { TreatmentResponse } from '../models/medical.models';

@Component({
  standalone: true,
  imports: [CommonModule, MatDialogModule, ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule],
  template: `
  <div class="dialog-shell">
    <div class="dialog-header">
      <div class="dialog-eyebrow">{{data ? 'Modifier' : 'Ajouter'}} un traitement</div>
      <h3 class="dialog-title">Plan de traitement</h3>
    </div>
    <form [formGroup]="form" class="form-grid">
      <mat-form-field appearance="fill">
        <mat-label>Nom du traitement</mat-label>
        <input matInput formControlName="treatmentName">
        <mat-error *ngIf="form.get('treatmentName')?.hasError('required')">Le nom est requis</mat-error>
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Dosage</mat-label>
        <mat-select formControlName="dosage">
          <mat-option value="5mg">5 mg</mat-option>
          <mat-option value="10mg">10 mg</mat-option>
          <mat-option value="20mg">20 mg</mat-option>
          <mat-option value="25mg">25 mg</mat-option>
          <mat-option value="50mg">50 mg</mat-option>
          <mat-option value="100mg">100 mg</mat-option>
          <mat-option value="200mg">200 mg</mat-option>
          <mat-option value="500mg">500 mg</mat-option>
        </mat-select>
        <mat-error *ngIf="form.get('dosage')?.hasError('required')">Le dosage est requis</mat-error>
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Fréquence</mat-label>
        <mat-select formControlName="frequency">
          <mat-option value="1x/jour">1x / jour</mat-option>
          <mat-option value="2x/jour">2x / jour</mat-option>
          <mat-option value="3x/jour">3x / jour</mat-option>
          <mat-option value="1x/semaine">1x / semaine</mat-option>
          <mat-option value="2x/semaine">2x / semaine</mat-option>
          <mat-option value="1x/mois">1x / mois</mat-option>
          <mat-option value="Au besoin">Au besoin</mat-option>
        </mat-select>
        <mat-error *ngIf="form.get('frequency')?.hasError('required')">La fréquence est requise</mat-error>
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Statut</mat-label>
        <mat-select formControlName="status">
          <mat-option value="Actif">Actif</mat-option>
          <mat-option value="En pause">En pause</mat-option>
          <mat-option value="Terminé">Terminé</mat-option>
          <mat-option value="Annulé">Annulé</mat-option>
        </mat-select>
        <mat-error *ngIf="form.get('status')?.hasError('required')">Le statut est requis</mat-error>
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Date de début</mat-label>
        <input matInput [matDatepicker]="startPicker" formControlName="startDate" [min]="tomorrow" (click)="startPicker.open()">
        <mat-datepicker-toggle matIconSuffix [for]="startPicker"></mat-datepicker-toggle>
        <mat-datepicker #startPicker></mat-datepicker>
        <mat-error *ngIf="form.get('startDate')?.hasError('required')">La date de début est requise</mat-error>
        <mat-error *ngIf="form.get('startDate')?.hasError('matDatepickerMin')">La date doit être dans le futur</mat-error>
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Date de fin</mat-label>
        <input matInput [matDatepicker]="endPicker" formControlName="endDate" (click)="endPicker.open()">
        <mat-datepicker-toggle matIconSuffix [for]="endPicker"></mat-datepicker-toggle>
        <mat-datepicker #endPicker></mat-datepicker>
        <mat-error *ngIf="form.get('endDate')?.hasError('endBeforeStart')">La date de fin doit être après la date de début</mat-error>
      </mat-form-field>
    </form>

    <div *ngIf="form.hasError('dateRange')" class="text-red-500 text-xs font-medium mt-1 px-1">
      La date de fin doit être postérieure à la date de début.
    </div>

    <div class="dialog-actions">
      <button mat-button (click)="ref.close()">Annuler</button>
      <button mat-raised-button color="primary" (click)="save()" [disabled]="form.invalid">Enregistrer</button>
    </div>
  </div>`
})
export class TreatmentDialogComponent {
  tomorrow = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1);

  form = this.fb.group({
    treatmentName: [this.data?.treatmentName ?? '', Validators.required],
    dosage: [this.data?.dosage ?? '', Validators.required],
    frequency: [this.data?.frequency ?? '', Validators.required],
    startDate: [this.data?.startDate ?? '', Validators.required],
    endDate: [this.data?.endDate ?? ''],
    status: [this.data?.status ?? 'Actif', Validators.required]
  }, { validators: this.dateRangeValidator });

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: TreatmentResponse | null,
    public ref: MatDialogRef<TreatmentDialogComponent>
  ) { }

  dateRangeValidator(group: AbstractControl): ValidationErrors | null {
    const start = group.get('startDate')?.value;
    const end = group.get('endDate')?.value;
    if (start && end && new Date(end) <= new Date(start)) {
      group.get('endDate')?.setErrors({ endBeforeStart: true });
      return { dateRange: true };
    }
    return null;
  }

  save() { this.ref.close(this.form.value); }
}
