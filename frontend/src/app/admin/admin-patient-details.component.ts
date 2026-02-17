import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminApiService } from '../services/admin-api.service';
import { EmergencyContactResponse, PatientDetailsResponse, TreatmentResponse } from '../models/medical.models';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { ConfirmDialogComponent } from '../shared/confirm-dialog.component';
import { TreatmentDialogComponent } from '../shared/treatment-dialog.component';
import { ContactDialogComponent } from '../shared/contact-dialog.component';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatTabsModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatButtonModule, MatTableModule, MatSnackBarModule, MatDialogModule, MatSelectModule],
  template: `
  <div *ngIf="details" class="space-y-6 w-full">

    <!-- Patient header card -->
    <div class="bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 p-6 shadow-soft">
      <div class="flex flex-col md:flex-row md:items-center gap-4">
        <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-500/20 shrink-0">
          {{ details.patient.firstName.charAt(0) }}{{ details.patient.lastName.charAt(0) }}
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex flex-wrap items-center gap-2 mb-1">
            <h2 class="text-xl font-bold text-slate-800 dark:text-white tracking-tight">{{details.patient.firstName}} {{details.patient.lastName}}</h2>
            <span class="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">ID #{{id}}</span>
            <span class="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold">{{details.patient.status || 'En attente'}}</span>
          </div>
          <p class="text-sm text-slate-500 dark:text-slate-400">Né(e) le {{details.patient.dateOfBirth}} &middot; Créé le {{details.patient.createdAt}}</p>
        </div>
        <button mat-raised-button color="warn" (click)="deletePatient()" class="shrink-0">
          <span class="material-icons-round text-base mr-1">delete_outline</span>
          Supprimer
        </button>
      </div>
    </div>

    <!-- Tabs -->
    <div class="bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 shadow-soft overflow-hidden">
      <mat-tab-group animationDuration="200ms">

        <!-- Profile Tab -->
        <mat-tab>
          <ng-template mat-tab-label>
            <span class="flex items-center gap-2"><span class="material-icons-round text-lg">person</span> Profil</span>
          </ng-template>
          <div class="p-6">
            <div class="bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-700/60 rounded-2xl p-6">
              <div class="flex items-center gap-2 mb-5">
                <span class="material-icons-round text-primary text-lg">badge</span>
                <p class="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">Informations du patient</p>
              </div>
              <form [formGroup]="patientForm" class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                <mat-form-field appearance="outline"><mat-label>Prénom</mat-label><input matInput formControlName="firstName"></mat-form-field>
                <mat-form-field appearance="outline"><mat-label>Nom</mat-label><input matInput formControlName="lastName"></mat-form-field>
                <mat-form-field appearance="outline"><mat-label>Date de naissance</mat-label><input matInput type="date" formControlName="dateOfBirth"></mat-form-field>
                <mat-form-field appearance="outline"><mat-label>Genre</mat-label><input matInput formControlName="gender"></mat-form-field>
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
                <mat-form-field appearance="outline"><mat-label>Statut</mat-label><input matInput formControlName="status"></mat-form-field>
                <div class="flex items-center px-2 pt-2">
                  <mat-checkbox formControlName="familyHistoryAlzheimer">Antécédents familiaux Alzheimer</mat-checkbox>
                </div>
              </form>
              <div class="flex justify-end mt-5 pt-4 border-t border-slate-200/60 dark:border-slate-700/60">
                <button mat-raised-button color="primary" (click)="savePatient()">
                  <span class="material-icons-round text-base mr-1">save</span>
                  Enregistrer
                </button>
              </div>
            </div>
          </div>
        </mat-tab>

        <!-- Medical Record Tab -->
        <mat-tab>
          <ng-template mat-tab-label>
            <span class="flex items-center gap-2"><span class="material-icons-round text-lg">description</span> Dossier médical</span>
          </ng-template>
          <div class="p-6">
            <div class="bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-700/60 rounded-2xl p-6">
              <div class="flex items-center gap-2 mb-5">
                <span class="material-icons-round text-primary text-lg">medical_information</span>
                <p class="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">Dossier médical</p>
              </div>
              <form [formGroup]="recordForm" class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                <mat-form-field appearance="outline"><mat-label>Diagnostic</mat-label><input matInput formControlName="diagnosis"></mat-form-field>
                <mat-form-field appearance="outline"><mat-label>Stade</mat-label><input matInput formControlName="diseaseStage"></mat-form-field>
                <mat-form-field appearance="outline" class="md:col-span-2"><mat-label>Historique</mat-label><textarea matInput rows="3" formControlName="medicalHistory"></textarea></mat-form-field>
                <mat-form-field appearance="outline"><mat-label>Allergies</mat-label><input matInput formControlName="allergies"></mat-form-field>
              </form>
              <div class="flex justify-end mt-5 pt-4 border-t border-slate-200/60 dark:border-slate-700/60">
                <button mat-raised-button color="primary" (click)="saveRecord()">
                  <span class="material-icons-round text-base mr-1">save</span>
                  Enregistrer le dossier
                </button>
              </div>
            </div>
          </div>
        </mat-tab>

        <!-- Treatments Tab -->
        <mat-tab>
          <ng-template mat-tab-label>
            <span class="flex items-center gap-2"><span class="material-icons-round text-lg">medication</span> Traitements</span>
          </ng-template>
          <div class="p-6 space-y-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="material-icons-round text-primary text-lg">medication</span>
                <span class="text-sm font-bold text-slate-600 dark:text-slate-300">{{details.treatments.length}} traitement(s) actif(s)</span>
              </div>
              <button mat-raised-button color="primary" (click)="openTreatment()">
                <span class="material-icons-round text-base mr-1">add</span>
                Ajouter
              </button>
            </div>
            <div class="table-card">
              <table mat-table [dataSource]="details.treatments">
                <ng-container matColumnDef="name"><th mat-header-cell *matHeaderCellDef>Nom</th><td mat-cell *matCellDef="let t">{{t.treatmentName}}</td></ng-container>
                <ng-container matColumnDef="dates"><th mat-header-cell *matHeaderCellDef>Période</th><td mat-cell *matCellDef="let t">{{t.startDate}} — {{t.endDate || '...'}}</td></ng-container>
                <ng-container matColumnDef="actions"><th mat-header-cell *matHeaderCellDef class="text-right">Actions</th><td mat-cell *matCellDef="let t" class="text-right"><button mat-button color="primary" (click)="openTreatment(t)">Éditer</button><button mat-button color="warn" (click)="deleteTreatment(t)">Supprimer</button></td></ng-container>
                <tr mat-header-row *matHeaderRowDef="tCols"></tr><tr mat-row *matRowDef="let row; columns: tCols;"></tr>
              </table>
            </div>
          </div>
        </mat-tab>

        <!-- Emergency Contacts Tab -->
        <mat-tab>
          <ng-template mat-tab-label>
            <span class="flex items-center gap-2"><span class="material-icons-round text-lg">emergency</span> Contacts d'urgence</span>
          </ng-template>
          <div class="p-6 space-y-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="material-icons-round text-primary text-lg">emergency</span>
                <span class="text-sm font-bold text-slate-600 dark:text-slate-300">{{details.emergencyContacts.length}} contact(s)</span>
              </div>
              <button mat-raised-button color="primary" (click)="openContact()">
                <span class="material-icons-round text-base mr-1">add</span>
                Ajouter
              </button>
            </div>
            <div class="table-card">
              <table mat-table [dataSource]="details.emergencyContacts">
                <ng-container matColumnDef="name"><th mat-header-cell *matHeaderCellDef>Nom</th><td mat-cell *matCellDef="let c">{{c.fullName}}</td></ng-container>
                <ng-container matColumnDef="phone"><th mat-header-cell *matHeaderCellDef>Téléphone</th><td mat-cell *matCellDef="let c">{{c.phone}}</td></ng-container>
                <ng-container matColumnDef="actions"><th mat-header-cell *matHeaderCellDef class="text-right">Actions</th><td mat-cell *matCellDef="let c" class="text-right"><button mat-button color="primary" (click)="openContact(c)">Éditer</button><button mat-button color="warn" (click)="deleteContact(c)">Supprimer</button></td></ng-container>
                <tr mat-header-row *matHeaderRowDef="cCols"></tr><tr mat-row *matRowDef="let row; columns: cCols;"></tr>
              </table>
            </div>
          </div>
        </mat-tab>

      </mat-tab-group>
    </div>
  </div>
  `
})
export class AdminPatientDetailsComponent implements OnInit {
  id!: number; details!: PatientDetailsResponse; tCols=['name','dates','actions']; cCols=['name','phone','actions'];
  patientForm = this.fb.group({firstName:['',Validators.required],lastName:['',Validators.required],dateOfBirth:['',Validators.required],gender:[''],phone:[''],address:[''],doctorName:[''],riskLevel:[''],familyHistoryAlzheimer:[false],status:['']});
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
