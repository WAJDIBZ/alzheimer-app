import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminApiService } from '../services/admin-api.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, MatSnackBarModule, MatCardModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatButtonModule],
  template: `<div class="page"><mat-card><h2>Nouveau patient</h2>
  <form [formGroup]="form" class="form-grid">
    <mat-form-field><mat-label>Prénom</mat-label><input matInput formControlName="firstName"></mat-form-field>
    <mat-form-field><mat-label>Nom</mat-label><input matInput formControlName="lastName"></mat-form-field>
    <mat-form-field><mat-label>Date de naissance</mat-label><input matInput type="date" formControlName="dateOfBirth"></mat-form-field>
    <mat-form-field><mat-label>Genre</mat-label><input matInput formControlName="gender"></mat-form-field>
    <mat-form-field><mat-label>Téléphone</mat-label><input matInput formControlName="phone"></mat-form-field>
    <mat-form-field><mat-label>Adresse</mat-label><input matInput formControlName="address"></mat-form-field>
    <mat-form-field><mat-label>Statut</mat-label><input matInput formControlName="status"></mat-form-field>
    <mat-checkbox formControlName="familyHistoryAlzheimer">Antécédents familiaux Alzheimer</mat-checkbox>
  </form>
  <div class="actions"><button mat-raised-button color="primary" (click)="save()" [disabled]="form.invalid">Créer</button></div>
  </mat-card></div>`
})
export class AdminPatientFormComponent {
  form = this.fb.group({firstName:['',Validators.required],lastName:['',Validators.required],dateOfBirth:['',Validators.required],gender:[''],phone:[''],address:[''],familyHistoryAlzheimer:[false],status:['']});
  constructor(private fb: FormBuilder, private api: AdminApiService, private snack: MatSnackBar, private router: Router) {}
  save(){ this.api.createPatient(this.form.value as any).subscribe({next:r=>{this.snack.open('Patient créé','OK',{duration:2000}); this.router.navigate(['/admin/patients',r.idPatient]);}, error:e=>this.snack.open(e.error?.message||'Erreur','OK')}); }
}
