import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    RouterLink, 
    RouterLinkActive,
    MatToolbarModule, 
    MatButtonModule, 
    MatSidenavModule, 
    MatListModule, 
    MatIconModule
  ],
  template: `
    <mat-sidenav-container style="height: 100vh;">
      <!-- Sidenav (Menu trái) -->
      <mat-sidenav #sidenav mode="side" [opened]="authService.isLoggedIn()" style="width: 250px;">
        <mat-nav-list>
          <div style="padding: 20px; font-weight: bold; font-size: 1.2em; border-bottom: 1px solid #eee;">
            DevHabit
          </div>
          
          <a mat-list-item routerLink="/" routerLinkActive="active-link" [routerLinkActiveOptions]="{exact: true}">
            <mat-icon matListItemIcon>dashboard</mat-icon>
            <span matListItemTitle>Dashboard</span>
          </a>

          <a mat-list-item routerLink="/habits" routerLinkActive="active-link">
            <mat-icon matListItemIcon>check_circle</mat-icon>
            <span matListItemTitle>Manage Habits</span>
          </a>

          <a mat-list-item routerLink="/tags" routerLinkActive="active-link">
            <mat-icon matListItemIcon>label</mat-icon>
            <span matListItemTitle>Manage Tags</span>
          </a>
        </mat-nav-list>
      </mat-sidenav>

      <!-- Main Content -->
      <mat-sidenav-content>
        <mat-toolbar color="primary">
          <button mat-icon-button (click)="sidenav.toggle()" *ngIf="authService.isLoggedIn()">
            <mat-icon>menu</mat-icon>
          </button>
          
          <span style="margin-left: 10px;">DevHabit Web</span>
          
          <span style="flex: 1 1 auto;"></span>
          
          @if (authService.isLoggedIn()) {
            <button mat-button (click)="authService.logout()">
              <mat-icon>logout</mat-icon> Logout
            </button>
          } @else {
            <button mat-button routerLink="/login">Login</button>
          }
        </mat-toolbar>

        <div style="padding: 20px;">
          <router-outlet></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .active-link {
      background-color: rgba(0, 0, 0, 0.05);
      border-left: 4px solid #3f51b5;
    }
  `],
})
export class AppComponent {
  title = 'DevHabit.Web';
  authService = inject(AuthService);
}
