import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
  <div class="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark transition-colors duration-200">

    <!-- Sidebar -->
    <aside class="w-[272px] bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800 flex flex-col h-full shrink-0 z-20 transition-colors duration-200">

      <!-- Logo -->
      <div class="px-6 py-5 flex items-center gap-3 border-b border-slate-100 dark:border-slate-800">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-teal-500/20">
          <span class="material-icons text-white text-xl">psychology</span>
        </div>
        <div>
          <h1 class="text-base font-extrabold text-slate-800 dark:text-white tracking-tight leading-none">Alzheimer<span class="text-teal-600 dark:text-teal-400">App</span></h1>
          <p class="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-0.5">Espace Soignant</p>
        </div>
      </div>

      <!-- Navigation -->
      <div class="flex-1 overflow-y-auto custom-scrollbar px-3 pt-5 pb-3">
        <p class="px-3 mb-2 text-[10px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest">Navigation</p>
        <nav class="space-y-1">
          <a routerLink="/" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-teal-600 transition-all duration-150 group">
            <span class="material-icons-round text-[20px] text-amber-500 group-hover:scale-110 transition-transform">home</span>
            <span class="font-medium text-sm">Accueil</span>
          </a>
          <a routerLink="/soignant/patients" routerLinkActive="!bg-teal-50 dark:!bg-teal-900/20 !text-teal-600 dark:!text-teal-400 !font-semibold" [routerLinkActiveOptions]="{exact:true}" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-teal-600 transition-all duration-150 group relative">
            <span class="material-icons-round text-[20px] text-indigo-500 group-hover:scale-110 transition-transform">people</span>
            <span class="text-sm">Mes Patients</span>
          </a>
        </nav>
      </div>

      <!-- User card -->
      <div class="p-4 border-t border-slate-100 dark:border-slate-800">
        <div class="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-800/60 rounded-xl p-3 flex items-center gap-3 border border-slate-200/60 dark:border-slate-700/60">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">M</div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-bold text-slate-800 dark:text-white truncate">Marie Martin</p>
            <p class="text-xs text-slate-400 dark:text-slate-500 truncate">Soignant</p>
          </div>
          <span class="material-icons-round text-slate-400 text-lg">more_horiz</span>
        </div>
      </div>
    </aside>

    <!-- Main content -->
    <main class="flex-1 flex flex-col h-full min-w-0 overflow-hidden">

      <!-- Top bar -->
      <header class="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 h-16 flex items-center justify-between px-8 shrink-0">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center">
            <span class="material-icons-round text-teal-600 dark:text-teal-400 text-lg">medical_services</span>
          </div>
          <div>
            <h2 class="text-base font-bold text-slate-800 dark:text-white leading-none">Espace Soignant</h2>
            <p class="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Suivi des patients</p>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <button (click)="toggleDark()" class="w-9 h-9 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700 transition-all">
            <span class="material-icons-round text-slate-500 text-lg block dark:hidden">dark_mode</span>
            <span class="material-icons-round text-slate-400 text-lg hidden dark:block">light_mode</span>
          </button>
          <button (click)="logout()" class="px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-all">
            Déconnexion
          </button>
        </div>
      </header>

      <!-- Page content -->
      <div class="flex-1 overflow-y-auto custom-scrollbar">
        <div class="p-6 md:p-8 animate-fade-in">
          <div class="w-full max-w-[1200px] mx-auto">
            <router-outlet />
          </div>
        </div>
      </div>
    </main>
  </div>
  `
})
export class SoignantLayoutComponent {
  constructor(private router: Router) { }
  toggleDark() { document.documentElement.classList.toggle('dark'); }
  logout() { this.router.navigate(['/']); }
}
