import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SoignantApiService } from '../services/soignant-api.service';
import { PatientDetailsResponse, TreatmentResponse } from '../models/medical.models';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { TreatmentDialogComponent } from '../shared/treatment-dialog.component';
import { MatSelectModule } from '@angular/material/select';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatTableModule, MatSelectModule],
  template: `
  <div *ngIf="details" class="space-y-6 w-full">

    <!-- Patient header card -->
    <div class="bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 p-6 shadow-soft">
      <div class="flex flex-col md:flex-row md:items-center gap-4">
        <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-teal-500/20 shrink-0">
          {{ details.patient.firstName.charAt(0) }}{{ details.patient.lastName.charAt(0) }}
        </div>
        <div class="flex-1 min-w-0">
          <h2 class="text-xl font-bold text-slate-800 dark:text-white tracking-tight mb-1">{{details.patient.firstName}} {{details.patient.lastName}}</h2>
          <div class="flex flex-wrap items-center gap-2">
            <span class="px-2.5 py-0.5 rounded-full bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-400 text-xs font-bold border border-teal-200 dark:border-teal-800/30">{{details.patient.status || 'N/A'}}</span>
            <span class="px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 text-xs font-bold border border-emerald-200 dark:border-emerald-800/30">Risque : {{details.patient.riskLevel || 'Non défini'}}</span>
            <span class="text-xs text-slate-400 dark:text-slate-500">Médecin : {{details.patient.doctorName || 'Non défini'}}</span>
          </div>
          <p class="text-xs text-slate-400 dark:text-slate-500 mt-1">Né(e) le {{details.patient.dateOfBirth}} &middot; Tél. {{details.patient.phone || 'N/A'}}</p>
        </div>
        <button mat-raised-button color="primary" (click)="openTreatment()" class="shrink-0">
          <span class="material-icons-round text-base mr-1">add</span>
          Ajouter un traitement
        </button>
      </div>
    </div>

    <!-- Content grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

      <!-- Emergency contacts -->
      <div class="bg-white dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 rounded-2xl shadow-soft overflow-hidden">
        <div class="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200/60 dark:border-slate-700/60 px-5 py-4">
          <div class="flex items-center gap-2">
            <span class="material-icons-round text-rose-500 text-lg">emergency</span>
            <h3 class="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">Contacts d'urgence</h3>
          </div>
        </div>
        <div class="p-4 space-y-2">
          <div *ngFor="let c of details.emergencyContacts" class="px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-700/60">
            <p class="font-semibold text-sm text-slate-800 dark:text-white">{{c.fullName}}</p>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{{c.relationship}} &middot; {{c.phone}}</p>
          </div>
          <div *ngIf="details.emergencyContacts.length === 0" class="text-center py-6 text-xs text-slate-400">Aucun contact d'urgence</div>
        </div>
      </div>

      <!-- Medical record -->
      <div class="lg:col-span-2 bg-white dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 rounded-2xl shadow-soft overflow-hidden">
        <div class="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200/60 dark:border-slate-700/60 px-5 py-4">
          <div class="flex items-center gap-2">
            <span class="material-icons-round text-primary text-lg">medical_information</span>
            <h3 class="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">Dossier médical</h3>
          </div>
        </div>
        <div class="p-6">
          <form [formGroup]="recordForm" class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
            <mat-form-field appearance="fill">
              <mat-label>Diagnostic</mat-label>
              <input matInput formControlName="diagnosis">
              <mat-error *ngIf="recordForm.get('diagnosis')?.hasError('required')">Le diagnostic est requis</mat-error>
            </mat-form-field>
            <mat-form-field appearance="fill">
              <mat-label>Stade de la maladie</mat-label>
              <mat-select formControlName="diseaseStage">
                <mat-option value="Stade léger">Stade léger</mat-option>
                <mat-option value="Stade modéré">Stade modéré</mat-option>
                <mat-option value="Stade avancé">Stade avancé</mat-option>
                <mat-option value="Stade sévère">Stade sévère</mat-option>
              </mat-select>
            </mat-form-field>
            <mat-form-field appearance="fill" class="md:col-span-2"><mat-label>Historique</mat-label><textarea matInput rows="3" formControlName="medicalHistory"></textarea></mat-form-field>
            <mat-form-field appearance="fill"><mat-label>Allergies</mat-label><input matInput formControlName="allergies"></mat-form-field>
          </form>
          <div class="flex justify-end mt-4 pt-4 border-t border-slate-200/60 dark:border-slate-700/60">
            <button mat-raised-button color="primary" (click)="saveRecord()">
              <span class="material-icons-round text-base mr-1">save</span>
              Mettre à jour
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Treatments table -->
    <div class="bg-white dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 rounded-2xl shadow-soft overflow-hidden">
      <div class="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200/60 dark:border-slate-700/60 px-5 py-4 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="material-icons-round text-violet-500 text-lg">medication</span>
          <h3 class="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">Traitements</h3>
          <span class="text-xs text-slate-400 dark:text-slate-500 ml-1">({{details.treatments.length}})</span>
        </div>
        <button mat-raised-button color="primary" (click)="openTreatment()">
          <span class="material-icons-round text-base mr-1">add</span>
          Ajouter
        </button>
      </div>
      <div class="table-card" style="border:none;border-radius:0;">
        <table mat-table [dataSource]="details.treatments">
          <ng-container matColumnDef="name"><th mat-header-cell *matHeaderCellDef>Nom</th><td mat-cell *matCellDef="let t">{{t.treatmentName}}</td></ng-container>
          <ng-container matColumnDef="status"><th mat-header-cell *matHeaderCellDef>Statut</th><td mat-cell *matCellDef="let t">{{t.status}}</td></ng-container>
          <ng-container matColumnDef="actions"><th mat-header-cell *matHeaderCellDef class="text-right">Actions</th><td mat-cell *matCellDef="let t" class="text-right"><button mat-button color="primary" (click)="openTreatment(t)">Éditer</button><button mat-button color="warn" (click)="deleteTreatment(t)">Supprimer</button></td></ng-container>
          <tr mat-header-row *matHeaderRowDef="cols"></tr><tr mat-row *matRowDef="let row; columns: cols;"></tr>
        </table>
      </div>
    </div>
  </div>
  `
})
export class SoignantPatientDossierComponent implements OnInit {
  id!: number; details!: PatientDetailsResponse; cols = ['name', 'status', 'actions'];
  recordForm = this.fb.group({ diagnosis: ['', Validators.required], diseaseStage: [''], medicalHistory: [''], allergies: [''] });
  constructor(private route: ActivatedRoute, private api: SoignantApiService, private fb: FormBuilder, private dialog: MatDialog) { }
  ngOnInit() { this.id = Number(this.route.snapshot.paramMap.get('id')); this.load(); }
  load() { this.api.getPatient(this.id).subscribe(d => { this.details = d; if (d.medicalRecord) this.recordForm.patchValue(d.medicalRecord); }); }
  saveRecord() { this.api.updateMedicalRecord(this.id, this.recordForm.value as any).subscribe(() => this.load()); }
  openTreatment(t?: TreatmentResponse) { this.dialog.open(TreatmentDialogComponent, { data: t ?? null }).afterClosed().subscribe(v => { if (!v) return; const op = t ? this.api.updateTreatment(this.id, t.idTreatment, v) : this.api.addTreatment(this.id, v); op.subscribe(() => this.load()); }); }
  deleteTreatment(t: TreatmentResponse) { this.api.deleteTreatment(this.id, t.idTreatment).subscribe(() => this.load()); }
}
