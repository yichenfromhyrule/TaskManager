import { Component, OnInit } from '@angular/core';
import { Task } from '../task';

import { TaskService } from '../task.service';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks: Task[] = [];

  constructor(private taskService: TaskService) {
    
  }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks():void{
    this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
  }

  add(
      name: string
    ):void{
    name = name.trim();
    const id = this.tasks.length + 1;
    if(!name) {return;}
    this.taskService.addTask({id, name} as Task).subscribe(
      task => {
        this.tasks.push(task);
      }
    )
  }

  delete(task:Task): void{
    this.tasks = this.tasks.filter(h => h !== task);
    this.taskService.deleteTask(task._id).subscribe();
  }

}
