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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSnackBarModule, MatCardModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatButtonModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule],
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
          <mat-form-field appearance="fill">
            <mat-label>Prénom</mat-label>
            <input matInput formControlName="firstName">
            <mat-error *ngIf="form.get('firstName')?.hasError('required')">Le prénom est requis</mat-error>
          </mat-form-field>
          <mat-form-field appearance="fill">
            <mat-label>Nom</mat-label>
            <input matInput formControlName="lastName">
            <mat-error *ngIf="form.get('lastName')?.hasError('required')">Le nom est requis</mat-error>
          </mat-form-field>
          <mat-form-field appearance="fill">
            <mat-label>Date de naissance</mat-label>
            <input matInput [matDatepicker]="dobPicker" formControlName="dateOfBirth" [min]="minDob" [max]="maxDob" (click)="dobPicker.open()">
            <mat-datepicker-toggle matIconSuffix [for]="dobPicker"></mat-datepicker-toggle>
            <mat-datepicker #dobPicker></mat-datepicker>
            <mat-error *ngIf="form.get('dateOfBirth')?.hasError('required')">La date de naissance est requise</mat-error>
            <mat-error *ngIf="form.get('dateOfBirth')?.hasError('matDatepickerMin')">L'âge maximum est 120 ans</mat-error>
            <mat-error *ngIf="form.get('dateOfBirth')?.hasError('matDatepickerMax')">L'âge minimum est 30 ans</mat-error>
          </mat-form-field>
          <mat-form-field appearance="fill">
            <mat-label>Genre</mat-label>
            <mat-select formControlName="gender">
              <mat-option value="Homme">Homme</mat-option>
              <mat-option value="Femme">Femme</mat-option>
            </mat-select>
            <mat-error *ngIf="form.get('gender')?.hasError('required')">Le genre est requis</mat-error>
          </mat-form-field>
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
          <mat-form-field appearance="fill">
            <mat-label>Téléphone</mat-label>
            <input matInput formControlName="phone" placeholder="12345678" maxlength="8">
            <mat-error *ngIf="form.get('phone')?.hasError('required')">Le téléphone est requis</mat-error>
            <mat-error *ngIf="form.get('phone')?.hasError('pattern')">Exactement 8 chiffres requis</mat-error>
          </mat-form-field>
          <mat-form-field appearance="fill">
            <mat-label>Adresse</mat-label>
            <input matInput formControlName="address">
          </mat-form-field>
          <mat-form-field appearance="fill">
            <mat-label>Médecin référent</mat-label>
            <input matInput formControlName="doctorName">
          </mat-form-field>
          <mat-form-field appearance="fill">
            <mat-label>Niveau de risque</mat-label>
            <mat-select formControlName="riskLevel">
              <mat-option value="Faible">Faible</mat-option>
              <mat-option value="Moyen">Moyen</mat-option>
              <mat-option value="Élevé">Élevé</mat-option>
            </mat-select>
          </mat-form-field>
          <mat-form-field appearance="fill">
            <mat-label>Statut</mat-label>
            <mat-select formControlName="status">
              <mat-option value="Suivi régulier">Suivi régulier</mat-option>
              <mat-option value="Hospitalisé">Hospitalisé</mat-option>
              <mat-option value="En observation">En observation</mat-option>
              <mat-option value="Sortie">Sortie</mat-option>
            </mat-select>
          </mat-form-field>
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
  // Age limits: 30-120 years
  minDob = new Date(new Date().getFullYear() - 120, 0, 1);
  maxDob = new Date(new Date().getFullYear() - 30, new Date().getMonth(), new Date().getDate());

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    gender: ['', Validators.required],
    phone: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
    address: [''],
    doctorName: [''],
    riskLevel: [''],
    familyHistoryAlzheimer: [false],
    status: ['']
  });
  constructor(private fb: FormBuilder, private api: AdminApiService, private snack: MatSnackBar, private router: Router) { }
  save() { this.api.createPatient(this.form.value as any).subscribe({ next: r => { this.snack.open('Patient créé', 'OK', { duration: 2000 }); this.router.navigate(['/admin/patients', r.idPatient]); }, error: e => this.snack.open(e.error?.message || 'Erreur', 'OK') }); }
}
