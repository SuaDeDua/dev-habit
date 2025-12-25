import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { HabitService } from '../../../services/habit.service';
import { Habit } from '../../../models/habit.model';
import { HabitDialogComponent } from '../habit-dialog/habit-dialog.component';

@Component({
  selector: 'app-habit-manager',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './habit-manager.component.html',
  styleUrl: './habit-manager.component.scss'
})
export class HabitManagerComponent implements OnInit {
  private habitService = inject(HabitService);
  private dialog = inject(MatDialog);

  habits: Habit[] = [];
  displayedColumns: string[] = ['name', 'type', 'frequency', 'target', 'tags', 'actions'];

  ngOnInit(): void {
    this.loadHabits();
  }

  loadHabits(): void {
    this.habitService.getHabits().subscribe(res => {
      this.habits = res.data;
    });
  }

  deleteHabit(id: string): void {
    if (confirm('Are you sure you want to delete this habit?')) {
      this.habitService.deleteHabit(id).subscribe(() => this.loadHabits());
    }
  }

  openDialog(habit?: Habit): void {
    const dialogRef = this.dialog.open(HabitDialogComponent, {
      width: '500px',
      data: habit
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (habit) {
          this.habitService.updateHabit(habit.id, result).subscribe(() => this.loadHabits());
        } else {
          this.habitService.createHabit(result).subscribe(() => this.loadHabits());
        }
      }
    });
  }
}