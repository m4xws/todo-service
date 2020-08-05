import {Component, Inject} from '@angular/core';
import {Todo} from "../shared/todo";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-tododetail',
  templateUrl: './tododetail.component.html',
  styleUrls: ['./tododetail.component.css']
})
export class TododetailComponent {

  todo: Todo;
  edit: boolean;

  constructor(public dialogRef: MatDialogRef<TododetailComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Todo) {
    this.todo = data;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  startEdit(): void {
    this.edit = true;
  }

  stopEdit(): void {
    this.edit = false;
  }
}
