import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { HandleError } from "./handle-error.serivce";
import { Observable } from "rxjs";
@Injectable()
export class BaseService {
  constructor(private http: HttpClient, private handleError: HandleError) {}
  getData<T>(url: string): Observable<T> {
    return this.http
      .get<T>(url)
      .pipe(catchError(this.handleError.handleErr.bind(this)));
  }
  postData<T>(url: string, item: any): Observable<T> {
    return this.http
      .post<T>(url, item)
      .pipe(catchError(this.handleError.handleErr.bind(this)));
  }
  postFile(url: string, item: File) {
    return this.http
      .post<File>(url, item)
      .pipe(catchError(this.handleError.handleErr.bind(this)));
  }
}
