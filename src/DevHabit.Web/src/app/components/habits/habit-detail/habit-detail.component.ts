import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { HabitService } from '../../../services/habit.service';
import { Habit } from '../../../models/habit.model';

@Component({
  selector: 'app-habit-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule],
  templateUrl: './habit-detail.component.html',
  styleUrl: './habit-detail.component.scss'
})
export class HabitDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private habitService = inject(HabitService);

  habit?: Habit;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.habitService.getHabitById(id).subscribe(res => {
        this.habit = res;
      });
    }
  }
}