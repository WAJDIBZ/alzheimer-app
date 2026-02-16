import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SoignantApiService } from '../services/soignant-api.service';
import { PatientDetailsResponse, TreatmentResponse } from '../models/medical.models';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
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
  <div class="page" *ngIf="details">
    <div class="max-w-5xl w-full mx-auto bg-card-light dark:bg-card-dark border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-soft space-y-4">
      <div class="flex flex-wrap items-center gap-3">
        <div class="flex items-center gap-2">
          <span class="material-icons text-purple-800">medication</span>
          <h2 class="text-xl font-bold text-gray-800 dark:text-white">{{details.patient.firstName}} {{details.patient.lastName}}</h2>
        </div>
        <span class="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold dark:bg-blue-900/30 dark:text-blue-100">Statut : {{details.patient.status || 'N/A'}}</span>
        <span class="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-sm font-semibold dark:bg-emerald-900/30 dark:text-emerald-100">Risque : {{details.patient.riskLevel || 'Non défini'}}</span>
        <span class="text-sm text-gray-500 dark:text-gray-400">Médecin : {{details.patient.doctorName || 'Non défini'}}</span>
        <span class="flex-1"></span>
        <button mat-raised-button color="primary" (click)="openTreatment()">Ajouter un traitement</button>
      </div>
      <p class="text-sm text-gray-600 dark:text-gray-300">Né(e) le {{details.patient.dateOfBirth}} · Téléphone {{details.patient.phone || 'N/A'}}</p>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <mat-card class="col-span-1 bg-card-light dark:bg-card-dark border border-gray-200 dark:border-gray-700">
          <h3 class="text-md font-semibold mb-3">Contacts d'urgence</h3>
          <ul class="space-y-2">
            <li *ngFor="let c of details.emergencyContacts" class="px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex flex-col">
              <span class="font-semibold">{{c.fullName}}</span>
              <span class="text-sm text-gray-500 dark:text-gray-400">{{c.relationship}} · {{c.phone}}</span>
            </li>
          </ul>
        </mat-card>

        <mat-card class="col-span-1 lg:col-span-2 bg-card-light dark:bg-card-dark border border-gray-200 dark:border-gray-700">
          <h3 class="text-md font-semibold mb-3">Dossier médical</h3>
          <form [formGroup]="recordForm" class="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            <mat-form-field appearance="outline" class="w-full"><mat-label>Diagnostic</mat-label><input matInput formControlName="diagnosis"></mat-form-field>
            <mat-form-field appearance="outline" class="w-full"><mat-label>Stade</mat-label><input matInput formControlName="diseaseStage"></mat-form-field>
            <mat-form-field appearance="outline" class="md:col-span-2 w-full"><mat-label>Historique</mat-label><textarea matInput formControlName="medicalHistory"></textarea></mat-form-field>
            <mat-form-field appearance="outline" class="w-full"><mat-label>Allergies</mat-label><input matInput formControlName="allergies"></mat-form-field>
          </form>
          <div class="flex justify-end mt-3">
            <button mat-raised-button color="primary" (click)="saveRecord()">Mettre à jour</button>
          </div>
        </mat-card>
      </div>

      <mat-card class="bg-card-light dark:bg-card-dark border border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-md font-semibold">Traitements</h3>
          <button mat-stroked-button color="primary" (click)="openTreatment()">Ajouter</button>
        </div>
        <div class="table-card">
          <table mat-table [dataSource]="details.treatments">
            <ng-container matColumnDef="name"><th mat-header-cell *matHeaderCellDef>Nom</th><td mat-cell *matCellDef="let t">{{t.treatmentName}}</td></ng-container>
            <ng-container matColumnDef="status"><th mat-header-cell *matHeaderCellDef>Statut</th><td mat-cell *matCellDef="let t">{{t.status}}</td></ng-container>
            <ng-container matColumnDef="actions"><th mat-header-cell *matHeaderCellDef></th><td mat-cell *matCellDef="let t"><button mat-button (click)="openTreatment(t)">Éditer</button><button mat-button color="warn" (click)="deleteTreatment(t)">Supprimer</button></td></ng-container>
            <tr mat-header-row *matHeaderRowDef="cols"></tr><tr mat-row *matRowDef="let row; columns: cols;"></tr>
          </table>
        </div>
      </mat-card>
    </div>
  </div>
  `
})
export class SoignantPatientDossierComponent implements OnInit {
  id!: number; details!: PatientDetailsResponse; cols=['name','status','actions'];
  recordForm = this.fb.group({diagnosis:[''],diseaseStage:[''],medicalHistory:[''],allergies:['']});
  constructor(private route: ActivatedRoute, private api: SoignantApiService, private fb: FormBuilder, private dialog: MatDialog) {}
  ngOnInit(){ this.id=Number(this.route.snapshot.paramMap.get('id')); this.load(); }
  load(){ this.api.getPatient(this.id).subscribe(d=>{this.details=d; if(d.medicalRecord) this.recordForm.patchValue(d.medicalRecord);}); }
  saveRecord(){ this.api.updateMedicalRecord(this.id,this.recordForm.value as any).subscribe(()=>this.load()); }
  openTreatment(t?: TreatmentResponse){ this.dialog.open(TreatmentDialogComponent,{data:t??null}).afterClosed().subscribe(v=>{if(!v)return; const op=t?this.api.updateTreatment(this.id,t.idTreatment,v):this.api.addTreatment(this.id,v); op.subscribe(()=>this.load());}); }
  deleteTreatment(t: TreatmentResponse){ this.api.deleteTreatment(this.id,t.idTreatment).subscribe(()=>this.load()); }
}
