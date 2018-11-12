import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GridServiceService {
  baseUrl: String = 'http://192.168.9.81:8080/';

  constructor(private http: HttpClient) { }

 
  getAllEmployee(body: any) {
    return this.http.post(this.baseUrl + 'getAllEmployee', body).pipe(
      map(res => res),
      catchError(this.handleErrorObservable)
    );
  }
  searchEmployee(body: any) {
    // send searchkey to database and get responce
    return this.http.post(this.baseUrl + 'searchEmployee', body).pipe(
      map(res => res),
      catchError(this.handleErrorObservable)
    );
  }

  getAllEmployeeByAsc(body: any) {
    console.log("body in service asc", body)
    //send header i.e column name to database and get responce
    return this.http.post(this.baseUrl + 'ascorder', body).pipe(
      map(res => res),
      catchError(this.handleErrorObservable)
    );
  }
  getAllEmployeeByDesc(body: any) {
    console.log("body in service desc", body)
    //send header i.e column name to database and get responce
    return this.http.post(this.baseUrl + 'descorder', body).pipe(
      map(res => res),
      catchError(this.handleErrorObservable)
    );
  }
  getPager(totalItems: number, currentPage: number = 1, pageSize: number) {
    
    // console.log("total Item", totalItems);
    // console.log("Current page", currentPage);
    // console.log("pagesize", pageSize);
    // calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize);
    console.log("Total pages..", totalPages);
    // ensure current page isn't out of range
    if (currentPage < 1) { 
        currentPage = 1; 
    } else if (currentPage > totalPages) { 
        currentPage = totalPages; 
    }
    
    let startPage: number, endPage: number;
    if (totalPages <= pageSize) {
        // less than 10 total pages so show all
        startPage = 1;
        endPage = totalPages;
    } else {
        // more than 10 total pages so calculate start and end pages
        if (currentPage <= 6) {
            startPage = 1;
            endPage = 10;
        } else if (currentPage + 4 >= totalPages) {
            startPage = totalPages - 9;
            endPage = totalPages;
        } else {
            startPage = currentPage - 5;
            endPage = currentPage + 4;
        }
    }
    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + (pageSize - 1), totalItems - 1);
    // create an array of pages to ng-repeat in the pager control
    let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);
    // return object with all pager properties required by the view
    return {
        totalItems: totalItems,
        currentPage: currentPage,
        pageSize: pageSize,
        totalPages: totalPages,
        startPage: startPage,
        endPage: endPage,
        startIndex: startIndex,
        endIndex: endIndex,
        pages: pages
    };
}

  private handleErrorObservable(error: Response | any) {
    // 401 - unAuthorized
    debugger;
    if (error.status === 401) {
      var message = "error";
      // this._tostrservice.showCustom();
      return Observable.throw(new Error(error.status));
      // alert("Server error please try again!");
    }
    // 500 - internal server error
    else if (error.status === 500) {
      return Observable.throw(new Error(error.status));
    }
    // 400 - bad request
    else if (error.status === 400) {
      return Observable.throw(new Error(error.status));
    }
    // 409 - conflict
    else if (error.status === 409) {
      return Observable.throw(new Error(error.status));
    }
    // 408 - request timeout
    else if (error.status === 408) {
      return Observable.throw(new Error(error.status));
    }
    else {
      // console.error(error.message || error);
      return Observable.throw(error.message || error);
    }

  }
}
