import { Component, OnInit, Input } from '@angular/core';
import { GridServiceService } from '../grid-service.service';

@Component({
  selector: 'app-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.css']
})
export class GridViewComponent implements OnInit {
 
  constructor(private gridservice: GridServiceService) { }
  allEmployee: any[];
  @Input() pagedivFlag: boolean;
  @Input() searchFlag:boolean;
  @Input() rowperpageFlag:boolean;
  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];

  flag: boolean;
  
  
  keyname: any[] = [];   // This array for store the key name of responce. 
  selectedOption: number;
  pagerow: number;
  ngOnInit() { }

  getEmployee(body: any) {
    this.gridservice.getAllEmployee(body)
      .subscribe((responce: any) => {            // responce is http responce from server
        console.log("All employee", responce);
        console.log("Row affected", responce.rowsAffected);
        this.allEmployee = responce.recordset; // get the recordset array from responce
        for (let prop in this.allEmployee[0]) { //This is for getting all headers of responce
          this.keyname.push(prop);
        }
        this.setPage(1, 5);         // initialize to page 1 and default 5 row per page 
        console.log("All responce printed..", this.allEmployee);
        console.log("Length og allemployee array..", this.allEmployee.length)
      }, error => {
        alert("in error");
        console.log("error", error);
      });
  }
  onSearchKey(event: any) {
    console.log(event.target.value)
    var reqBody = {
      "searchKey": event.target.value
    };
    console.log(reqBody);
    this.gridservice.searchEmployee(reqBody)
      .subscribe((responce: any) => {
        console.log("Search Employee", responce);
        this.allEmployee = responce.recordset;
        this.pagedItems = this.allEmployee.slice(this.pager.startIndex, this.pager.endIndex + 1);
      }, error => {
        alert("In search error");
        console.log("search Error", error);
      })
  }
  sortHeaderAsc(headerName: any) {
    this.flag = true;
    console.log("header name", headerName);
    var reqBody = {
      "headername": headerName
    };
    console.log("header json asc", reqBody);
    this.gridservice.getAllEmployeeByAsc(reqBody)
      .subscribe((responce: any) => {
        this.allEmployee = responce.recordset;
        this.pagedItems = this.allEmployee.slice(this.pager.startIndex, this.pager.endIndex + 1);
        console.log("sorted in asending", this.allEmployee);
      }, error => {
        alert("In asc/desc order error");
        console.log("asc/desc order Error", error);
      })
  }
  sortHeaderDesc(headerName: any) {
    this.flag = false;
    console.log("header name", headerName);
    var reqBody = {
      "headername": headerName
    };
    console.log("header json desc", reqBody);
    this.gridservice.getAllEmployeeByDesc(reqBody)
      .subscribe((responce: any) => {
        this.allEmployee = responce.recordset;
        this.pagedItems = this.allEmployee.slice(this.pager.startIndex, this.pager.endIndex + 1);
        console.log("sorted in decending", this.allEmployee);
      }, error => {
        alert("In asc/desc order error");
        console.log("asc/desc order Error", error);
      })
  }
  selectrowperpage(value) {
    console.log(value);
    this.pagerow = value;
    this.setPage(1, this.pagerow);
  }
  setPage(page: number, pagerow: number) {
    // get pager object from service
    this.pager = this.gridservice.getPager(this.allEmployee.length, page, pagerow);
    // get current page of items
    this.pagedItems = this.allEmployee.slice(this.pager.startIndex, this.pager.endIndex + 1);
    console.log("PagedItem ..", this.pagedItems)
  }
 
}












