import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
  <div class="bg-background-light dark:bg-background-dark font-sans min-h-screen flex items-center justify-center p-4 transition-colors duration-300">
    <main class="w-full max-w-4xl animate-fade-in-up">
      <div class="bg-card-light dark:bg-card-dark rounded-2xl shadow-soft dark:shadow-none dark:border dark:border-gray-700 p-8 md:p-12 transition-all duration-300">
        <div class="text-center mb-12">
          <span class="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-primary uppercase bg-blue-50 dark:bg-blue-900/30 rounded-full">
            Alzheimer App
          </span>
          <h1 class="text-3xl md:text-4xl font-bold text-text-light dark:text-text-dark mb-4">Choisissez votre espace</h1>
          <p class="text-subtext-light dark:text-subtext-dark text-lg max-w-2xl mx-auto leading-relaxed">
            Accédez au tableau de bord administrateur ou à l'espace soignant pour gérer les dossiers et assurer le suivi des patients.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <a routerLink="/admin/patients" class="group relative flex flex-col items-center p-8 bg-white dark:bg-gray-800 border-2 border-transparent hover:border-primary rounded-xl shadow-sm hover:shadow-hover transition-all duration-300 cursor-pointer overflow-hidden">
            <div class="absolute inset-0 bg-blue-50 dark:bg-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="z-10 w-20 h-20 mb-6 flex items-center justify-center bg-blue-100 dark:bg-blue-900/40 text-primary rounded-full group-hover:scale-110 transition-transform duration-300">
              <span class="material-icons-round text-4xl">admin_panel_settings</span>
            </div>
            <div class="z-10 text-center">
              <h2 class="text-xl font-bold text-text-light dark:text-text-dark mb-2 group-hover:text-primary transition-colors">Espace Admin</h2>
              <p class="text-subtext-light dark:text-subtext-dark text-sm">Configuration, gestion des utilisateurs et paramètres globaux.</p>
            </div>
            <div class="z-10 mt-6 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
              <span class="text-primary font-medium text-sm flex items-center">
                Accéder
                <span class="material-icons-round text-sm ml-1">arrow_forward</span>
              </span>
            </div>
          </a>

          <a routerLink="/soignant/patients" class="group relative flex flex-col items-center p-8 bg-white dark:bg-gray-800 border-2 border-transparent hover:border-primary rounded-xl shadow-sm hover:shadow-hover transition-all duration-300 cursor-pointer overflow-hidden">
            <div class="absolute inset-0 bg-blue-50 dark:bg-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="z-10 w-20 h-20 mb-6 flex items-center justify-center bg-teal-100 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400 rounded-full group-hover:scale-110 transition-transform duration-300">
              <span class="material-icons-round text-4xl">medical_services</span>
            </div>
            <div class="z-10 text-center">
              <h2 class="text-xl font-bold text-text-light dark:text-text-dark mb-2 group-hover:text-primary transition-colors">Espace Soignant</h2>
              <p class="text-subtext-light dark:text-subtext-dark text-sm">Suivi des patients, gestion des dossiers médicaux et planning.</p>
            </div>
            <div class="z-10 mt-6 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
              <span class="text-primary font-medium text-sm flex items-center">
                Accéder aux dossiers
                <span class="material-icons-round text-sm ml-1">arrow_forward</span>
              </span>
            </div>
          </a>
        </div>

      </div>

      <div class="mt-8 text-center">
        <p class="text-xs text-subtext-light dark:text-gray-500">© 2024 Alzheimer App. Tous droits réservés.</p>
      </div>
    </main>
  </div>
  `,
  styles: [`
    @keyframes fade-in-up {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
  `]
})
export class HomeComponent {}
