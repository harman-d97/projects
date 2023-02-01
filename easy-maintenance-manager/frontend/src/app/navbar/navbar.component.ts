import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLogin: boolean = false; // is current user logged in
  isAdmin: boolean = false; // is current user an admin

  /**
   * 
   * @param _router router object
   * @param _auth auhtentification service
   */
  constructor(private _router: Router, private _auth: AuthService) { }

  /**
   * check if user is logged in and if user is admin when component is initialized
   */
  ngOnInit(): void {
    this.isUserLogin();
    this.isAdminUser();
  }

  /**
   * if user is logged in, set isLogin to true
   */
  isUserLogin() {
    if(this._auth.getUserDetails() != null) {
      this.isLogin = true;
    }
  }

  /**
   * if user is admin, set isAdmin to true
   */
  isAdminUser() {
    if(this._auth.getAdminStatus() == '1') {
      this.isAdmin = true;
    }
  }

  /**
   * navigate to homepage
   */
  navigateToHome() {
    this._router.navigate(['/']);
  }

  /**
   * navigate to the pricing page
   */
  navigateToPricing() {
    this._router.navigate(['/pricing']);
  }

  /**
   * navigate to the login page
   */
  navigateToLogin() {
    this._router.navigate(['/login']);
  }

  /**
   * navigate to the home page when a user logs in 
   */
  navigateToHomepageLoggedIn() {
    this._router.navigate(['/homepage-logged-in']);
  }

  /**
   * navigate the all tasks page 
   */
  navigateToAllTasks() {
    this._router.navigate(['/all-tasks']);
  }

  /**
   * navigate to the mesenger page 
   */
  navigateToMessenger() {
    this._router.navigate(['/messages']);
  }

  /**
   * navigate to the reports page 
   */
  navigateToReports() {
    this._router.navigate(['/reports']);
  }

  /**
   * navigate to the manage employees page 
   */
  navigateToManageEmployees() {
    this._router.navigate(['/manage-employees']);
  }

  /**
   * logs the user out, clears the local storage and navigates to the login page
   */
  logout() {
    console.log('logout button clicked');
    this._auth.clearStorage();
    this._router.navigate(['login']);
    window.location.reload();
  }

}
