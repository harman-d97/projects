import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLogin: boolean = false; // check if the current user is logged in
  errorMessage: any; // store error msg 

  /**
   * 
   * @param _api api service
   * @param _auth authentication service
   * @param _router router object
   */
  constructor(private _api: ApiService, private _auth: AuthService, private _router: Router) { }

  ngOnInit(): void {
    this.isUserLogin();
  }

  /**
   * when user clicks login, send the login request to the api service
   * @param form login form
   */
  onSubmit(form: NgForm) {
    console.log('login form data: ', form.value);
    this._api.postTypeRequest('user/login', form.value).subscribe((res: any) => {
      console.log(res);
      if (res.status) { // store user details in local storage
        this._auth.setDataInLocalStorage('userData', JSON.stringify(res.data));
        this._auth.setDataInLocalStorage('token', res.token);
        this._auth.setDataInLocalStorage('admin', res.data[0].adminAccess.toString());
        this._auth.setDataInLocalStorage('id', res.data[0].employeeId.toString());
        window.location.href = '/homepage-logged-in';
      } else {
        alert("Invalid username or password");
      }

    });
  }

  /**
   * check if the current user is logged in
   */
  isUserLogin() {
    if(this._auth.getUserDetails() != null) {
      this.isLogin = true;
    }
  }

  /**
   * log user out and remove user details from local storage and navigate to login page
   */
  logout() {
    console.log('logout button clicked');
    this._auth.clearStorage();
    this._router.navigate(['login']);
  }

  /**
   * navigate to register page
   */
  navigateToRegister() {
    console.log('navigate to register');
    this._router.navigate(['register']);
  }

}
