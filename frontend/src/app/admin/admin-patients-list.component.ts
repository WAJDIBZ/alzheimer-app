import { Component, OnInit } from '@angular/core';
import { AdminApiService } from '../services/admin-api.service';
import { PatientResponse } from '../models/medical.models';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [RouterLink, MatTableModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule],
  template: `<div class="page">
  <div class="actions"><mat-form-field><mat-label>Recherche</mat-label><input matInput [(ngModel)]="search"></mat-form-field><a mat-raised-button color="primary" routerLink="/admin/patients/new">Nouveau patient</a></div>
  <table mat-table [dataSource]="filtered()" class="mat-elevation-z2">
    <ng-container matColumnDef="name"><th mat-header-cell *matHeaderCellDef>Nom</th><td mat-cell *matCellDef="let p">{{p.firstName}} {{p.lastName}}</td></ng-container>
    <ng-container matColumnDef="status"><th mat-header-cell *matHeaderCellDef>Statut</th><td mat-cell *matCellDef="let p">{{p.status}}</td></ng-container>
    <ng-container matColumnDef="actions"><th mat-header-cell *matHeaderCellDef></th><td mat-cell *matCellDef="let p"><a mat-button [routerLink]="['/admin/patients', p.idPatient]">Détails</a></td></ng-container>
    <tr mat-header-row *matHeaderRowDef="cols"></tr><tr mat-row *matRowDef="let row; columns: cols;"></tr>
  </table></div>`
})
export class AdminPatientsListComponent implements OnInit {
  patients: PatientResponse[] = []; search = ''; cols = ['name', 'status', 'actions'];
  constructor(private api: AdminApiService) {}
  ngOnInit() { this.api.getPatients().subscribe((d) => this.patients = d); }
  filtered() { const s = this.search.toLowerCase(); return this.patients.filter(p => `${p.firstName} ${p.lastName}`.toLowerCase().includes(s)); }
}
