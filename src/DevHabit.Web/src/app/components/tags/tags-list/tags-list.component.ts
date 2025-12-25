import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TagService } from '../../../services/tag.service';
import { Tag } from '../../../models/habit.model';
import { TagDialogComponent } from '../tag-dialog/tag-dialog.component';

@Component({
  selector: 'app-tags-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './tags-list.component.html',
  styleUrl: './tags-list.component.scss'
})
export class TagsListComponent implements OnInit {
  private tagService = inject(TagService);
  private dialog = inject(MatDialog);

  tags: Tag[] = [];
  displayedColumns: string[] = ['name', 'description', 'actions'];

  ngOnInit(): void {
    this.loadTags();
  }

  loadTags(): void {
    this.tagService.getTags().subscribe(res => {
      this.tags = res.data;
    });
  }

  deleteTag(id: string): void {
    if (confirm('Are you sure you want to delete this tag?')) {
      this.tagService.deleteTag(id).subscribe(() => this.loadTags());
    }
  }

  openDialog(tag?: Tag): void {
    const dialogRef = this.dialog.open(TagDialogComponent, {
      width: '400px',
      data: tag
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (tag) {
          // Update
          this.tagService.updateTag(tag.id, result).subscribe(() => this.loadTags());
        } else {
          // Create
          this.tagService.createTag(result).subscribe(() => this.loadTags());
        }
      }
    });
  }
}