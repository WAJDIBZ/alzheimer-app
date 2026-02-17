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
  <div class="space-y-6 w-full">

    <!-- Header -->
    <div class="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 md:p-8 shadow-lg shadow-blue-500/15">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="material-icons-round text-white/60 text-lg">person_add</span>
            <p class="text-xs font-bold text-white/70 uppercase tracking-[0.2em]">Nouveau patient</p>
          </div>
          <h3 class="text-2xl font-bold text-white tracking-tight">Créer un dossier patient</h3>
          <p class="text-sm text-blue-100 mt-1">Saisissez les informations essentielles pour générer le dossier.</p>
        </div>
        <div class="flex items-center gap-2">
          <span class="px-4 py-1.5 rounded-full bg-white/15 backdrop-blur text-white text-sm font-semibold border border-white/20">Formulaire</span>
        </div>
      </div>
    </div>

    <!-- Identity section -->
    <div class="bg-white dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 rounded-2xl shadow-soft overflow-hidden">
      <div class="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200/60 dark:border-slate-700/60 px-6 py-4">
        <div class="flex items-center gap-2">
          <span class="material-icons-round text-primary text-lg">badge</span>
          <p class="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">Identité</p>
        </div>
      </div>
      <div class="p-6">
        <form [formGroup]="form" class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
          <mat-form-field appearance="outline"><mat-label>Prénom</mat-label><input matInput formControlName="firstName"></mat-form-field>
          <mat-form-field appearance="outline"><mat-label>Nom</mat-label><input matInput formControlName="lastName"></mat-form-field>
          <mat-form-field appearance="outline"><mat-label>Date de naissance</mat-label><input matInput type="date" formControlName="dateOfBirth"></mat-form-field>
          <mat-form-field appearance="outline"><mat-label>Genre</mat-label><input matInput formControlName="gender"></mat-form-field>
        </form>
      </div>
    </div>

    <!-- Contact & follow-up section -->
    <div class="bg-white dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 rounded-2xl shadow-soft overflow-hidden">
      <div class="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200/60 dark:border-slate-700/60 px-6 py-4">
        <div class="flex items-center gap-2">
          <span class="material-icons-round text-teal-600 text-lg">contact_phone</span>
          <p class="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">Contact & suivi</p>
        </div>
      </div>
      <div class="p-6">
        <form [formGroup]="form" class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
          <mat-form-field appearance="outline"><mat-label>Téléphone</mat-label><input matInput formControlName="phone"></mat-form-field>
          <mat-form-field appearance="outline"><mat-label>Adresse</mat-label><input matInput formControlName="address"></mat-form-field>
          <mat-form-field appearance="outline"><mat-label>Médecin référent</mat-label><input matInput formControlName="doctorName"></mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Niveau de risque</mat-label>
            <mat-select formControlName="riskLevel">
              <mat-option value="Faible">Faible</mat-option>
              <mat-option value="Moyen">Moyen</mat-option>
              <mat-option value="Élevé">Élevé</mat-option>
            </mat-select>
          </mat-form-field>
          <mat-form-field appearance="outline"><mat-label>Statut</mat-label><input matInput formControlName="status" placeholder="Ex: Modéré, Léger"></mat-form-field>
          <div class="flex items-center px-2 pt-2">
            <mat-checkbox formControlName="familyHistoryAlzheimer">Antécédents familiaux Alzheimer</mat-checkbox>
          </div>
        </form>
      </div>
    </div>

    <!-- Submit -->
    <div class="flex justify-end">
      <button mat-raised-button color="primary" (click)="save()" [disabled]="form.invalid"
        class="!px-8 !py-2.5 !text-sm">
        <span class="material-icons-round text-base mr-1">add_circle</span>
        Créer le dossier
      </button>
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
