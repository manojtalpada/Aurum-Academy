import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { appConfig } from '../app.config';
import { environment } from '../../environments/environment';

 
@Injectable()
export class UserService {
    private baseUrl = environment.APP_URL;
    headers:any;
    options:any;
    constructor(private http: HttpClient) { 

        { 
            let headers = new HttpHeaders({
              'Content-Type': 'application/json',  
 
             });
             
          this.options = { headers: headers };
        //   this.bizaccount_id =localStorage.getItem("bizaccount_id"); 
          }
    }

    sendInfoToPhlebotomist(phleboDetails) {
        return this.http.post<any>(appConfig.apiUrl + '/user/sendInfoToPhlebotomist', phleboDetails)
            .map(res => {
                return res;
            });

    }

    UserStatus(status){
        return this.http.get<any>(appConfig.apiUrl+'/user/getAllStatus/'+ status)
        .map(res => {
        return res;
        });
        }

    updatePassword(user){
        return this.http.post<any>(appConfig.apiUrl+'/auth/changePassword', user)
        .map(res => {
            return res;
        });
    }

    forgotpassword(forgotdetails) {
        return this.http.post<any>(appConfig.apiUrl + '/user/forgotpassword', forgotdetails)
            .map(res => {
                return res;
            });

    }

    getAllUsers(){
        return this.http.get<any>(appConfig.apiUrl+'/user/getAllUsers')
        .map(res => {
            return res;
        });
    }

    deleteUser(id){
        return this.http.post<any>(appConfig.apiUrl+'/user/deleteUser/'+id,'')
                .map(res => {
                    return res;
                });
    }

    register(user){
        // return this.http.post<any>(appConfig.apiUrl+'/user', user)
        // .map(res => {
        //     return res;
        // });

        return this.http.post(`${this.baseUrl}/user`,JSON.stringify(user),this.options); 

    }

    activeInactiveUser(user){
        return this.http.post<any>(appConfig.apiUrl+'/user/activeInactiveUser', user)
        .map(res => {
            return res;
        });
    }

    updateUser(user){
        return this.http.post<any>(appConfig.apiUrl+'/user/updateUser', user)
        .map(res => {
            return res;
        });
    }
    Login(data){
         var user_type;
        return this.http.post(`${this.baseUrl}/login`,JSON.stringify(data),this.options)
        .map(res =>{
           
            var data;
            data = res 
            if (data && data.data.token) {
                // console.log(user);
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                sessionStorage.setItem('currentUser', JSON.stringify(data.data.result));
                sessionStorage.setItem('token', JSON.stringify(data.data.token));
                sessionStorage.setItem('first_name',JSON.stringify(data.data.result.first_name));
                sessionStorage.setItem('userid',JSON.stringify(data.data.result.id))
                // sessionStorage.setItem('user_type',JSON.stringify(data.data.result.user_type))


             }
             return data;
        })
      }
      //subaccount Login
      subLogin(data){
        return this.http.post(`${this.baseUrl}/sub_login`,JSON.stringify(data),this.options)
        .map(res =>{
             var data;
            data = res
            if (data && data.data.token) {
                // console.log(user);
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                sessionStorage.setItem('currentUser', JSON.stringify(data.data.result));
                sessionStorage.setItem('token', JSON.stringify(data.data.token));
                sessionStorage.setItem('first_name',JSON.stringify(data.data.result.first_name));
                sessionStorage.setItem('userid',JSON.stringify(data.data.result.id))
                // sessionStorage.setItem('user_type',JSON.stringify(data.data.result.user_type)) 

             }
             return data;
        })
      }
    register_social(data){
        return this.http.post<any>(`${this.baseUrl}/user`,JSON.stringify(data),this.options) 
        //   return this.http.post<any>(appConfig.apiUrl+'/user', data)
        // .map(res => {
        //     return res;
        // });

    }
    social_login(userid){
        return this.http.post<any>(`${this.baseUrl}/social_login`,JSON.stringify(userid),this.options) 
        .map(res =>{
           
            var data;
            data = res
            if (data && data.data.token) {
                // console.log(user);
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                sessionStorage.setItem('currentUser', JSON.stringify(data.data.result));
                sessionStorage.setItem('token', JSON.stringify(data.data.token));
                sessionStorage.setItem('first_name',JSON.stringify(data.data.result.first_name));
                sessionStorage.setItem('userid',JSON.stringify(data.data.result.id));
                // sessionStorage.setItem('user_type',JSON.stringify(data.data.result.user_type))

             }
            
            return data;
        })
        
    }
    // register_socialfb(data){
    //     console.log(this.baseUrl)
    //     return this.http.post<any>(`${this.baseUrl}/user`,JSON.stringify(data),this.options) 

    // }
    
    // register_social(suser){
        
    //     return this.http.post<any>(appConfig.apiUrl+'/user', suser)
    //     // return this.http.post<any>(`${this.baseUrl}/user`,JSON.stringify(suser),this.options) 

    //     .map(res => {   
    //          // login successful if there's a jwt token in the response
    //          if (res && res.token) {
    //             console.log(res);
    //             // store user details and jwt token in local storage to keep user logged in between page refreshes
    //             localStorage.setItem('currentUser', JSON.stringify(res));
    //             localStorage.setItem('userType', res.user.userType);
    //             localStorage.setItem('token', JSON.stringify(res.token));
    //             localStorage.setItem('username', res.user.username);                   
    //         }            
    //         return res;
    //     });
    // }
    addNewUser(user){
        return this.http.post<any>(appConfig.apiUrl+'/auth/register', user)
        .map(res => {   
            return res;
        });
    }

    getLoggedInUser(){
        return this.http.get<any>(appConfig.apiUrl+'/user/getUser')
        .map(res => {
            return res;
        });
    }
 
}