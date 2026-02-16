import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
  <div class="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark text-gray-700 dark:text-gray-200 transition-colors duration-200">
    <aside class="w-64 bg-sidebar-light dark:bg-sidebar-dark border-r border-gray-200 dark:border-gray-700 flex flex-col h-full shrink-0 z-20 transition-colors duration-200">
      <div class="p-6 flex items-center space-x-3">
        <div class="bg-gradient-to-br from-pink-400 to-purple-500 rounded-lg p-1.5 shadow-sm">
          <span class="material-icons text-white text-xl">medical_services</span>
        </div>
        <div>
          <h1 class="text-primary font-bold text-lg leading-tight">Alzheimer</h1>
          <h1 class="text-primary font-bold text-lg leading-tight">App</h1>
        </div>
      </div>
      <div class="flex-1 overflow-y-auto custom-scrollbar px-3 py-2 space-y-1">
        <a class="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-primary transition-colors" routerLink="/">
          <span class="material-icons-outlined text-orange-400">home</span>
          <span class="font-medium">Accueil</span>
        </a>
        <a class="flex items-center space-x-3 px-3 py-2.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-primary font-semibold relative" routerLink="/admin/patients">
          <div class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full"></div>
          <span class="material-icons text-purple-600">people</span>
          <span>Mes Patients</span>
        </a>
        <a class="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-primary transition-colors" routerLink="/admin/patients/new">
          <span class="material-icons-outlined text-red-300">edit_note</span>
          <span class="font-medium">Nouveau patient</span>
        </a>
        <a class="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-primary transition-colors" href="#">
          <span class="material-icons-outlined text-blue-400">calendar_month</span>
          <span class="font-medium">Agenda visuel</span>
        </a>
        <a class="flex items-center justify-between px-3 py-2.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-primary transition-colors group" href="#">
          <div class="flex items-center space-x-3">
            <span class="material-icons-outlined text-blue-300">assessment</span>
            <span class="font-medium group-hover:text-primary">Rapports</span>
          </div>
          <span class="bg-primary text-white text-xs font-bold px-1.5 py-0.5 rounded-full">1</span>
        </a>
        <div class="pt-4 pb-2">
          <div class="border-t border-gray-100 dark:border-gray-700"></div>
        </div>
        <a class="flex items-center justify-between px-3 py-2.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-primary transition-colors" href="#">
          <div class="flex items-center space-x-3">
            <span class="material-icons-outlined text-gray-400">notifications</span>
            <span class="font-medium">Notifications</span>
          </div>
          <span class="bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">2</span>
        </a>
        <a class="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-primary transition-colors" href="#">
          <span class="material-icons-outlined text-gray-400">settings</span>
          <span class="font-medium">Paramètres</span>
        </a>
      </div>
      <div class="p-4 border-t border-gray-100 dark:border-gray-700">
        <div class="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 flex items-center space-x-3 border border-gray-100 dark:border-gray-700">
          <div class="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-lg">A</div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-bold text-gray-900 dark:text-white truncate">Admin</p>
            <p class="text-xs text-gray-500 dark:text-gray-400 truncate">Gestion</p>
          </div>
        </div>
      </div>
    </aside>

    <main class="flex-1 flex flex-col h-full min-w-0 overflow-hidden bg-background-light dark:bg-background-dark">
      <header class="bg-sidebar-light dark:bg-sidebar-dark border-b border-gray-200 dark:border-gray-700 h-16 flex items-center justify-between px-8 shrink-0">
        <div class="flex items-center space-x-3">
          <span class="material-icons text-purple-800 text-2xl">people</span>
          <h2 class="text-xl font-bold text-gray-800 dark:text-white">Mes Patients</h2>
        </div>
        <div class="flex items-center space-x-4">
          <button class="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm">
            Déconnexion
          </button>
        </div>
      </header>
      <div class="flex-1 overflow-y-auto p-8">
        <div class="max-w-6xl w-full mx-auto">
          <div class="bg-card-light dark:bg-card-dark rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 min-h-full">
            <router-outlet />
          </div>
        </div>
      </div>
    </main>

    <button aria-label="Basculer le mode sombre" class="fixed bottom-6 right-6 p-3 rounded-full bg-primary text-white shadow-lg hover:shadow-xl transition-all z-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" (click)="toggleDark()">
      <span class="material-icons block dark:hidden">dark_mode</span>
      <span class="material-icons hidden dark:block">light_mode</span>
    </button>
  </div>
  `
})
export class AdminLayoutComponent {
  toggleDark() { document.documentElement.classList.toggle('dark'); }
}
