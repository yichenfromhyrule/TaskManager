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
      console.warn(data)
    })
  }

}
