import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CreateHabitRequest, Habit, Tag, TagResponse } from '../../../models/habit.model';
import { TagService } from '../../../services/tag.service';

@Component({
  selector: 'app-habit-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './habit-dialog.component.html',
  styleUrl: './habit-dialog.component.scss'
})
export class HabitDialogComponent {
  private tagService = inject(TagService);
  
  habitData: CreateHabitRequest;
  allTags: Tag[] = [];
  selectedTagIds: string[] = [];
  
  allowedUnits = ['minutes', 'hours', 'steps', 'km', 'cal', 'pages', 'books', 'tasks', 'sessions'];

  constructor(
    public dialogRef: MatDialogRef<HabitDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Habit | null
  ) {
    this.habitData = {
      name: data?.name || '',
      description: data?.description || '',
      type: data?.type || 1, 
      frequency: {
        type: data?.frequency?.type || 1, 
        timesPerPeriod: data?.frequency?.timesPerPeriod || 1
      },
      target: {
        value: data?.target?.value || 1,
        unit: data?.target?.unit || 'sessions'
      },
      tagIds: data?.tags?.map(t => t.id) || []
    };
    
    this.selectedTagIds = [...(this.habitData.tagIds || [])];
    this.loadAllTags();
  }

  loadAllTags(): void {
    this.tagService.getTags(1, 50).subscribe((res: TagResponse) => {
      this.allTags = res.data;
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.habitData.tagIds = this.selectedTagIds;
    this.dialogRef.close(this.habitData);
  }
}