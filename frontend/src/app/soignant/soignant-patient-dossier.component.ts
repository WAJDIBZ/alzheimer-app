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

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatTableModule],
  template: `<div class="page" *ngIf="details">
  <mat-card><h3>{{details.patient.firstName}} {{details.patient.lastName}}</h3><p>Date de naissance: {{details.patient.dateOfBirth}} | Statut: {{details.patient.status}}</p></mat-card>
  <mat-card style="margin-top:12px"><h3>Contacts d'urgence</h3><ul><li *ngFor="let c of details.emergencyContacts">{{c.fullName}} - {{c.phone}} ({{c.relationship}})</li></ul></mat-card>
  <mat-card style="margin-top:12px"><h3>Dossier médical</h3><form [formGroup]="recordForm" class="form-grid">
    <mat-form-field><mat-label>Diagnostic</mat-label><input matInput formControlName="diagnosis"></mat-form-field>
    <mat-form-field><mat-label>Stade</mat-label><input matInput formControlName="diseaseStage"></mat-form-field>
    <mat-form-field><mat-label>Historique</mat-label><textarea matInput formControlName="medicalHistory"></textarea></mat-form-field>
    <mat-form-field><mat-label>Allergies</mat-label><input matInput formControlName="allergies"></mat-form-field>
  </form><button mat-raised-button color="primary" (click)="saveRecord()">Mettre à jour</button></mat-card>
  <mat-card style="margin-top:12px"><h3>Traitements</h3><button mat-raised-button (click)="openTreatment()">Ajouter</button>
  <table mat-table [dataSource]="details.treatments"><ng-container matColumnDef="name"><th mat-header-cell *matHeaderCellDef>Nom</th><td mat-cell *matCellDef="let t">{{t.treatmentName}}</td></ng-container>
  <ng-container matColumnDef="status"><th mat-header-cell *matHeaderCellDef>Statut</th><td mat-cell *matCellDef="let t">{{t.status}}</td></ng-container>
  <ng-container matColumnDef="actions"><th mat-header-cell *matHeaderCellDef></th><td mat-cell *matCellDef="let t"><button mat-button (click)="openTreatment(t)">Éditer</button><button mat-button color="warn" (click)="deleteTreatment(t)">Supprimer</button></td></ng-container>
  <tr mat-header-row *matHeaderRowDef="cols"></tr><tr mat-row *matRowDef="let row; columns: cols;"></tr></table></mat-card></div>`
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
