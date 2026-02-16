import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  imports: [RouterLink, MatCardModule, MatButtonModule],
  template: `<div class="page" style="display:flex;justify-content:center;margin-top:8vh;">
    <mat-card style="max-width:500px;width:100%;padding:1rem;">
      <h1>Patient Management</h1>
      <p>Choisissez votre espace :</p>
      <div class="actions">
        <a mat-raised-button color="primary" routerLink="/admin/patients">Accéder Admin</a>
        <a mat-raised-button color="accent" routerLink="/soignant/patients">Accéder Soignant</a>
      </div>
    </mat-card>
  </div>`
})
export class HomeComponent {}
