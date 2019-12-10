import { Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";

@Injectable()
export class HandleError {
  constructor() {}

  handleErr(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error("An error occurred:", error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }

    if (error.error) {
      return throwError(error.error);
    }

    return throwError("خطا در برقراری ارتباط با سرور");
  }
}
