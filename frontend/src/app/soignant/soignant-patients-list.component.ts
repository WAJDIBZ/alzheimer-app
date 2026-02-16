import { Component, OnInit } from '@angular/core';
import { SoignantApiService } from '../services/soignant-api.service';
import { PatientResponse } from '../models/medical.models';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  imports: [RouterLink, MatTableModule, MatButtonModule],
  template: `<div class="page"><h2>Patients</h2>
  <table mat-table [dataSource]="patients" class="mat-elevation-z2">
    <ng-container matColumnDef="name"><th mat-header-cell *matHeaderCellDef>Nom</th><td mat-cell *matCellDef="let p">{{p.firstName}} {{p.lastName}}</td></ng-container>
    <ng-container matColumnDef="status"><th mat-header-cell *matHeaderCellDef>Statut</th><td mat-cell *matCellDef="let p">{{p.status}}</td></ng-container>
    <ng-container matColumnDef="actions"><th mat-header-cell *matHeaderCellDef></th><td mat-cell *matCellDef="let p"><a mat-button [routerLink]="['/soignant/patients', p.idPatient]">Ouvrir dossier</a></td></ng-container>
    <tr mat-header-row *matHeaderRowDef="cols"></tr><tr mat-row *matRowDef="let row; columns: cols;"></tr></table></div>`
})
export class SoignantPatientsListComponent implements OnInit {
  patients: PatientResponse[] = []; cols = ['name','status','actions'];
  constructor(private api: SoignantApiService) {}
  ngOnInit(){ this.api.getPatients().subscribe(d=>this.patients=d); }
}
