import {Component, OnInit} from '@angular/core';
import {TodoService} from "../shared/todo.service";
import {Todo} from "../shared/todo";

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {

  displayedColumns: string[] = ['status','id', 'name', 'dueDate'];

  dataSource: Todo[];

  constructor(private ts: TodoService) {
  }

  ngOnInit() {
    this.ts.getAll().subscribe(res => this.dataSource = res);
  }
}
