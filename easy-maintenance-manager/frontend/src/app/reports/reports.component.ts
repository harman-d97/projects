import { ConstantPool } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

declare var $: any;

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  isLogin: boolean = false; // is current user logged in
  dateTime: any = []; // store the date and time of the reports in an array
  showForm: boolean = false; // if the filters form should be shown
  reports: any = []; // store the reports in an array
  reportsWithFilters: any = []; // store the reports with filters applied in an array
  noFilters: boolean = false; // show the reports without filters
  withFilters: boolean = false; // show the reports with filers applied
  employees: any = []; // list of all employees

  /**
   * 
   * @param _api api service
   * @param _router router object
   * @param _auth authentication service
   */
  constructor(private _api: ApiService, private _router: Router, private _auth: AuthService) { }

  /**
   * check id the user is logged in when the component is initialized
   */
  ngOnInit(): void {
    this.isUserLogin();
  }

  /**
   * if user is logged in, set isLogin to true and render all reports 
   */
  isUserLogin() {
    if(this._auth.getUserDetails() != null) {
      this.isLogin = true;
      this.noFilters = true;
      this.renderReports();
      this.getEmployees();
    } else {
      this._router.navigate(['login']);
    }
  }

  /**
   * get all employees and store them in employees array
   */
   getEmployees() {
    this._api.getTypeRequest('user/get-all-employees').subscribe((res: any) => {
      console.log(res);
      if (res.status) {
        this.employees = res.data;
      } else {
        this.employees = [];
      }
    });
  }

  /**
   * rendders all the reports 
   */
  renderReports() {
    console.log('render reports');
    this.reports = [];
    this._api.getTypeRequest('reports/get-all-reports').subscribe((res: any) => {
      console.log(res);
      if(res.status) {
        for (let i = 0; i < res.data.length; i++) {
          let employeeId = res.data[i].employeeId;
          let changeDescription = res.data[i].changeDescription;
          let date = res.data[i].date

          if (!this.dateTime.includes(date.toString())) {
            this.dateTime.push(date.toString());

            this._api.postTypeRequest('tasks/get-employee-name', {employeeId: employeeId}).subscribe((res: any) => {
              console.log(res);
              if(res.status) {
                let employeeName = res.data[0].firstName + ' ' + res.data[0].lastName;
                let modifiedDate = date.toString().replace('T', ' ');
                let finalDate = modifiedDate.toString().replace('.000Z', ' ');
                this.reports.push({employeeName: employeeName, changeDescription: changeDescription, date: finalDate});
              }
            });
          }
        }
      }
    });
  }

  /**
   * sets the showForm to true to show the filters form
   */
  showFiltersForm() {
    this.showForm = true;
  }

  /**
   * when the filters form is submitted, apply the filters and render the reports
   * @param form filters form
   */
  onSubmit(form: any) {
    this.noFilters = false;
    this.reportsWithFilters = this.reports;
    console.log(form.value);
    let employeeName = form.value.employeeName;
    let startDate = form.value.startDate;
    let endDate = form.value.endDate;

    // if only one date is choose show alert until both dates are chosen, and then apply the date filter
    if ( (startDate.length > 0 && endDate == '') || (startDate == '' && endDate.length > 0) &&  employeeName.length == 0) {
      alert('Please enter both a start and end date');
    } else {
      for (let i = 0; i < this.reportsWithFilters.length; i++) {
        let date = this.reportsWithFilters[i].date;
        let formattedDate = date.slice(0, 10);
        console.log(startDate + ' ' + formattedDate);
        if (formattedDate < startDate || formattedDate > endDate) {
          this.reportsWithFilters.splice(i, 1);
        }
      }
      this.withFilters = true;
    }

    // if only the employee filter is choose, apply the employee filter 
    if (employeeName.length > 0 && startDate.length == 0 && endDate.length == 0) {
      for (let i = 0; i < this.reportsWithFilters.length; i++) {
        let employee = this.reportsWithFilters[i].employeeName;
        if (!employee.includes(employeeName)) {
          this.reportsWithFilters.splice(i, 1);
        }
      }
      this.withFilters = true;
    }

    // if both the employee filter and the date filter are choose, apply both filters
    if (employeeName.length > 0 && startDate.length > 0 && endDate.length > 0) {
      for (let i = 0; i < this.reportsWithFilters.length; i++) {
        let employee = this.reportsWithFilters[i].employeeName;
        let date = this.reportsWithFilters[i].date;
        let formattedDate = date.slice(0, 10);
        if (!employee.includes(employeeName) && (formattedDate < startDate || formattedDate > endDate)) {
          this.reportsWithFilters.splice(i, 1);
        }
      }
      this.withFilters = true;
    }

    // if no filters are choose, display error message
    if (employeeName.length == 0 && startDate.length == 0 && endDate.length == 0) {
      alert('Please enter a name or a date range');
      this.noFilters = true;
      this.withFilters = false;
    }
    form.reset();
  }

  

}
