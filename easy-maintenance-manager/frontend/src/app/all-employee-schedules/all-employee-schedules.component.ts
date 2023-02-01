import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

declare var $: any;

@Component({
  selector: 'app-all-employee-schedules',
  templateUrl: './all-employee-schedules.component.html',
  styleUrls: ['./all-employee-schedules.component.scss']
})
export class AllEmployeeSchedulesComponent implements OnInit {

  isLogin: boolean = false; // if user is logged in 
  isAdmin: boolean = false; // if admin user is logged in 
  date: string = ''; // date choosen by user
  employeeId: string = ''; // employeeId choosen by user
  employees: any = []; // list of current employees

  /**
   * 
   * @param _api api service
   * @param _router router object
   * @param _auth authentiication service
   */
  constructor(private _api: ApiService, private _router: Router, private _auth: AuthService) { }

  /**
   * when the page loads, check if user is logged in and if admin user is logged in
   */
  ngOnInit(): void {
    this.isUserLogin();
    this.isAdminUser();
  }

  /**
   * check if the current user is logged in
   */
  isUserLogin() {
    if(this._auth.getUserDetails() != null) {
      this.isLogin = true;
      this.getEmployees();
      this.populateWithAllTasks();
    } else {
      this._router.navigate(['login']);
    }
  }

  /**
   * check if the current user is an admin user
   */
  isAdminUser() {
    if(this._auth.getAdminStatus() == '1') {
      this.isAdmin = true;
    }
  }

  /**
   * get all employess using the api service and store them in the employees array
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
   * when the page loads, populate the page with all tasks asssigned to all employees
   */
  populateWithAllTasks() {
    this._api.getTypeRequest('tasks/get-all-tasks').subscribe((res: any) => {
      console.log(res);
      if (res.status) {
        $('#schedules').empty();
        for (let i = 0; i < res.data.length; i++) {
          let taskDescription = res.data[i].description;
          let equipmentName = res.data[i].equipmentName;
          let equipmentNumber = res.data[i].equipmentNumber;
          let estCompletionTime = res.data[i].estCompletionTime;

          let html = `
            <div class="card mx-5 my-3">
              <div class="card-body">
                <h5 class="card-text">Equipment: ${equipmentNumber} - ${equipmentName}</h5>
                <p class="card-text">Description: ${taskDescription}</p>
                <p class="card-text">Estimated Completion Time: ${estCompletionTime} mins</p>
              </div>
            </div>`
          $('#schedules').append(html);
          $('.card').css('background-color', '#3b5249');
          $('.card').css('color', 'white');

        }
      } 
    });
  }

  /**
   * get all task assigned to the employees based on date choosen and employee choosen
   * @param date date choosen by user
   * @param employeeId employee choosen by user
   */
  getSchedule(date: HTMLInputElement, employeeId: HTMLSelectElement) {
    this.date = date.value.toString();
    this.employeeId = employeeId.value.toString();

    // if no selection is made, populate the page with all tasks
    if(this.date == '' && this.employeeId == '') {
      this.populateWithAllTasks();
    }

    // if only date is choosen, get all tasks assigned to all employees on that date
    if(this.date.length > 0 && this.employeeId == '') {
      this._api.postTypeRequest('tasks/get-employees-schedules-by-date', {date: this.date}).subscribe((res: any) => {
        console.log(res);
        if (res.status) {
          $('#schedules').empty();
          for (let i = 0; i < res.data.length; i++) {
            let taskDescription = res.data[i].description;
            let equipmentName = res.data[i].equipmentName;
            let equipmentNumber = res.data[i].equipmentNumber;
            let estCompletionTime = res.data[i].estCompletionTime;

            let html = `
              <div class="card mx-5 my-3">
                <div class="card-body">
                  <h5 class="card-text">Equipment: ${equipmentNumber} - ${equipmentName}</h5>
                  <p class="card-text">Description: ${taskDescription}</p>
                  <p class="card-text">Estimated Completion Time: ${estCompletionTime} mins</p>
                </div>
              </div>`
            $('#schedules').append(html);
            $('.card').css('background-color', '#3b5249');
            $('.card').css('color', 'white');

          }
        } 
      });
    }

    // if only employee is choosen, get all tasks assigned to that employee
    if(this.date == '' && this.employeeId.length > 0) {
      this._api.postTypeRequest('tasks/get-employees-schedules-by-employee', {employee: this.employeeId}).subscribe((res: any) => {
        console.log(res);
        if (res.status) {
          $('#schedules').empty();
          for (let i = 0; i < res.data.length; i++) {
            let taskDescription = res.data[i].description;
            let equipmentName = res.data[i].equipmentName;
            let equipmentNumber = res.data[i].equipmentNumber;
            let estCompletionTime = res.data[i].estCompletionTime;

            let html = `
              <div class="card mx-5 my-3">
                <div class="card-body">
                  <h5 class="card-text">Equipment: ${equipmentNumber} - ${equipmentName}</h5>
                  <p class="card-text">Description: ${taskDescription}</p>
                  <p class="card-text">Estimated Completion Time: ${estCompletionTime} mins</p>
                </div>
              </div>`
            $('#schedules').append(html);
            $('.card').css('background-color', '#3b5249');
            $('.card').css('color', 'white');

          }
        } 
      });
    }

  }

}
