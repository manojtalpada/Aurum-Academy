import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { appConfig } from '../app.config';
import { JwtHelperService } from '@auth0/angular-jwt';

 
@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }
 
    // login(username: string, password: string) {
    //     return this.http.post<any>(appConfig.apiUrl+'/auth/login', { username: username, password: password })
    //         .map(user => {
    //             // login successful if there's a jwt token in the response
    //             if (user && user.token) {
    //                 // console.log(user);
    //                 // store user details and jwt token in local storage to keep user logged in between page refreshes
    //                 localStorage.setItem('currentUser', JSON.stringify(user));
    //                 localStorage.setItem('userType', user.user.userType);
    //                 localStorage.setItem('token', JSON.stringify(user.token));
    //                 localStorage.setItem('username', user.user.username);                   
    //             }
    //             return user;
    //         });
    // }
    public isAuthenticated(): boolean {
        const token = sessionStorage.getItem('token');    
        // Check whether the token is expired and return
        // true or false
        const helper = new JwtHelperService();
        // console.log(!helper.isTokenExpired(token));
        return !helper.isTokenExpired(token);
    }

    public isLogout (){
        sessionStorage.removeItem('token');
        sessionStorage.clear();
    }
 
    logout() {
        // remove user from local storage to log user out
        sessionStorage.removeItem('token');
    }
}