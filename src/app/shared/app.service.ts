import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  //Observable to Pass Message to Toaster
  private toasterSource = new BehaviorSubject('');
  currenToasterMessage = this.toasterSource.asObservable();

  //Observable to pass custom message if request failed/Succeed
  private responseSource = new BehaviorSubject('string');
  response = this.responseSource.asObservable();

  //Observable to toggle loader on Each Request
  private loaderSource = new BehaviorSubject(false);
  loaderStatus = this.loaderSource.asObservable();

  constructor() { }

  // Method to toggle Loader
  enableLoader(value:boolean){
    this.loaderSource.next(value);
  }
  
  //Method to toggle toaster
  enableToaster(response:string,message:string){
    this.responseSource.next(response);
    this.toasterSource.next(message)
  }


  //Method to Clear Toaster
  clearToaster(){
    this.enableToaster('','')
  }


  //Method to handle http error
  public handleError<T>(operation = 'operation',result?:T){
    return (error:any):Observable<T> => {
      
      //disable loader
      this.enableLoader(false);
      
      //enable toaster
      this.enableToaster('failed',`Error ${error.status}: ${operation}`)

      return of(result as T);
    }
  }



}
