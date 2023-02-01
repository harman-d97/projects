import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  errorMessage: any; // error message if there is an error

  /**
   * 
   * @param _api api service
   * @param _auth authentication service
   * @param _router router object
   */
  constructor(private _api: ApiService, private _auth: AuthService, private _router: Router) { }

  ngOnInit(): void {
  }

  /**
   * when user clicks register, send the register request to the api service
   * @param form register form
   */
  onSubmit(form: NgForm) {
    console.log("register clicked");
    console.log(form.value);
    this._api.postTypeRequest('user/register', form.value).subscribe((res: any) => {
      console.log(res);
      if (res.status) {
        console.log(res.data);
        this._auth.setDataInLocalStorage('userData', JSON.stringify(res.data));
        this._auth.setDataInLocalStorage('token', res.token);
        this._auth.setDataInLocalStorage('id', form.value.employeeId.toString());
        this.logout();
        this._router.navigate(['login']);
      } else {
        console.log(res);
        alert(res.msg);
      }
    });
  }

  /**
   * remove user details from local storage
   */
  logout() {
    this._auth.clearStorage();
  }

}
