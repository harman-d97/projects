import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-new-task',
  templateUrl: './create-new-task.component.html',
  styleUrls: ['./create-new-task.component.scss']
})
export class CreateNewTaskComponent implements OnInit {

  isLogin: boolean = false; // if user is logged in
  showMsg: boolean = false; // show message to user
  msg: string = ''; // message
  employees: any = []; // list of employees
  equipments: any = []; // list of equipments
  equipmentNum: string = ''; // equipment number of current equipment

  /**
   * 
   * @param _api api service
   * @param _router router object
   * @param _auth authentication service
   */
  constructor(private _api: ApiService, private _router: Router, private _auth: AuthService) { }

  /**
   * check if user is logged in when component is loaded
   */
  ngOnInit(): void {
    this.isUserLogin();
  }

  /**
   * check if the current user is logged in
   */
  isUserLogin() {
    if(this._auth.getUserDetails() != null) {
      this.isLogin = true;
      this.getEmployees();
      this.getEquipments();
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
   * get all equipments and store them in equipments array
   */
  getEquipments() {
    this._api.getTypeRequest('equipment/get-all-equipment').subscribe((res: any) => {
      console.log(res);
      if (res.status) {
        this.equipments = res.data;
      } else {
        this.equipments = [];
      }
    });
  }

  /**
   * store the equipment number of current equipment
   * @param event equipment number change event
   */
  showEquipmentNumber(event: any) {
    console.log(event.value);
    this.equipments.forEach((equipment: any) => {
      if(equipment.equipmentName == event.value) {
        this.equipmentNum = equipment.equipmentNumber;
      }
    });
  }

  /**
   * when user clicks create task, send the new task form data to the api service
   * @param form create new task form
   */
  onSubmit(form: NgForm) {
    console.log('Create new task form data: ', form.value);
    let currentEmployeeId = this._auth.getUserId();
    this._api.postTypeRequest('tasks/create', {data: form.value, currentEmployee: currentEmployeeId }).subscribe((res: any) => {
      console.log(res);
      if (res.status) {
        this.msg = 'Task created successfully';
        this.showMsg = true;
        form.reset(); 
      } else {
        this.msg = 'Error while creating task';
        this.showMsg = true;
      }
    });
  }

}
