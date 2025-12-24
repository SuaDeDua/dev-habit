import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, MatToolbarModule, MatButtonModule],
  template: `
    <mat-toolbar color="primary">
      <span>DevHabit Web</span>
      <span style="flex: 1 1 auto;"></span>
      
      @if (authService.isLoggedIn()) {
        <button mat-button (click)="authService.logout()">Logout</button>
      } @else {
        <button mat-button routerLink="/login">Login</button>
      }
    </mat-toolbar>

    <div style="font-family: Roboto, sans-serif; padding: 20px;">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [],
})
export class AppComponent {
  title = 'DevHabit.Web';
  authService = inject(AuthService);
}
