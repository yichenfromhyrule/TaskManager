import { Component } from '@angular/core';
import { TaskService } from './task.service';
import { Task } from './task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Task Manager';
  constructor(private task: TaskService){
    this.task.getTasks().subscribe(data=>{
      console.warn(data, this.genId)
    })
  }

  genId(tasks: Task[]) :number{
    return tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1: 11;
  }
}
