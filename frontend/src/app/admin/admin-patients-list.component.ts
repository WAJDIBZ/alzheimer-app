import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminApiService } from '../services/admin-api.service';
import { PatientResponse } from '../models/medical.models';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
  <div class="space-y-6">

    <!-- Page header -->
    <div class="bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 p-6 shadow-soft">
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h3 class="text-xl font-bold text-slate-800 dark:text-white tracking-tight">Patients assignés</h3>
          <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Recherchez et gérez les dossiers de vos patients.</p>
        </div>
        <div class="flex items-center gap-3">
          <div class="relative">
            <span class="material-icons-round absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
            <input [(ngModel)]="search" placeholder="Rechercher un patient..."
              class="pl-10 pr-4 py-2.5 w-full lg:w-72 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm text-slate-700 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
          </div>
          <a routerLink="/admin/patients/new"
            class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:from-blue-700 hover:to-indigo-700 transition-all">
            <span class="material-icons-round text-lg">add</span>
            Nouveau patient
          </a>
        </div>
      </div>
    </div>

    <!-- Stats row -->
    <div class="flex items-center gap-4">
      <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-500 dark:text-slate-400">
        <span class="material-icons-round text-sm">group</span>
        {{ filtered().length }} patients
      </div>
    </div>

    <!-- Patient cards grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
      <div *ngFor="let p of filtered()"
        class="group bg-white dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 rounded-2xl p-5 relative overflow-hidden shadow-card hover:shadow-hover transition-all duration-300">
        <!-- Left indicator bar -->
        <div class="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl transition-all" [ngClass]="indicatorClass(p)"></div>

        <div class="pl-3">
          <!-- Header -->
          <div class="flex items-start justify-between mb-3">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-sm"
                [ngClass]="avatarBgClass(p)">
                {{ p.firstName.charAt(0) }}{{ p.lastName.charAt(0) }}
              </div>
              <div>
                <h4 class="text-base font-bold text-slate-800 dark:text-white leading-tight">{{ p.firstName }} {{ p.lastName }}</h4>
                <p class="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{{ p.doctorName || 'Médecin non assigné' }}</p>
              </div>
            </div>
            <span class="text-xs px-2.5 py-1 rounded-full font-semibold" [ngClass]="statusBadgeClass(p)">{{ p.status || 'Non défini' }}</span>
          </div>

          <!-- Info -->
          <div class="flex items-center gap-3 mb-4">
            <div class="flex items-center gap-1 text-xs">
              <span class="material-icons-round text-sm" [ngClass]="riskTextClass(p)">shield</span>
              <span class="font-semibold" [ngClass]="riskTextClass(p)">{{ riskLabel(p) }}</span>
            </div>
            <div class="w-px h-3 bg-slate-200 dark:bg-slate-700"></div>
            <div class="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
              <span class="material-icons-round text-sm">notifications_none</span>
              0 alertes
            </div>
          </div>

          <!-- Action -->
          <a [routerLink]="['/admin/patients', p.idPatient]"
            class="inline-flex items-center gap-1.5 px-4 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-700/50 text-primary dark:text-blue-400 font-semibold border border-slate-200/60 dark:border-slate-600/60 hover:bg-primary hover:text-white hover:border-primary hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-200">
            <span class="material-icons-round text-base">folder_open</span>
            Ouvrir le dossier
          </a>
        </div>
      </div>
    </div>

    <!-- Empty state -->
    <div *ngIf="filtered().length === 0" class="text-center py-16">
      <div class="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4">
        <span class="material-icons-round text-slate-400 text-3xl">search_off</span>
      </div>
      <p class="text-slate-500 dark:text-slate-400 font-medium">Aucun patient trouvé</p>
      <p class="text-sm text-slate-400 dark:text-slate-500 mt-1">Essayez de modifier vos critères de recherche.</p>
    </div>
  </div>
  `
})
export class AdminPatientsListComponent implements OnInit {
  patients: PatientResponse[] = [];
  search = '';

  constructor(private api: AdminApiService) {}

  ngOnInit() { this.api.getPatients().subscribe((d) => this.patients = d); }

  filtered() {
    const s = this.search.toLowerCase();
    return this.patients.filter(p => `${p.firstName} ${p.lastName}`.toLowerCase().includes(s) || (p.status ?? '').toLowerCase().includes(s));
  }

  indicatorClass(p: PatientResponse) {
    const risk = this.riskLabel(p);
    return risk === 'Élevé' ? 'bg-rose-500' : risk === 'Moyen' ? 'bg-amber-400' : 'bg-emerald-500';
  }

  avatarBgClass(p: PatientResponse) {
    const risk = this.riskLabel(p);
    return risk === 'Élevé' ? 'bg-gradient-to-br from-rose-500 to-pink-600' : risk === 'Moyen' ? 'bg-gradient-to-br from-amber-400 to-orange-500' : 'bg-gradient-to-br from-emerald-500 to-teal-600';
  }

  statusBadgeClass(p: PatientResponse) {
    const risk = this.riskLabel(p);
    if (risk === 'Élevé') return 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800/30';
    if (risk === 'Moyen') return 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800/30';
    return 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/30';
  }

  riskLabel(p: PatientResponse) {
    const s = (p.riskLevel || p.status || '').toLowerCase();
    if (s.includes('élev') || s.includes('severe') || s.includes('crit')) return 'Élevé';
    if (s.includes('moy') || s.includes('mod')) return 'Moyen';
    return 'Faible';
  }

  riskTextClass(p: PatientResponse) {
    const r = this.riskLabel(p);
    if (r === 'Élevé') return 'text-rose-500 dark:text-rose-400';
    if (r === 'Moyen') return 'text-amber-500 dark:text-amber-400';
    return 'text-emerald-500 dark:text-emerald-400';
  }

  doctorLabel(_: PatientResponse) { return 'Médecin référent'; }
}
