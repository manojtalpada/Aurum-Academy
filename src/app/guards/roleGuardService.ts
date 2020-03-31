import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService } from '../services';
import * as decode  from 'jwt-decode';

@Injectable()
export class RoleGuardService implements CanActivate {

  constructor(public auth: AuthenticationService, public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {

    // this will be passed from the route config
    const token = localStorage.getItem('token');
    if (!token){
      this.router.navigate(['/login']);
      return false;      
    }
    const tokenPayload = decode(token);
    let expectedRoleArray = route.data;
    expectedRoleArray = expectedRoleArray.expectedRole;
    const userType = tokenPayload.user.userType;
    let  expectedRole = '';
 
    for(let i=0; i<expectedRoleArray.length; i++){
      if(expectedRoleArray[i] == tokenPayload.user.userType){
       // console.log("Roles Matched");
        expectedRole = tokenPayload.user.userType;
      }
    }

    if (this.auth.isAuthenticated() || userType != expectedRole) {   
      return false;
    }   
    return true;
  }

}