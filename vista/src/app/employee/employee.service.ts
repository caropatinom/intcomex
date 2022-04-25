import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Employee } from './employee';
 
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiURL = "http://localhost:8000/api/employee/";

  //private _apiDep= "https://intcomex-test.apigee.net/v1/getplaces?locale=es&countryId=Co&apiKey=5012b669-f1eb-4eb4-bda8-d69d1ada3086&utcTimeStamp=2020-05-07T21:00:11.071Z&signature=b43f6d5eb1f9fa98388f2b69b01dabc1c6046e8f7a87e3ca99efe2d4dae04ba0";
  
  private configUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
 }

  constructor(private httpClient: HttpClient) { }
 
   getDeptos(): Observable<Employee> {
      this.configUrl = `${environment.apiDep}?locale=${environment.locale}&countryId=${environment.countryId}&ApiKey=${environment.key}&utcTimeStamp=${environment.utc}&signature=${environment.signature} `;
      const depto = this.httpClient.get<Employee>(this.configUrl);
      return depto;
    }
    
  getAll(): Observable<Employee[]> {
   return this.httpClient.get<Employee[]>(this.apiURL)
   .pipe(
     catchError(this.errorHandler)
   )
  }
  getOne(id:any): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.apiURL+id)
    .pipe(
      catchError(this.errorHandler)
    )
   }
  create(employee:any): Observable<Employee> {
    return this.httpClient.post<Employee>(this.apiURL, JSON.stringify(employee), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  find(id:any): Observable<Employee> {
    return this.httpClient.get<Employee>(this.apiURL + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }
 
  update(id:any, employee:any): Observable<Employee> {
    return this.httpClient.put<Employee>(this.apiURL + id, JSON.stringify(employee), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
 
  delete(id:any){
    return this.httpClient.delete<Employee>(this.apiURL + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
 
  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
