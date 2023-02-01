import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'http://localhost:4000/'

  constructor(private _http: HttpClient) { }

  /**
   * get request to the server
   * @param url url to send the request to
   * @returns date from the server
   */
  getTypeRequest(url: string) {
    return this._http.get(`${this.baseUrl}${url}`).pipe(map(res => {
      return res;
    }))
  }

  /**
   * post request to the server
   * @param url url to send the request to
   * @param payload data to send to the server
   * @returns data from the server
   */
  postTypeRequest(url: string, payload: any) {
    return this._http.post(`${this.baseUrl}${url}`, payload).pipe(map(res => {
      return res;
    }));
  }

  /**
   * put request to the server 
   * @param url url to send the request to
   * @param payload data to send to the server
   * @returns data from the server
   */
  putTypeRequest(url: string, payload: any) {
    return this._http.put(`${this.baseUrl}${url}`, payload).pipe(map(res => {
      return res;
    }));
  }
}
