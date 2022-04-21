import { Injectable } from '@angular/core';
import { Task } from './task';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService {

  constructor() { }
  
  genId(tasks: Task[]) :number{
    return tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1: 11;
  }
}
