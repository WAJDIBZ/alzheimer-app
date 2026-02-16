import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SoignantApiService } from '../services/soignant-api.service';
import { PatientResponse } from '../models/medical.models';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
  <div class="page-center">
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
      <div>
        <h3 class="text-lg font-bold text-gray-800 dark:text-gray-100 mb-1">Patients assignés</h3>
        <p class="text-sm text-gray-500 dark:text-gray-400">Suivez les dossiers en cours et l'état des patients.</p>
      </div>
      <div class="text-sm text-gray-500 dark:text-gray-400">Total : {{ patients.length }} patients</div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      <div *ngFor="let p of patients" class="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-5 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div class="absolute left-0 top-0 bottom-0 w-1.5 rounded-l-lg" [ngClass]="indicatorClass(p)"></div>
        <div class="ml-2">
          <div class="flex items-center justify-between mb-2">
            <h4 class="text-lg font-bold text-gray-900 dark:text-white truncate">{{ p.firstName }} {{ p.lastName }}</h4>
            <span class="text-xs px-2 py-1 rounded font-medium" [ngClass]="statusBadgeClass(p)">{{ p.status || 'Non défini' }}</span>
          </div>
          <div class="space-y-1.5 mb-3 text-sm text-gray-600 dark:text-gray-300">
            <p>
              <span class="font-medium text-gray-500 dark:text-gray-400">Risque :</span>
              <span class="font-semibold" [ngClass]="riskTextClass(p)">{{ riskLabel(p) }}</span>
              <span class="mx-1">·</span>
              <span class="text-gray-500 dark:text-gray-400">Médecin :</span> {{ p.doctorName || 'Non défini' }}
            </p>
            <p>
              <span class="font-medium text-gray-500 dark:text-gray-400">Alertes aujourd'hui :</span> 0
            </p>
          </div>
          <div class="flex items-center gap-2">
            <a [routerLink]="['/soignant/patients', p.idPatient]" class="px-3 py-2 text-sm rounded-lg bg-primary text-white font-medium hover:shadow-md transition">Ouvrir le dossier</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  `
})
export class SoignantPatientsListComponent implements OnInit {
  patients: PatientResponse[] = [];

  constructor(private api: SoignantApiService) {}
  ngOnInit(){ this.api.getPatients().subscribe(d=>this.patients=d); }

  riskLabel(p: PatientResponse) {
    const s = (p.riskLevel || p.status || '').toLowerCase();
    if (s.includes('élev') || s.includes('severe') || s.includes('crit')) return 'Élevé';
    if (s.includes('moy') || s.includes('mod')) return 'Moyen';
    return 'Faible';
  }
  indicatorClass(p: PatientResponse) {
    const risk = this.riskLabel(p);
    return risk === 'Élevé' ? 'bg-red-500' : risk === 'Moyen' ? 'bg-yellow-500' : 'bg-emerald-500';
  }
  statusBadgeClass(p: PatientResponse) {
    const risk = this.riskLabel(p);
    if (risk === 'Élevé') return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200';
    if (risk === 'Moyen') return 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300';
    return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
  }
  riskTextClass(p: PatientResponse) {
    const r = this.riskLabel(p);
    if (r === 'Élevé') return 'text-red-600 dark:text-red-400';
    if (r === 'Moyen') return 'text-yellow-600 dark:text-yellow-400';
    return 'text-emerald-600 dark:text-emerald-400';
  }
  doctorLabel(_: PatientResponse) { return 'Médecin référent'; }
}
