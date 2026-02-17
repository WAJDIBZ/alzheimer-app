import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
  <div class="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">

    <!-- Top nav bar -->
    <nav class="w-full px-6 py-4 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
          <span class="material-icons text-white text-xl">psychology</span>
        </div>
        <span class="text-lg font-bold text-slate-800 dark:text-white tracking-tight">Alzheimer<span class="text-primary">App</span></span>
      </div>
      <div class="flex items-center gap-2">
        <button (click)="toggleDark()" class="w-9 h-9 rounded-lg bg-white/60 dark:bg-slate-800/60 backdrop-blur border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-white dark:hover:bg-slate-700 transition-all">
          <span class="material-icons-round text-slate-500 dark:text-slate-400 text-lg block dark:hidden">dark_mode</span>
          <span class="material-icons-round text-slate-500 dark:text-slate-400 text-lg hidden dark:block">light_mode</span>
        </button>
      </div>
    </nav>

    <!-- Hero -->
    <main class="flex-1 flex items-center justify-center px-4 py-8">
      <div class="w-full max-w-4xl animate-fade-in">

        <!-- Hero card -->
        <div class="bg-white dark:bg-slate-800/80 rounded-3xl shadow-elevated dark:shadow-none dark:border dark:border-slate-700/50 backdrop-blur-sm p-8 md:p-14 transition-all duration-300">
          <div class="text-center mb-12">
            <div class="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-primary uppercase bg-blue-50 dark:bg-blue-900/20 rounded-full border border-blue-100 dark:border-blue-800/30">
              <span class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              Plateforme Médicale
            </div>
            <h1 class="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-5 leading-tight tracking-tight">
              Choisissez votre<br><span class="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">espace de travail</span>
            </h1>
            <p class="text-slate-500 dark:text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
              Accédez au tableau de bord pour gérer les dossiers patients et assurer un suivi médical optimal.
            </p>
          </div>

          <!-- Role cards -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">

            <!-- Admin card -->
            <a routerLink="/admin/patients" class="group relative flex flex-col p-7 bg-gradient-to-br from-slate-50 to-white dark:from-slate-700/50 dark:to-slate-800/50 border-2 border-slate-100 dark:border-slate-700 hover:border-primary dark:hover:border-primary rounded-2xl shadow-card hover:shadow-hover transition-all duration-300 cursor-pointer overflow-hidden">
              <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/5 to-transparent rounded-bl-full group-hover:w-40 group-hover:h-40 transition-all duration-500"></div>
              <div class="relative z-10">
                <div class="w-14 h-14 mb-5 flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg shadow-blue-500/20 text-white group-hover:scale-105 group-hover:shadow-blue-500/30 transition-all duration-300">
                  <span class="material-icons-round text-2xl">admin_panel_settings</span>
                </div>
                <h2 class="text-xl font-bold text-slate-800 dark:text-white mb-2 group-hover:text-primary transition-colors">Espace Admin</h2>
                <p class="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-5">Configuration, gestion des patients, paramètres globaux et supervision.</p>
                <div class="flex items-center text-primary font-semibold text-sm opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                  Accéder
                  <span class="material-icons-round text-base ml-1 group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </div>
              </div>
            </a>

            <!-- Soignant card -->
            <a routerLink="/soignant/patients" class="group relative flex flex-col p-7 bg-gradient-to-br from-slate-50 to-white dark:from-slate-700/50 dark:to-slate-800/50 border-2 border-slate-100 dark:border-slate-700 hover:border-teal-500 dark:hover:border-teal-500 rounded-2xl shadow-card hover:shadow-hover transition-all duration-300 cursor-pointer overflow-hidden">
              <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-500/5 to-transparent rounded-bl-full group-hover:w-40 group-hover:h-40 transition-all duration-500"></div>
              <div class="relative z-10">
                <div class="w-14 h-14 mb-5 flex items-center justify-center bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl shadow-lg shadow-teal-500/20 text-white group-hover:scale-105 group-hover:shadow-teal-500/30 transition-all duration-300">
                  <span class="material-icons-round text-2xl">medical_services</span>
                </div>
                <h2 class="text-xl font-bold text-slate-800 dark:text-white mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">Espace Soignant</h2>
                <p class="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-5">Suivi des patients, gestion des dossiers médicaux et traitements.</p>
                <div class="flex items-center text-teal-600 dark:text-teal-400 font-semibold text-sm opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                  Accéder aux dossiers
                  <span class="material-icons-round text-base ml-1 group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </div>
              </div>
            </a>

          </div>
        </div>

        <!-- Footer -->
        <div class="mt-8 text-center">
          <p class="text-xs text-slate-400 dark:text-slate-600">&copy; 2025 AlzheimerApp &middot; Plateforme de suivi médical &middot; Tous droits réservés</p>
        </div>
      </div>
    </main>
  </div>
  `,
  styles: [`
    @keyframes fade-in-up {
      from { opacity: 0; transform: translateY(16px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in { animation: fade-in-up 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
  `]
})
export class HomeComponent {
  toggleDark() { document.documentElement.classList.toggle('dark'); }
}
