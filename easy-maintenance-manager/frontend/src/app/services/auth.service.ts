import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  /**
   * returns user details that were stored in local storage
   */
  getUserDetails() {
    if(localStorage.getItem('userData')) {
      return localStorage.getItem('userData');
    } else {
      return null;
    }
  }

  /**
   * 
   * @returns the employeeId that was stored in local storage
   */
  getUserId() {
    if(localStorage.getItem('id')) {
      return localStorage.getItem('id');
    } else {
      return null;
    }
  }

  /**
   * 
   * @returns return the role of the user that was stored in local storage
   */
  getAdminStatus() {
    if(localStorage.getItem('admin')) {
      return localStorage.getItem('admin');
    } else {
      return null;
    }
  }

  /**
   * stores data in local storage
   * @param variableName name of the variable to be stored in local storage
   * @param data data to be stored in local storage
   */
  setDataInLocalStorage(variableName: string, data: string) {
    localStorage.setItem(variableName, data);
  }

  /**
   * 
   * @returns the token that was stored in local storage
   */
  getToken() {
    return localStorage.getItem('token');
  }

  /**
   * removes all data from local storage
   */
  clearStorage() {
    localStorage.clear();
  }
}
