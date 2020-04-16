import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  API_URL: string = "/api/";
  constructor(private http: HttpClient) { }
  getContacts(){	
   return this.http.get(this.API_URL +'contact')
  }
  getContact(username){
  //  return this.http.get(`${this.API_URL + username+'/contact'}`) 
  //  console.log(this.http.get(`${this.API_URL + username+'/contact'}`));
  // return this.http.get(`${this.API_URL + 'contact'}/${username}`) 
  }
}
