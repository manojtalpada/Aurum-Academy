import { Component, OnInit } from '@angular/core';
import { SocialUser, GoogleLoginProvider, FacebookLoginProvider, AuthService } from 'angularx-social-login';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MasterService, AuthenticationService } from 'src/app/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  response;  
 
  user: any = {};
  model: any = {};
  returnUrl: string;
  usersocial: SocialUser;
  sData:any = {};
  // loading = false;
  // private loggedIn: boolean;

  username:''
  fname: ''
  email: ''
  password: ''
  lname: ''

  public data;
  constructor(private SocialloginService: UserService,private authService: AuthService,private userService: UserService, private _router: Router, private _route: ActivatedRoute, private _masterservices: MasterService, public authenticationService: AuthenticationService) { }

  // ngOnInit() {
  //   // this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
  //   // this._router.navigate([this.returnUrl]);
  // }

  logindd() {
    var userLogin = {
      email:this.user.email,
      password:this.user.password,
      action:"login"

    }
    this.userService.Login(userLogin)
      .subscribe(
        data => {
          if (data.status == "0") {
            alert("login Faild");
          } else {
            alert("login successfully")
            this._router.navigate(['dashboard']);  
          }        
        },
        error => {
          alert("login Faild")
        });
  }




  ngOnInit() {
    this.authService.authState.subscribe((usersocial) => {
      this.usersocial = usersocial;
      // this.loggedIn = (usersocial != null);
   
      // console.log(usersocial);
    });
  }

  signInWithFB(): void {
    // this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(x => console.log(x));    
    let socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      (userData) => {
            //this will return user data from facebook. What you need is a user token which you will send it to the server
            this.Savesresponse(userData);        
            // this._router.navigate(['dashboard']);
       }
    );

  }
//   sendToRestApiMethod(token: string) : void {
//     this.http.post(, { token: token } 
//         .subscribe(onSuccess => {
//                        //login was successful
//                        //save the token that you got from your REST API in your preferred location i.e. as a Cookie or LocalStorage as you do with normal login
//                }, onFail => {
//                        //login was unsuccessful
//                        //show an error message
//                }
//         );
// }
Savesresponse(usersocial: SocialUser) { 
 
this.sData = {
    action: "register",
    first_name:usersocial.firstName,
    last_name: usersocial.lastName,
    user_name:"",
    email:  usersocial.email,
    password: "",
    google_id: "",
    facebook_id: usersocial.id,
    current_package_id: "",
    current_package_name: "",
    current_package_type: "",
    current_package_pay_by_user_id: "",
    master_id: "",
    user_type: "",
    url_slug: "",
  }; 
 
  this.userService.register_social(this.sData).subscribe((res: any) => {  
    // debugger;  
    this.usersocial=res.data[0];  
    // console.log(this.usersocial)
    // this.response = res.userDetail;  
    // localStorage.setItem('socialusers', JSON.stringify( this.usersocial));  
    // console.log(localStorage.setItem('socialusers', JSON.stringify(this.usersocial)));  
   this.socialLogin(usersocial.id)
    this._router.navigate(['dashboard']); 
    
  })  
}

socialLogin(userid){
  var userSet = {
    action:"social_login",
    facebook_id:userid
  }
   this.userService.social_login(userSet)
  .subscribe((res: any) => {  
    // debugger;  
    
     // this.response = res.userDetail;  
    // localStorage.setItem('socialusers', JSON.stringify( this.usersocial));  
    // console.log(localStorage.setItem('socialusers', JSON.stringify(this.usersocial)));  
     this._router.navigate(['dashboard']); 
    
  }) 
}
  // signInWithGOOLE(): void {
  //   // this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(x => console.log(x));
  //   this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userData)=>this.user=userData);
  // }

  signInWithGoogle(): void {
    // alert()
    // this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(x => console.log(x));

    let socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      (userData) => {
            //this will return user data from facebook. What you need is a user token which you will send it to the server
            this.SavesresponseGoogle(userData);        
            // this._router.navigate(['dashboard']);
       }
    );
  }
  SavesresponseGoogle(userInfo :SocialUser){
    this.sData = {
      action: "register",
      first_name:userInfo.firstName,
      last_name: userInfo.lastName,
      user_name:"",
      email:  userInfo.email,
      password: "",
      google_id: userInfo.id,
      facebook_id: "",
      current_package_id: "",
      current_package_name: "",
      current_package_type: "",
      current_package_pay_by_user_id: "",
      master_id: "",
      user_type: "",
      url_slug: "",
    }; 
   
    this.userService.register_social(this.sData).subscribe((res: any) => {  
      // debugger;  
      this.usersocial=res.data[0];  
      // console.log(this.usersocial)
      // this.response = res.userDetail;  
      // localStorage.setItem('socialusers', JSON.stringify( this.usersocial));  
      // console.log(localStorage.setItem('socialusers', JSON.stringify(this.usersocial)));  
     this.socialLoginGoogle(userInfo.id)
      this._router.navigate(['dashboard']); 
      
    })  

  }

  socialLoginGoogle(userid){
    var userSet = {
      action:"social_login",
      google_id:userid
    }
     this.userService.social_login(userSet)
    .subscribe((res: any) => {  
      // debugger;  
      
       // this.response = res.userDetail;  
      // localStorage.setItem('socialusers', JSON.stringify( this.usersocial));  
      // console.log(localStorage.setItem('socialusers', JSON.stringify(this.usersocial)));  
       this._router.navigate(['dashboard']); 
      
    }) 

  }


}
