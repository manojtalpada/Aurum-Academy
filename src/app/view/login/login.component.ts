import { Component, OnInit } from '@angular/core';
import { SocialUser, GoogleLoginProvider, FacebookLoginProvider, AuthService } from 'angularx-social-login';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MasterService, AuthenticationService } from 'src/app/services';
import { IOption } from 'ng-select';
import { AunumService } from 'src/app/services/aunumServices';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  response;  
 userType:any={}
  user: any = {};
  model: any = {};
  returnUrl: string;
  usersocial: SocialUser;
  sData:any = {};
  // loading = false;
  // private loggedIn: boolean;
  public type: Array<IOption> = [
      
    { value: 't', label: 'Teacher' },
    { value: 's', label: 'Student' }

];

  username:''
  fname: ''
  email: ''
  password: ''
  lname: ''

  public data;
  constructor(private SocialloginService: UserService,private aunumservices : AunumService,private authService: AuthService,private userService: UserService, private _router: Router, private _route: ActivatedRoute, private _masterservices: MasterService, public authenticationService: AuthenticationService) { }

  // ngOnInit() {
  //   // this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
  //   // this._router.navigate([this.returnUrl]);
  // }
  ngOnInit() {
    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
  this._router.navigate([this.returnUrl]);
  this.authenticationService.isLogout();
  this.authService.authState.subscribe((usersocial) => {
    this.usersocial = usersocial;
    // this.loggedIn = (usersocial != null);
 
    // console.log(usersocial);
  });
}

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
             // console.log(data.data.result)
            this.userType = data.data.result;

            if(this.userType.user_type !="" && this.userType.user_type !=null){
              // this._router.navigate(['dashboard']);  
              this._router.navigate([this.returnUrl]);

            }else{

              alert('select Type first')
              document.getElementById("openModalButton").click();
               

            }
            
          }        
        },
        error => {
          alert("login Faild")
        });
  }
  addUserType(){
    var data = {
      user_id:this.userType.id,

      my_id:this.userType.id,
      first_name:this.userType.first_name,
      last_name:this.userType.last_name,
      user_name:this.userType.user_name,
      birthdate:this.userType.birthdate,
      email:this.userType.email,
      password:this.userType.password,
      google_id:this.userType.google_id,
      facebook_id:this.userType.facebook_id,
      current_package_id:"",
      current_package_name:"",
      current_package_type:"",
      current_package_pay_by_user_id:"",
      master_id:"",
      user_type:this.userType.user_type,
      url_slug:"",
      action:"update"
    }
    console.log(data)
    this.aunumservices.registerUpdate(data)
    .subscribe(
      data => { 
        var custdetails = data; 
        // console.log(data.data.result)
       if(this.userType.google_id !=""){
         this.socialLoginGoogle(this.userType.google_id)
       }
       if(this.userType.facebook_id !=""){
         this.socialLogin(this.userType.facebook_id)
       }
        // this._router.navigate(['login']);
        this.logindd();


       
      },
      error => {
        console.log(error);
      });
    console.log(data)
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
    birthdat:"",
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
    // this._router.navigate(['dashboard']); 
    
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
    console.log(res.data.result)

    this.userType = res.data.result;

    if(this.userType.user_type !=null && this.userType.user_type !=""){
      this._router.navigate(['dashboard']);  

    }else{

      alert('select Type first')
      document.getElementById("openModalButton").click();
       

    }
    
     // this.response = res.userDetail;  
    // localStorage.setItem('socialusers', JSON.stringify( this.usersocial));  
    // console.log(localStorage.setItem('socialusers', JSON.stringify(this.usersocial)));  
    //  this._router.navigate(['dashboard']); 
    
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
      birthdate:"",
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
      console.log(res)
      // console.log(this.usersocial)
      // this.response = res.userDetail;  
      // localStorage.setItem('socialusers', JSON.stringify( this.usersocial));  
      // console.log(localStorage.setItem('socialusers', JSON.stringify(this.usersocial)));  
     this.socialLoginGoogle(userInfo.id)
      
      
    })  

  }

  socialLoginGoogle(userid){
   
    var userSet = {
      action:"social_login",
      google_id:userid
    }
    console.log(userSet)
     this.userService.social_login(userSet)
    .subscribe((res: any) => {  
      // debugger;  
      
      // this._router.navigate(['dashboard']);  

      this.userType = res.data.result;
      console.log(res.data)

      if(this.userType.user_type !=null && this.userType.user_type !="" && this.userType.user_type!=undefined){
        this._router.navigate(['dashboard']);  

      }else{

        alert('select Type first')
        document.getElementById("openModalButton").click();
         

      }

       // this.response = res.userDetail;  
      // localStorage.setItem('socialusers', JSON.stringify( this.usersocial));  
      // console.log(localStorage.setItem('socialusers', JSON.stringify(this.usersocial)));  
        
      
    }) 

  }


}
