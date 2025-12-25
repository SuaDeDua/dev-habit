import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HabitService } from '../../services/habit.service';
import { Habit } from '../../models/habit.model';

@Component({
  selector: 'app-habit-list',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatListModule, MatButtonModule, MatIconModule],
  templateUrl: './habit-list.component.html',
  styleUrl: './habit-list.component.scss'
})
export class HabitListComponent implements OnInit {
  private habitService = inject(HabitService);
  
  habits: Habit[] = [];

  ngOnInit(): void {
    this.habitService.getHabits().subscribe({
      next: (response) => {
        this.habits = response.data;
        console.log('Loaded habits:', this.habits);
      },
      error: (err) => {
        console.error('Error loading habits:', err);
      }
    });
  }
}