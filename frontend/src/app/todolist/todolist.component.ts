import {Component, OnInit} from '@angular/core';
import {TodoService} from "../shared/todo.service";
import {Todo} from "../shared/todo";
import {MatDialog} from "@angular/material";
import {TododetailComponent} from "../tododetail/tododetail.component";

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {

  displayedColumns: string[] = ['status', 'id', 'name', 'dueDate', 'action'];

  dataSource: Todo[];

  constructor(private ts: TodoService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.ts.getAll().subscribe(res => this.dataSource = res);
  }

  openTodoDetail(todo: Todo) {
    console.log('selectedRow', todo)
    let dialogRef = this.dialog.open(TododetailComponent, {
      data: todo
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed: ' + result);
    });
  }
}
