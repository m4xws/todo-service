export class Todo {
  id: number;

  name: string;

  description: string;

  status: boolean;

  dueDate: Date;


  constructor(id: number, name: string, description: string, status: boolean, dueDate: Date) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.status = status;
    this.dueDate = dueDate;
  }
}
