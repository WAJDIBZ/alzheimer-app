import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EmergencyContactResponse } from '../models/medical.models';

@Component({
  standalone: true,
  imports: [MatDialogModule, ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  template: `
  <div class="dialog-shell">
    <div class="dialog-header">
      <div class="dialog-eyebrow">{{data ? 'Modifier' : 'Ajouter'}} un contact</div>
      <h3 class="dialog-title">Contact d'urgence</h3>
    </div>
    <form [formGroup]="form" class="form-grid">
      <mat-form-field appearance="outline"><mat-label>Nom complet</mat-label><input matInput formControlName="fullName"></mat-form-field>
      <mat-form-field appearance="outline"><mat-label>Relation</mat-label><input matInput formControlName="relationship"></mat-form-field>
      <mat-form-field appearance="outline"><mat-label>Téléphone</mat-label><input matInput formControlName="phone"></mat-form-field>
      <mat-form-field appearance="outline"><mat-label>Email</mat-label><input matInput formControlName="email"></mat-form-field>
    </form>
    <div class="dialog-actions">
      <button mat-button (click)="ref.close()">Annuler</button>
      <button mat-raised-button color="primary" (click)="save()" [disabled]="form.invalid">Enregistrer</button>
    </div>
  </div>`
})
export class ContactDialogComponent {
  form = this.fb.group({fullName:[this.data?.fullName??'',Validators.required], relationship:[this.data?.relationship??''], phone:[this.data?.phone??'',Validators.required], email:[this.data?.email??'',Validators.email]});
  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: EmergencyContactResponse | null, public ref: MatDialogRef<ContactDialogComponent>) {}
  save(){ this.ref.close(this.form.value); }
}
