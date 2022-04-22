import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../task';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {

  @Input() task?: Task;

  constructor(
    private router: ActivatedRoute,
    private taskService: TaskService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getTask();
  }

  getTask(): void{
    console.log("getTask() running");
    const id = Number(this.router.snapshot.paramMap.get('id'));
    this.taskService.getTask(id).subscribe(task =>this.task = task);
  }

  goBack(): void{
    this.location.back();
  }

  save() : void{
    if(this.task){
      const _id = Number(this.router.snapshot.paramMap.get('_id'));
      this.taskService.updateTask(_id,this.task).subscribe(()=>this.goBack());
    }
  }

}
