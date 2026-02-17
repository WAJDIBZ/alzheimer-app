import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { EmergencyContactResponse } from '../models/medical.models';

@Component({
  standalone: true,
  imports: [CommonModule, MatDialogModule, ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  template: `
  <div class="dialog-shell">
    <div class="dialog-header">
      <div class="dialog-eyebrow">{{data ? 'Modifier' : 'Ajouter'}} un contact</div>
      <h3 class="dialog-title">Contact d'urgence</h3>
    </div>
    <form [formGroup]="form" class="form-grid">
      <mat-form-field appearance="fill">
        <mat-label>Nom complet</mat-label>
        <input matInput formControlName="fullName">
        <mat-error *ngIf="form.get('fullName')?.hasError('required')">Le nom est requis</mat-error>
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Relation</mat-label>
        <mat-select formControlName="relationship">
          <mat-option value="Conjoint(e)">Conjoint(e)</mat-option>
          <mat-option value="Fils">Fils</mat-option>
          <mat-option value="Fille">Fille</mat-option>
          <mat-option value="Frère">Frère</mat-option>
          <mat-option value="Sœur">Sœur</mat-option>
          <mat-option value="Parent">Parent</mat-option>
          <mat-option value="Ami(e)">Ami(e)</mat-option>
          <mat-option value="Tuteur légal">Tuteur légal</mat-option>
          <mat-option value="Autre">Autre</mat-option>
        </mat-select>
        <mat-error *ngIf="form.get('relationship')?.hasError('required')">La relation est requise</mat-error>
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Téléphone</mat-label>
        <input matInput formControlName="phone" placeholder="12345678" maxlength="8">
        <mat-error *ngIf="form.get('phone')?.hasError('required')">Le téléphone est requis</mat-error>
        <mat-error *ngIf="form.get('phone')?.hasError('pattern')">Exactement 8 chiffres requis</mat-error>
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Email</mat-label>
        <input matInput formControlName="email" type="email">
        <mat-error *ngIf="form.get('email')?.hasError('email')">Email invalide</mat-error>
      </mat-form-field>
    </form>
    <div class="dialog-actions">
      <button mat-button (click)="ref.close()">Annuler</button>
      <button mat-raised-button color="primary" (click)="save()" [disabled]="form.invalid">Enregistrer</button>
    </div>
  </div>`
})
export class ContactDialogComponent {
  form = this.fb.group({
    fullName: [this.data?.fullName ?? '', Validators.required],
    relationship: [this.data?.relationship ?? '', Validators.required],
    phone: [this.data?.phone ?? '', [Validators.required, Validators.pattern(/^\d{8}$/)]],
    email: [this.data?.email ?? '', Validators.email]
  });
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: EmergencyContactResponse | null,
    public ref: MatDialogRef<ContactDialogComponent>
  ) { }
  save() { this.ref.close(this.form.value); }
}
