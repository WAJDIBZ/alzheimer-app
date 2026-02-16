import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminApiService } from '../services/admin-api.service';
import { EmergencyContactResponse, MedicalRecordResponse, PatientDetailsResponse, TreatmentResponse } from '../models/medical.models';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../shared/confirm-dialog.component';
import { TreatmentDialogComponent } from '../shared/treatment-dialog.component';
import { ContactDialogComponent } from '../shared/contact-dialog.component';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatTabsModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatButtonModule, MatTableModule, MatSnackBarModule, MatDialogModule],
  template: `<div class="page" *ngIf="details">
  <h2>Patient #{{id}}</h2>
  <div class="actions"><button mat-stroked-button color="warn" (click)="deletePatient()">Supprimer patient</button></div>
  <mat-tab-group>
    <mat-tab label="Patient"><form [formGroup]="patientForm" class="form-grid">
      <mat-form-field><mat-label>Prénom</mat-label><input matInput formControlName="firstName"></mat-form-field>
      <mat-form-field><mat-label>Nom</mat-label><input matInput formControlName="lastName"></mat-form-field>
      <mat-form-field><mat-label>Date de naissance</mat-label><input matInput type="date" formControlName="dateOfBirth"></mat-form-field>
      <mat-form-field><mat-label>Genre</mat-label><input matInput formControlName="gender"></mat-form-field>
      <mat-form-field><mat-label>Téléphone</mat-label><input matInput formControlName="phone"></mat-form-field>
      <mat-form-field><mat-label>Adresse</mat-label><input matInput formControlName="address"></mat-form-field>
      <mat-form-field><mat-label>Statut</mat-label><input matInput formControlName="status"></mat-form-field>
      <mat-checkbox formControlName="familyHistoryAlzheimer">Antécédents familiaux Alzheimer</mat-checkbox>
    </form><div class="actions"><button mat-raised-button color="primary" (click)="savePatient()">Enregistrer</button></div></mat-tab>

    <mat-tab label="Medical Record"><form [formGroup]="recordForm" class="form-grid">
      <mat-form-field><mat-label>Diagnostic</mat-label><input matInput formControlName="diagnosis"></mat-form-field>
      <mat-form-field><mat-label>Stade</mat-label><input matInput formControlName="diseaseStage"></mat-form-field>
      <mat-form-field><mat-label>Historique</mat-label><textarea matInput formControlName="medicalHistory"></textarea></mat-form-field>
      <mat-form-field><mat-label>Allergies</mat-label><input matInput formControlName="allergies"></mat-form-field>
    </form><div class="actions"><button mat-raised-button color="primary" (click)="saveRecord()">Sauvegarder dossier</button></div></mat-tab>

    <mat-tab label="Treatments"><div class="actions"><button mat-raised-button (click)="openTreatment()">Ajouter</button></div>
      <table mat-table [dataSource]="details.treatments"><ng-container matColumnDef="name"><th mat-header-cell *matHeaderCellDef>Nom</th><td mat-cell *matCellDef="let t">{{t.treatmentName}}</td></ng-container>
      <ng-container matColumnDef="dates"><th mat-header-cell *matHeaderCellDef>Période</th><td mat-cell *matCellDef="let t">{{t.startDate}} - {{t.endDate || '...'}}</td></ng-container>
      <ng-container matColumnDef="actions"><th mat-header-cell *matHeaderCellDef></th><td mat-cell *matCellDef="let t"><button mat-button (click)="openTreatment(t)">Éditer</button><button mat-button color="warn" (click)="deleteTreatment(t)">Supprimer</button></td></ng-container>
      <tr mat-header-row *matHeaderRowDef="tCols"></tr><tr mat-row *matRowDef="let row; columns: tCols;"></tr></table>
    </mat-tab>

    <mat-tab label="Emergency Contacts"><div class="actions"><button mat-raised-button (click)="openContact()">Ajouter</button></div>
      <table mat-table [dataSource]="details.emergencyContacts"><ng-container matColumnDef="name"><th mat-header-cell *matHeaderCellDef>Nom</th><td mat-cell *matCellDef="let c">{{c.fullName}}</td></ng-container>
      <ng-container matColumnDef="phone"><th mat-header-cell *matHeaderCellDef>Téléphone</th><td mat-cell *matCellDef="let c">{{c.phone}}</td></ng-container>
      <ng-container matColumnDef="actions"><th mat-header-cell *matHeaderCellDef></th><td mat-cell *matCellDef="let c"><button mat-button (click)="openContact(c)">Éditer</button><button mat-button color="warn" (click)="deleteContact(c)">Supprimer</button></td></ng-container>
      <tr mat-header-row *matHeaderRowDef="cCols"></tr><tr mat-row *matRowDef="let row; columns: cCols;"></tr></table>
    </mat-tab>
  </mat-tab-group></div>`
})
export class AdminPatientDetailsComponent implements OnInit {
  id!: number; details!: PatientDetailsResponse; tCols=['name','dates','actions']; cCols=['name','phone','actions'];
  patientForm = this.fb.group({firstName:['',Validators.required],lastName:['',Validators.required],dateOfBirth:['',Validators.required],gender:[''],phone:[''],address:[''],familyHistoryAlzheimer:[false],status:['']});
  recordForm = this.fb.group({diagnosis:[''],diseaseStage:[''],medicalHistory:[''],allergies:['']});
  constructor(private route: ActivatedRoute, private api: AdminApiService, private fb: FormBuilder, private snack: MatSnackBar, private dialog: MatDialog, private router: Router) {}
  ngOnInit(){ this.id = Number(this.route.snapshot.paramMap.get('id')); this.load(); }
  load(){ this.api.getPatient(this.id).subscribe(d=>{this.details=d; this.patientForm.patchValue(d.patient as any); if(d.medicalRecord) this.recordForm.patchValue(d.medicalRecord);}); }
  savePatient(){ this.api.updatePatient(this.id, this.patientForm.value as any).subscribe(()=>{this.snack.open('Patient mis à jour','OK',{duration:1500}); this.load();}); }
  saveRecord(){ const req=this.recordForm.value as any; const op = this.details.medicalRecord ? this.api.updateMedicalRecord(this.id,req) : this.api.createMedicalRecord(this.id,req); op.subscribe(()=>{this.snack.open('Dossier sauvegardé','OK',{duration:1500}); this.load();}); }
  deletePatient(){ const ref=this.dialog.open(ConfirmDialogComponent,{data:{message:'Supprimer ce patient ?'}}); ref.afterClosed().subscribe(ok=>{if(ok){this.api.deletePatient(this.id).subscribe(()=>{this.router.navigate(['/admin/patients']);});}}); }
  openTreatment(t?: TreatmentResponse){ this.dialog.open(TreatmentDialogComponent,{data:t??null}).afterClosed().subscribe(v=>{if(!v)return; const op=t?this.api.updateTreatment(this.id,t.idTreatment,v):this.api.addTreatment(this.id,v); op.subscribe(()=>this.load());}); }
  deleteTreatment(t: TreatmentResponse){ this.api.deleteTreatment(this.id,t.idTreatment).subscribe(()=>this.load()); }
  openContact(c?: EmergencyContactResponse){ this.dialog.open(ContactDialogComponent,{data:c??null}).afterClosed().subscribe(v=>{if(!v)return; const op=c?this.api.updateContact(this.id,c.idContact,v):this.api.addContact(this.id,v); op.subscribe(()=>this.load());}); }
  deleteContact(c: EmergencyContactResponse){ this.api.deleteContact(this.id,c.idContact).subscribe(()=>this.load()); }
}
