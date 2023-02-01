import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

declare var $: any;

@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.scss']
})
export class AllTasksComponent implements AfterViewChecked {

  isLogin: boolean = false; // if user is logged in
  isAdmin: boolean = false; // if admin user is logged in
  buttonIds: any = []; // store button ids of all dynamically created buttons

  /**
   * checks if user is logged in and if admin user is logged in
   * @param _api api service
   * @param _router router object
   * @param _auth authentication service
   */
  constructor(private _api: ApiService, private _router: Router, private _auth: AuthService) {
    this.isUserLogin();
    this.isAdminUser();
  }

  /**
   * check if the current user is logged in 
   */
  isUserLogin() {
    if(this._auth.getUserDetails() != null) {
      this.isLogin = true;
      this.renderAllTasks(); // displays all tasks
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
   * get all uncompleted tasks and displays them to the user 
   */
  renderAllTasks() {
    console.log('render all tasks');
    this._api.getTypeRequest('tasks/get-all-tasks').subscribe((res: any) => {
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
                </div>`
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
   * after view is checked, add event listeners to all dynamically created buttons
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
        this._api.postTypeRequest('tasks/delete', {taskId: id, employee: currentEmployeeId}).subscribe((res: any) => {
          console.log(res);
          if(res.status) {
            window.location.reload();
          } else {
            alert("Error deleting task");
          }
        });
      });

      // disbale delete button if user is not an admin user
      if (!this.isAdmin) {
        $(`#delete${id}`).prop('disabled', true);
      }
    }
  }

  /**
   * navigate to the create ne equipment page
   */
  navigateToCreateNewEquipment() {
    this._router.navigate(['/create-new-equipment']);
  }

  /**
   * navigate to the create new task page
   */
  navigateToCreateNewTask() {
    this._router.navigate(['/create-new-task']);
  }

  /**
   * navigate to the employee schedule page
   */
  navigateToEmployeeSchedule() {
    this._router.navigate(['/employee-schedule']);
  }

  /**
   * navigate to the all employees tasks page
   */
  navigateToAllEmployeeSchedules() {
    this._router.navigate(['/all-employee-schedules']);
  }

}
