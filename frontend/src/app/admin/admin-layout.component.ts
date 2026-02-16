import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@Component({
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatToolbarModule, MatSidenavModule, MatListModule],
  template: `<mat-toolbar color="primary">Espace Admin</mat-toolbar>
  <mat-sidenav-container style="height:calc(100vh - 64px)">
    <mat-sidenav mode="side" opened>
      <mat-nav-list>
        <a mat-list-item routerLink="/">Accueil</a>
        <a mat-list-item routerLink="/admin/patients">Patients</a>
        <a mat-list-item routerLink="/admin/patients/new">Nouveau patient</a>
      </mat-nav-list>
    </mat-sidenav>
    <mat-sidenav-content><router-outlet /></mat-sidenav-content>
  </mat-sidenav-container>`
})
export class AdminLayoutComponent {}
