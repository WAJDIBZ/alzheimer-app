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
import { MatSelectModule } from '@angular/material/select';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, MatSnackBarModule, MatCardModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatButtonModule, MatSelectModule],
  template: `
  <div class="space-y-6 max-w-5xl w-full mx-auto">
    <div class="bg-gradient-to-r from-blue-50 via-white to-blue-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3 shadow-sm">
      <div>
        <p class="text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-1">Alzheimer App</p>
        <h3 class="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100">Créer un nouveau patient</h3>
        <p class="text-sm text-gray-500 dark:text-gray-400">Saisissez les informations essentielles pour générer le dossier.</p>
      </div>
      <div class="flex items-center gap-2">
        <span class="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold dark:bg-blue-900/40 dark:text-blue-100">Formulaire</span>
      </div>
    </div>

    <div class="bg-card-light dark:bg-card-dark border border-gray-200 dark:border-gray-700 w-full rounded-2xl shadow-soft space-y-6 p-6">
      <div class="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
        <p class="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">Identité</p>
        <form [formGroup]="form" class="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          <mat-form-field appearance="outline" class="w-full"><mat-label>Prénom</mat-label><input matInput formControlName="firstName"></mat-form-field>
          <mat-form-field appearance="outline" class="w-full"><mat-label>Nom</mat-label><input matInput formControlName="lastName"></mat-form-field>
          <mat-form-field appearance="outline" class="w-full"><mat-label>Date de naissance</mat-label><input matInput type="date" formControlName="dateOfBirth"></mat-form-field>
          <mat-form-field appearance="outline" class="w-full"><mat-label>Genre</mat-label><input matInput formControlName="gender"></mat-form-field>
        </form>
      </div>

      <div class="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
        <p class="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">Contact & suivi</p>
        <form [formGroup]="form" class="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          <mat-form-field appearance="outline" class="w-full"><mat-label>Téléphone</mat-label><input matInput formControlName="phone"></mat-form-field>
          <mat-form-field appearance="outline" class="w-full"><mat-label>Adresse</mat-label><input matInput formControlName="address"></mat-form-field>
          <mat-form-field appearance="outline" class="w-full"><mat-label>Médecin référent</mat-label><input matInput formControlName="doctorName"></mat-form-field>
          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Niveau de risque</mat-label>
            <mat-select formControlName="riskLevel">
              <mat-option value="Faible">Faible</mat-option>
              <mat-option value="Moyen">Moyen</mat-option>
              <mat-option value="Élevé">Élevé</mat-option>
            </mat-select>
          </mat-form-field>
          <mat-form-field appearance="outline" class="w-full"><mat-label>Statut</mat-label><input matInput formControlName="status" placeholder="Ex: Modéré, Léger"></mat-form-field>
          <div class="flex items-center px-2">
            <mat-checkbox formControlName="familyHistoryAlzheimer">Antécédents familiaux Alzheimer</mat-checkbox>
          </div>
        </form>
      </div>

      <div class="flex justify-end">
        <button mat-raised-button color="primary" class="px-5" (click)="save()" [disabled]="form.invalid">Créer le dossier</button>
      </div>
    </div>
  </div>
  `
})
export class AdminPatientFormComponent {
  form = this.fb.group({
    firstName:['',Validators.required],
    lastName:['',Validators.required],
    dateOfBirth:['',Validators.required],
    gender:[''],
    phone:[''],
    address:[''],
    doctorName:[''],
    riskLevel:[''],
    familyHistoryAlzheimer:[false],
    status:['']
  });
  constructor(private fb: FormBuilder, private api: AdminApiService, private snack: MatSnackBar, private router: Router) {}
  save(){ this.api.createPatient(this.form.value as any).subscribe({next:r=>{this.snack.open('Patient créé','OK',{duration:2000}); this.router.navigate(['/admin/patients',r.idPatient]);}, error:e=>this.snack.open(e.error?.message||'Erreur','OK')}); }
}
