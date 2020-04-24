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
  facebookid= JSON.parse(sessionStorage.getItem("Facebook_ID"));
   
  googleid= JSON.parse(sessionStorage.getItem("Google_ID"));

  constructor(private _route: ActivatedRoute,
    private _router: Router,private authService: AuthService) { }

  ngOnInit() {
    // this.signOut();
    
    // sessionStorage.removeItem('token');
    // sessionStorage.clear();
    // this._router.navigate(['login']);
    if(this.googleid !="" && this.googleid !=null){
      // alert("google")
    this.authService.signOut();  
    sessionStorage.removeItem('token');
    sessionStorage.clear();
    this._router.navigate(['login','']); 
    // this.signOut();
    
  }else if(this.facebookid !="" && this.facebookid !=null){
    // alert("facebook")
    this.authService.signOut();  
    sessionStorage.removeItem('token');
    sessionStorage.clear();
    this._router.navigate(['login','']); 
  }else{
    // alert("simple")
    sessionStorage.removeItem('token');
    sessionStorage.clear();
    this._router.navigate(['login','']);
    // console.log(this.userid)
 }
  }

  signOut(): void {
    this.authService.signOut();
  }

}
