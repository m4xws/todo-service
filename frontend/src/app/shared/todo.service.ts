import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';import {Todo} from "./todo";
import {Dummy} from "./dummy";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() {
  }

  getAll(): Observable<Todo[]> {
    return of(new Dummy().todos);
  }

}
