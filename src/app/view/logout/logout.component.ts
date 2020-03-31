import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'angularx-social-login';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  returnUrl: string; 
  constructor(private _route: ActivatedRoute,
    private _router: Router,private authService: AuthService) { }

  ngOnInit() {
       
    sessionStorage.removeItem('token');
    sessionStorage.clear();
    this.signOut();
    this._router.navigate(['login']);
  }

  signOut(): void {
    this.authService.signOut();
  }

}
