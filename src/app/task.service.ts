import { Injectable } from '@angular/core';
import { Task } from './task';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private taskUrl = "https://crudcrud.com/api/f57bd3a115f44711843632818b988fa1/tasks";


  //private taskUrl = 'api/tasks';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private router: ActivatedRoute,
    private messageService: MessageService, 
    private http:HttpClient
  ) { }

  getTasks(): Observable<Task[]> {
    console.log("TaskService getTasks() working ...");
    return this.http.get<Task[]>(this.taskUrl).pipe(
      tap(_ => this.log('fetched tasks')),
      catchError(this.handleError<Task[]>('getTasks', []))
    );
  }

  getTaskNo404<Data>(id:number) : Observable<Task>{
    const url = `${this.taskUrl}/?id=${id}`;
    return this.http.get<Task[]>(url).pipe(
      map(tasks => tasks[0]),
      tap(h=> {
        const outcome = h ? 'fetched' : 'did not find';
        this.log(`${outcome} task id = ${id}`);
      }),
      catchError(this.handleError<Task>(`getTask id = ${id}`))
    );
  }

  getTask(_id: String): Observable<Task> {
    console.log("TaskService getTask(_id) working ..., _id : ", _id);
    const url = `${this.taskUrl}/${_id}`;
    return this.http.get<Task>(url).pipe(
      tap(_ => this.log(`fetched task id=${_id}`)),
      catchError(this.handleError<Task>(`getTask id=${_id}`))
    );
  }

  addTask(task: Task){
    return this.http.post<Task>(this.taskUrl, task);
  }

  updateTask(_id: String, task: Task){
    const url = `${this.taskUrl}/${_id}`;
    return this.http.put(url, task);
  }

  deleteTask(_id: String): Observable<Task>{
    console.log("TaskService deleteTask(id) working ...");
    const url = `${this.taskUrl}/${_id}`;
    return this.http.delete<Task>(url);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

}
