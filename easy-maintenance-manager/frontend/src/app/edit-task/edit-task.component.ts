import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

  taskId: string = ''; // current task id
  isLogin: boolean = false; // if user is logged in
  employees: any = []; // list of employees
  showMsg: boolean = false; // show message to user
  msg: string = ''; // message
  taskDescription: string = ''; // current task description
  taskAssignedTo: string = ''; // task currenlty assigned to
  taskRepeatAfter: Number = 0; // current task repeat time 
  taskEquipmentName: string = ''; // current task equipment name
  taskEquipmentNumber: string = ''; // current task equipment number
  taskDate: String = ''; // current date task is scheduled for
  taskEstCompletionTime: string = ''; // current est completion time of task


  /**
   * 
   * @param _api api service
   * @param _router router object
   * @param _auth authenication service
   */
  constructor(private _api: ApiService, private _router: Router, private _auth: AuthService) { 
    
  }

  /**
   * get task id from url, check if user is logged in, populate form with task details
   */
  ngOnInit(): void {
    this.taskId = history.state[0];
    console.log(this.taskId);
    this.isUserLogin();
    this.populateForm();
  }

  /**
   * check if user is logged in
   */
  isUserLogin() {
    if(this._auth.getUserDetails() != null) {
      this.isLogin = true;
      this.getEmployees(); // get list of employees
    } else {
      this._router.navigate(['login']);
    }
  }

  /**
   * populate form with current task details
   */
  populateForm() {
    this._api.postTypeRequest('tasks/get-task-by-id', {taskId: this.taskId}).subscribe((res: any) => {
      console.log(res);
      if (res.status) {
        this.taskDescription = res.data[0].description;
        this.taskAssignedTo = res.data[0].employeeId;
        this.taskRepeatAfter = res.data[0].repeatAfter;
        this.taskEquipmentName = res.data[0].equipmentName;
        this.taskEquipmentNumber = res.data[0].equipmentNumber;
        this.taskDate = res.data[0].dateDue.slice(0, 10);
        this.taskEstCompletionTime = res.data[0].estCompletionTime;
        console.log(this.taskDescription + " " + this.taskAssignedTo + " " + this.taskRepeatAfter + " " + this.taskEquipmentName + " " + this.taskEquipmentNumber + " " + this.taskDate + " " + this.taskEstCompletionTime);
      } else {
        this.msg = 'Error while fetching task details';
        this.showMsg = true;
      }
    });
  }

  /**
   * get list of employees and store in employees array
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
   * when user clicks update button, send updated task details to api service
   * @param form edit task form
   */
  onSubmit(form: NgForm) {
    console.log('Edit task form data: ', form.value);
    let currentEmployeeId = this._auth.getUserId();
    this._api.postTypeRequest('tasks/update', { data: form.value, id: this.taskId, employee: currentEmployeeId }).subscribe((res: any) => {
      console.log(res);
      if (res.status) {
        this.msg = 'Task updated successfully';
        this.showMsg = true;
        form.reset(); 
      } else {
        this.msg = 'Error while updating task';
        this.showMsg = true;
      }
    });
  }

}
