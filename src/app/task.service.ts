import { Injectable } from '@angular/core';

import { Task } from './task';
import { TASKS } from './mock-tasks';

import { Observable, of } from 'rxjs';

import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private messageService: MessageService) { }

  getTasks(): Observable<Task[]> {
    const tasks = of(TASKS);
    this.messageService.add(`TaskServices: fetched tasks`);
    return tasks;
  }

  getTask(id: number): Observable<Task> {
    const task = TASKS.find(h => h.id === id)!;
    this.messageService.add(`TaskServices: fetched task id = ${id}`);
    return of(task);
  }

}
