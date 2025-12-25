import { Routes } from '@angular/router';
import { HabitListComponent } from './components/habit-list/habit-list.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TagsListComponent } from './components/tags/tags-list/tags-list.component';
import { HabitManagerComponent } from './components/habits/habit-manager/habit-manager.component';
import { HabitDetailComponent } from './components/habits/habit-detail/habit-detail.component';

export const routes: Routes = [
  { path: '', component: HabitListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'tags', component: TagsListComponent },
  { path: 'habits', component: HabitManagerComponent },
  { path: 'habits/:id', component: HabitDetailComponent }
];