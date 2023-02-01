import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

declare var $: any;

@Component({
  selector: 'app-homepage-logged-in',
  templateUrl: './homepage-logged-in.component.html',
  styleUrls: ['./homepage-logged-in.component.scss']
})
export class HomepageLoggedInComponent implements AfterViewChecked {

  isLogin: boolean = false; // if user is logged in 
  isAdmin: boolean = false; // is user is admin
  buttonIds: any = []; // button ids of dynamically created buttons

  /**
   * checks if user is logged in and if user is admin
   * @param _api api service
   * @param _router router object
   * @param _auth authentification service
   */
  constructor(private _api: ApiService, private _router: Router, private _auth: AuthService) { 
    this.isUserLogin();
    this.isAdminUser();
  }

  /**
   * if user is logged in, set isLogin to true
   */
  isUserLogin() {
    if(this._auth.getUserDetails() != null) {
      //window.location.reload();
      this.isLogin = true;
      this.renderTodaysTasks();
    } else {
      this._router.navigate(['login']);
    }
  }

  /**
   * is user is admin set isAdmin to true
   */
  isAdminUser() {
    if(this._auth.getAdminStatus() == '1') {
      this.isAdmin = true;
    }
  }

  /**
   * renders all tasks for today by calling api service
   */
  renderTodaysTasks() {
    console.log('render todays tasks');
    this._api.getTypeRequest('tasks/get-todays-tasks').subscribe((res: any) => {
      console.log(res);
      if(res.status) {
        for(let i = 0; i < res.data.length; i++) {
          let equipmentName = res.data[i].equipmentName;
          let equipmentNumber = res.data[i].equipmentNumber;
          let description = res.data[i].description;
          let dateDue = res.data[i].dateDue.slice(0, 10);
          let employeeId = res.data[i].employeeId;
          let taskId = res.data[i].taskId.toString();

          this.buttonIds.push(taskId);

          this._api.postTypeRequest('tasks/get-employee-name', {employeeId: employeeId}).subscribe((res: any) => {
            console.log(res);
            if(res.status) {
              let employeeName = res.data[0].firstName + ' ' + res.data[0].lastName;
              let html = `
                <div class="card mb-3">
                  <div class="card-body">
                    <h5 class="card-text">${equipmentName} - ${equipmentNumber}</h5>
                    <p class="card-text">${description}</p>
                    <p class="card-text">&nbsp;&nbsp;&nbsp;&nbsp;Date Due: ${dateDue}&nbsp;&nbsp;&nbsp;&nbsp;Assigned To: ${employeeName}</p>
                  </div>
                  <div class="card-footer text-end">
                    <button type="button" class="btn btn-primary" id="edit${taskId}">Edit</button>
                    <button type="button" class="btn btn-primary" id="completed${taskId}">Completed</button>
                    <button type="button" class="btn btn-primary" id="delete${taskId}">Delete</button>
                  </div>
                </div>`;
              $('#tasks').append(html);
              $('.card').css('background-color', '#3b5249');
              $('.card').css('color', 'white');
            }
          });
        }
      }
    });
  }

  /**
   * add click event listeners to dynamically created edit, completed, and delete buttons
   */
  ngAfterViewChecked(): void {
    let currentEmployeeId = this._auth.getUserId();
    for(let i = 0; i < this.buttonIds.length; i++) {
      let id = this.buttonIds[i];

      $(`#edit${id}`).click(() => {
        console.log("edit button clicked with id: " + id);
        this._router.navigateByUrl('/edit-task', {state: id});
      });

      $(`#completed${id}`).click(() => {
        console.log("completed button clicked with id: " + id);
        this._api.postTypeRequest('tasks/update-task-status', {taskId: id, employee: currentEmployeeId}).subscribe((res: any) => {
          console.log(res);
          if(res.status) {
            window.location.reload();
          } else {
            alert("Error updating task status");
          }
        });
      });

      $(`#delete${id}`).click(() => {
        console.log("delete button clicked with id: " + id);
        this._api.postTypeRequest('tasks/delete-task', {taskId: id, employee: currentEmployeeId}).subscribe((res: any) => {
          console.log(res);
          if(res.status) {
            window.location.reload();
          } else {
            alert("Error deleting task");
          }
        });
      });

      if (!this.isAdmin) {
        $(`#delete${id}`).prop('disabled', true);
      }
    }
  }

  /**
   * navigate to new equipment page
   */
  navigateToCreateNewEquipment() {
    this._router.navigate(['/create-new-equipment']);
  }

  /**
   * navigate to new task page
   */
  navigateToCreateNewTask() {
    this._router.navigate(['/create-new-task']);
  }

  /**
   * navigate to employee schedule page
   */
  navigateToEmployeeSchedule() {
    this._router.navigate(['/employee-schedule']);
  }

  /**
   * navigate to all employees schedules page 
   */
  navigateToAllEmployeeSchedules() {
    this._router.navigate(['/all-employee-schedules']);
  }

}

