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
  template: `<div class="glass-card" style="padding:18px;">
    <div class="eyebrow">{{data ? 'Edit' : 'Add'}} contact</div>
    <h3 style="margin:6px 0 12px;">Emergency contact</h3>
    <form [formGroup]="form" class="form-grid">
      <mat-form-field appearance="outline"><mat-label>Full name</mat-label><input matInput formControlName="fullName"></mat-form-field>
      <mat-form-field appearance="outline"><mat-label>Relationship</mat-label><input matInput formControlName="relationship"></mat-form-field>
      <mat-form-field appearance="outline"><mat-label>Phone</mat-label><input matInput formControlName="phone"></mat-form-field>
      <mat-form-field appearance="outline"><mat-label>Email</mat-label><input matInput formControlName="email"></mat-form-field>
    </form>
    <div class="actions" style="justify-content:flex-end;margin-top:14px;">
      <button mat-button (click)="ref.close()">Cancel</button>
      <button mat-raised-button color="primary" (click)="save()" [disabled]="form.invalid">Save</button>
    </div>
  </div>`
})
export class ContactDialogComponent {
  form = this.fb.group({fullName:[this.data?.fullName??'',Validators.required], relationship:[this.data?.relationship??''], phone:[this.data?.phone??'',Validators.required], email:[this.data?.email??'',Validators.email]});
  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: EmergencyContactResponse | null, public ref: MatDialogRef<ContactDialogComponent>) {}
  save(){ this.ref.close(this.form.value); }
}
