import { Routes } from '@angular/router';
import { HabitListComponent } from './components/habit-list/habit-list.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  { path: '', component: HabitListComponent },
  { path: 'login', component: LoginComponent }
];