import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private baseUrl: string = "http://localhost:8090/addressbook";

  constructor(private httpClient: HttpClient) { }

  getAddressBookDetails(): Observable<any> {
    return this.httpClient.get(this.baseUrl);
  }

  deleteAddressBookDetails(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + "/deleteaddressdetails",
      {
        headers: new HttpHeaders(),
        params: new HttpParams().append('id', id)
      })
  }

  addAddressBookDetails(body: any): Observable<any> {
    return this.httpClient.post(this.baseUrl, body);
  }

  updateAddressBookDetails(body: any, id: number): Observable<any> {
    return this.httpClient.put(this.baseUrl + "/updateaddressdetails/?id=" + id , body);
  }

  getStateDetails(): Observable<any> {
    return this.httpClient.get(this.baseUrl + "/getStateDetails");
  } 

  getAddressBookDetailsByID(id: number): Observable<any> {
    return this.httpClient.get(this.baseUrl + "/getaddressdetailsbyid",
      {
        headers: new HttpHeaders(),
        params: new HttpParams().append('id', id)
      })
  }
}
