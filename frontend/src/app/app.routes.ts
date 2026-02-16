import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminLayoutComponent } from './admin/admin-layout.component';
import { AdminPatientsListComponent } from './admin/admin-patients-list.component';
import { AdminPatientFormComponent } from './admin/admin-patient-form.component';
import { AdminPatientDetailsComponent } from './admin/admin-patient-details.component';
import { SoignantLayoutComponent } from './soignant/soignant-layout.component';
import { SoignantPatientsListComponent } from './soignant/soignant-patients-list.component';
import { SoignantPatientDossierComponent } from './soignant/soignant-patient-dossier.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin', component: AdminLayoutComponent, children: [
    { path: 'patients', component: AdminPatientsListComponent },
    { path: 'patients/new', component: AdminPatientFormComponent },
    { path: 'patients/:id', component: AdminPatientDetailsComponent },
    { path: '', pathMatch: 'full', redirectTo: 'patients' }
  ]},
  { path: 'soignant', component: SoignantLayoutComponent, children: [
    { path: 'patients', component: SoignantPatientsListComponent },
    { path: 'patients/:id', component: SoignantPatientDossierComponent },
    { path: '', pathMatch: 'full', redirectTo: 'patients' }
  ]},
  { path: '**', redirectTo: '' }
];
