import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { appConfig } from '../app.config';

@Injectable()
export class AunumService {

    // private baseUrl = appConfig.apiUrl;
    options:any;
    constructor(private http: HttpClient) { }


    registerInsert(user){
        return this.http.post<any>(appConfig.apiUrl+'/user', user)
        .map(res => {
            return res;
        });
        // return this.http.post(`${this.baseUrl}/user`,JSON.stringify(data),this.options);   
    
    }
    registerUpdate(user){
        return this.http.post<any>(appConfig.apiUrl+'/user', user)
        .map(res => {
            return res;
        });
    }
    getAllUsers(data){
        return this.http.post<any>(appConfig.apiUrl+'/user/',data)
        .map(res => {
            return res;
        });
    }
    updateuserdata(data){
        return this.http.post<any>(appConfig.apiUrl + '/user/', data)
        .map(res => {
            return res;
        });
    }
    updateuser(data){
        return this.http.post<any>(appConfig.apiUrl + '/user/', data)
        .map(res => {
            return res;
        });
    }
    UpdateProfiledata(data){
        return this.http.post<any>(appConfig.apiUrl + '/user/',data)
        .map(res =>{
            return res;
        })
    }
    updatePassword(data)
    {
        return this.http.post<any>(appConfig.apiUrl + '/user/',data)
        .map(res =>{
            return res;
        }) 
    }
    DeleteUser(data){
        return this.http.post<any>(appConfig.apiUrl + '/user/', data)
        .map(res => {
            return res;
        });
    }


    // course

    getAllCourse(data){
        return this.http.post<any>(appConfig.apiUrl + '/courses/', data)
        .map(res => {
            return res;
        });
    }
    insertCourse(data){
        return this.http.post<any>(appConfig.apiUrl + '/courses/', data)
        .map(res => {
            return res;
        });
    }
    UpdateCourse(data){
        return this.http.post<any>(appConfig.apiUrl + '/courses/', data)
        .map(res => {
            return res;
        });
    }
    DeleteCourse(data){
        return this.http.post<any>(appConfig.apiUrl + '/courses/', data)
        .map(res => {
            return res;
        });
    }

    // Deck services

    getAllDeck(data){
        return this.http.post<any>(appConfig.apiUrl + '/decks/', data)
        .map(res => {
            return res;
        });
    }
    insertDeck(data){
        return this.http.post<any>(appConfig.apiUrl + '/decks/', data)
        .map(res => {
            return res;
        });
    }
    UpdateDeck(data){
        return this.http.post<any>(appConfig.apiUrl + '/decks/', data)
        .map(res => {
            return res;
        });
    }
    DeleteDeck(data){
        return this.http.post<any>(appConfig.apiUrl + '/decks/', data)
        .map(res => {
            return res;
        });
    }
    // Login(data){
    //     return this.http.post(`${this.baseUrl}/login`,JSON.stringify(data),this.options); 
    //   }
      Login(email: string, password: string,action : string) {
        return this.http.post<any>(appConfig.apiUrl+'/login', { email: email, password: password,action:action })
            .map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // console.log(user);
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    localStorage.setItem('userType', user.user.userType);
                    localStorage.setItem('token', JSON.stringify(user.token));
                    localStorage.setItem('username', user.user.username);                   
                }
                return user;
            });
    }

    // getAllImage(data){
    //     return this.http.post<any>(appConfig.apiUrl + '/uploadimg/', data)
    //     .map(res => {
    //         return res;
    //     });
    // }
    Addimage(data){
        return this.http.post<any>(appConfig.apiUrl + '/uploadimg/', data)
        .map(res => {
            return res;
        });
    }


// attachments
    getAllAttachment(data){
        return this.http.post<any>(appConfig.apiUrl + '/attachments/', data)
        .map(res => {
            return res;
        });
    }

    insertAttachment(data){
        return this.http.post<any>(appConfig.apiUrl + '/attachments/', data)
        .map(res => {
            return res;
        });
    }
    UpdateAttachment(data){

        return this.http.post<any>(appConfig.apiUrl + '/attachments/', data)
        .map(res => {
            return res;
        });
    }
    DeleteAttachment(data){
        return this.http.post<any>(appConfig.apiUrl + '/attachments/', data)
        .map(res => {
            return res;
        });
    }

    // Folders 

    getAllFolder(data){
        return this.http.post<any>(appConfig.apiUrl + '/folders/', data)
        .map(res => {
            return res;
        });
    }
    //Lessons
     
    getAllLesson(data){
        return this.http.post<any>(appConfig.apiUrl + '/lessons/', data)
        .map(res => {
            return res;
        });
    }
    DeleteFolder(data){
        return this.http.post<any>(appConfig.apiUrl + '/folders/', data)
        .map(res => {
            return res;
        });
    }
    
    insertLesson(data){
        return this.http.post<any>(appConfig.apiUrl + '/lessons/', data)
        .map(res => {
            return res;
        });
    }
    UpdateFolder(data){
        return this.http.post<any>(appConfig.apiUrl + '/folders/', data)
        .map(res => {
            return res;
        });
    }
    updateLesson(data){
        return this.http.post<any>(appConfig.apiUrl + '/lessons/', data)
        .map(res => {
            return res;
        });
    }
    insertFolder(data){
        return this.http.post<any>(appConfig.apiUrl + '/folders/', data)
        .map(res => {
            return res;
        });
    }
    deleteLesson(data){
        return this.http.post<any>(appConfig.apiUrl + '/lessons/', data)
        .map(res => {
            return res;
        });
    }

    // cards API

    getAllCard(data){
        return this.http.post<any>(appConfig.apiUrl + '/cards/', data)
        .map(res => {
            return res;
        });
    }
    getAllCardById(data){
        return this.http.post<any>(appConfig.apiUrl + '/get_cards_by_deck_id/', data)
        .map(res => {
            return res;
        });
    }
    insertCard(data){
        return this.http.post<any>(appConfig.apiUrl + '/cards/', data)
        .map(res => {
            return res;
        });
    }
}