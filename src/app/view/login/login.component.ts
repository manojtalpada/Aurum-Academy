import { Component, OnInit } from '@angular/core';
import { SocialUser, GoogleLoginProvider, FacebookLoginProvider, AuthService } from 'angularx-social-login';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MasterService, AuthenticationService } from 'src/app/services';
import { IOption } from 'ng-select';
import { AunumService } from 'src/app/services/aunumServices';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  response;
  userType: any = {};
  user: any = {};
  model: any = {};
  returnUrl: string;
  usersocial: SocialUser;
  sData:any = {};
  loading = false;
  // private loggedIn: boolean;
  public type: Array<IOption> = [
    { value: "t", label: "Teacher" },
    { value: "s", label: "Student" },
  ];

  username: "";
  fname: "";
  email: "";
  password: "";
  lname: "";
  params: Params;
  public data;
  slug_url:any={}
  contact: any;
  userdata: any = {};
  contacts: any[] = [];
  constructor(private SocialloginService: UserService,private contactService: ContactService,private aunumservices : AunumService,private authService: AuthService,private userService: UserService, private _router: Router, private _route: ActivatedRoute, private _masterservices: MasterService, public authenticationService: AuthenticationService) { }

  // ngOnInit() {
   
  //   // this._router.navigate([this.returnUrl]);
  // }
  ngOnInit() {


    // this.contactService.getContacts().subscribe((data : any[])=>{
    //   console.log(data);
    //   this.contacts = data;
    //   console.log(this.contacts)
    //   }),
      // this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
    this._route.paramMap.subscribe(params => {
      console.log(params.get("slug_url"))
      this.slug_url = params.get("slug_url")

  })
    
     this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
  this._router.navigate([this.returnUrl]);
  this.authenticationService.isLogout();
  this.authService.authState.subscribe((usersocial) => {
    this.usersocial = usersocial;
    // this.loggedIn = (usersocial != null);
 

  });
}

  logindd() {
    var userLogin = {
      email:this.user.email,
      password:this.user.password,
      action:"login"

    }

    if(this.slug_url == null || this.slug_url == "" || this.slug_url == undefined){
      this.userService.Login(userLogin)
      .subscribe(
        res => {
          if (res.status == "0") {
            alert("login Faild");
          } else {

            // alert("login successfully");
             var val = {
        birthdate: res.data.result.birthdate,
        created_at: res.data.result.created_at,
        current_package_id: res.data.result.current_package_id,
        current_package_name: res.data.result.current_package_name,
        current_package_pay_by_user_id:res.data.result.current_package_pay_by_user_id,
        current_package_type: res.data.result.current_package_type,
        deleted_status: res.data.result.deleted_status,
        email: res.data.result.email,
        facebook_id: res.data.result.facebook_id,
        first_name: res.data.result.first_name,
        google_id: res.data.result.google_id,
        id: res.data.result.id,
        last_name: res.data.result.last_name,
        master_id: res.data.result.master_id,
        password: res.data.result.password,
        permission_to_create_course:res.data.result.permission_to_create_course,
        permission_to_join_classes: res.data.result.permission_to_join_classes,
        status: res.data.result.status,
        updated_at: res.data.result.updated_at,
        url_slug: res.data.result.url_slug,
        user_name: res.data.result.user_name,
        user_type:this.uType,
      };
            // console.log(data.data.result)
            this.userType = val;
            // console.log(this.userType)

            if(this.userType.user_type !="" && this.userType.user_type !=null){
            // this._router.navigate(['dashboard']);
            this._router.navigate([this.returnUrl]);

            }else{

               document.getElementById("openModalUserButton").click();

            }
          }
        },
        (error) => {
          alert("login Faild");
        }
      );
    } else {
      var subuserLogin = {
        email: this.user.email,
        password: this.user.password,
        url_slug: this.slug_url,
        action: "sub_login",
      };
      console.log(subuserLogin);

      this.userService.subLogin(subuserLogin).subscribe(
        (data) => {
          if (data.status == "0") {
            alert("login Faild");
          } else {
            alert("login successfully");
            // console.log(data.data.result)
            // this.userType = data.data.result;
            this._router.navigate([this.slug_url+'/dashboard']);
            // this._router.navigate(['course']);
          }
        },
        (error) => {
          alert("login Faild");
        }
      );
    }
  }
  logindd1() {
    var userLogin = {
      email: this.user.email,
      password: this.user.password,
      action: "login",
    };
    if (this.slug_url == null || this.slug_url == "" || this.slug_url == undefined ) {
 
      this.userService.Login(userLogin).subscribe(
        (res) => {
          if (res.status == "0") {
            alert("login Faild");
          } else {

            alert("login successfully");
            
            // console.log(data.data.result)
             
            // console.log(this.userType)
 
            // this._router.navigate(['dashboard']);
            this._router.navigate([this.returnUrl]);
 
          }
        },
        (error) => {
          alert("login Faild");
        }
      );
    } else {
      var subuserLogin = {
        email: this.user.email,
        password: this.user.password,
        url_slug: this.slug_url,
        action: "sub_login",
      };
      console.log(subuserLogin);

      this.userService.subLogin(subuserLogin).subscribe(
        (data) => {
          if (data.status == "0") {
            alert("login Faild");
          } else {
            alert("login successfully");
            // console.log(data.data.result)
            // this.userType = data.data.result;
            this._router.navigate([this.slug_url+'/dashboard']);
            // this._router.navigate(['course']);
          }
        },
        (error) => {
          alert("login Faild");
        }
      );
    }
  }
  addUserType() {
     var data = {
      user_id: this.userType.id,

      my_id: this.userType.id,
      first_name: this.userType.first_name,
      last_name: this.userType.last_name,
      user_name: this.userType.user_name,
      birthdate: this.userType.birthdate,
      email: this.userType.email,
      password: this.userType.password,
      google_id: this.userType.google_id,
      facebook_id: this.userType.facebook_id,
      current_package_id: "",
      current_package_name: "",
      current_package_type: "",
      current_package_pay_by_user_id: "",
      master_id: this.userType.master_id,
      // user_type:"",
      url_slug: this.userType.url_slug,
      action: "update",
    };
     
   

    
    this.aunumservices.registerUpdate(data)
    .subscribe(
      data => {
        var custdetails = data;
        // console.log(data.data.result)
    
     
        // this._router.navigate(['login']);
        sessionStorage.setItem(
          "user_type",
          JSON.stringify(this.userType.user_type)
        );
    this.logindd1();

      },
      error => {
        console.log(error);
      });
    console.log(data);
  }
  addsocialUserType() {
     var data = {
      user_id: this.userType.id,

      my_id: this.userType.id,
      first_name: this.userType.first_name,
      last_name: this.userType.last_name,
      user_name: this.userType.user_name,
      birthdate: this.userType.birthdate,
      email: this.userType.email,
      password: this.userType.password,
      google_id: this.userType.google_id,
      facebook_id: this.userType.facebook_id,
      current_package_id: "",
      current_package_name: "",
      current_package_type: "",
      current_package_pay_by_user_id: "",
      master_id:this.userType.master_id,
      user_type:"",
      url_slug: this.userType.url_slug,
      action: "update",
    };
    

    console.log(data);
    this.aunumservices.registerUpdate(data)
    .subscribe(
      data => {
        var custdetails = data;
    //     // console.log(data.data.result)
    if (this.userType.google_id != "") {
      sessionStorage.setItem("user_type",JSON.stringify(this.userType.user_type));
      this.socialLoginGoogle1(this.userType.google_id);
    }
    if (this.userType.facebook_id != "") {
      sessionStorage.setItem("user_type",JSON.stringify(this.userType.user_type));

      this.socialLogin1(this.userType.facebook_id);
    }
    //     // this._router.navigate(['login']);
    //     this.logindd();

      },
      error => {
        console.log(error);
      });
    console.log(data);
  }

  signInWithFB(): void {
    // this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(x => console.log(x));
    let socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    this.authService
      .signIn(FacebookLoginProvider.PROVIDER_ID)
      .then((userData) => {
        //this will return user data from facebook. What you need is a user token which you will send it to the server
        this.Savesresponse(userData);
        // this._router.navigate(['dashboard']);
      });
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
      first_name: usersocial.firstName,
      last_name: usersocial.lastName,
      user_name: "",
      email: usersocial.email,
      birthdat: "",
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
      this.usersocial = res.data[0];
      // console.log(this.usersocial)
      // this.response = res.userDetail;
      // localStorage.setItem('socialusers', JSON.stringify( this.usersocial));
      // console.log(localStorage.setItem('socialusers', JSON.stringify(this.usersocial)));
      this.socialLogin(usersocial.id);
      // this._router.navigate(['dashboard']);
    });
  }
  uType:any = "";
  socialLogin(userid) {
    var userSet = {
      action: "social_login",
      facebook_id: userid,
    };
    this.userService.social_login(userSet).subscribe((res: any) => {
      // debugger;
       
      var val = {
        birthdate: res.data.result.birthdate,
        created_at: res.data.result.created_at,
        current_package_id: res.data.result.current_package_id,
        current_package_name: res.data.result.current_package_name,
        current_package_pay_by_user_id:res.data.result.current_package_pay_by_user_id,
        current_package_type: res.data.result.current_package_type,
        deleted_status: res.data.result.deleted_status,
        email: res.data.result.email,
        facebook_id: res.data.result.facebook_id,
        first_name: res.data.result.first_name,
        google_id: res.data.result.google_id,
        id: res.data.result.id,
        last_name: res.data.result.last_name,
        master_id: res.data.result.master_id,
        password: res.data.result.password,
        permission_to_create_course:res.data.result.permission_to_create_course,
        permission_to_join_classes: res.data.result.permission_to_join_classes,
        status: res.data.result.status,
        updated_at: res.data.result.updated_at,
        url_slug: res.data.result.url_slug,
        user_name: res.data.result.user_name,
        user_type:this.uType,
      };
      console.log(val);
       

      this.userType = val;

      if (this.userType.user_type != null && this.userType.user_type != "") {
        this._router.navigate(["dashboard"]);
      } else {
        alert("select Type first");
        document.getElementById("openModalButton").click();
      }

      // this.response = res.userDetail;
      // localStorage.setItem('socialusers', JSON.stringify( this.usersocial));
      // console.log(localStorage.setItem('socialusers', JSON.stringify(this.usersocial)));
      //  this._router.navigate(['dashboard']);
    });
  }
  socialLogin1(userid) {
    var userSet = {
      action: "social_login",
      facebook_id: userid,
    };
    this.userService.social_login(userSet).subscribe((res: any) => {
      // debugger;
       
      
      
        this._router.navigate(["dashboard"]);
      

      // this.response = res.userDetail;
      // localStorage.setItem('socialusers', JSON.stringify( this.usersocial));
      // console.log(localStorage.setItem('socialusers', JSON.stringify(this.usersocial)));
      //  this._router.navigate(['dashboard']);
    });
  }
  // signInWithGOOLE(): void {
  //   // this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(x => console.log(x));
  //   this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userData)=>this.user=userData);
  // }

  signInWithGoogle(): void {
    // alert()
    // this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(x => console.log(x));

    let socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    this.authService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((userData) => {
        //this will return user data from facebook. What you need is a user token which you will send it to the server
        this.SavesresponseGoogle(userData);
        // this._router.navigate(['dashboard']);
      });
  }
  SavesresponseGoogle(userInfo: SocialUser) {
    this.sData = {
      action: "register",
      first_name: userInfo.firstName,
      last_name: userInfo.lastName,
      user_name: "",
      email: userInfo.email,
      birthdate: "",
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
      this.usersocial = res.data[0];
      console.log(res);
      // console.log(this.usersocial)
      // this.response = res.userDetail;
      // localStorage.setItem('socialusers', JSON.stringify( this.usersocial));
      // console.log(localStorage.setItem('socialusers', JSON.stringify(this.usersocial)));
      this.socialLoginGoogle(userInfo.id);
    });
  }

  socialLoginGoogle(userid) {
    var userSet = {
      action: "social_login",
      google_id: userid,
    };
    console.log(userSet);
    this.userService.social_login(userSet).subscribe((res: any) => {
      // debugger;

      // this._router.navigate(['dashboard']);
      var val = {
        birthdate: res.data.result.birthdate,
        created_at: res.data.result.created_at,
        current_package_id: res.data.result.current_package_id,
        current_package_name: res.data.result.current_package_name,
        current_package_pay_by_user_id:res.data.result.current_package_pay_by_user_id,
        current_package_type: res.data.result.current_package_type,
        deleted_status: res.data.result.deleted_status,
        email: res.data.result.email,
        facebook_id: res.data.result.facebook_id,
        first_name: res.data.result.first_name,
        google_id: res.data.result.google_id,
        id: res.data.result.id,
        last_name: res.data.result.last_name,
        master_id: res.data.result.master_id,
        password: res.data.result.password,
        permission_to_create_course:res.data.result.permission_to_create_course,
        permission_to_join_classes: res.data.result.permission_to_join_classes,
        status: res.data.result.status,
        updated_at: res.data.result.updated_at,
        url_slug: res.data.result.url_slug,
        user_name: res.data.result.user_name,
        user_type:this.uType,
      };
      this.userType = val;
      

      if (this.userType.user_type != null && this.userType.user_type != "" && this.userType.user_type != undefined) {
        this._router.navigate(["dashboard"]);
      } else {
        alert("select Type first");
        document.getElementById("openModalButton").click();
      }

      // this.response = res.userDetail;
      // localStorage.setItem('socialusers', JSON.stringify( this.usersocial));
      // console.log(localStorage.setItem('socialusers', JSON.stringify(this.usersocial)));
    });
  }

  socialLoginGoogle1(userid) {
    var userSet = {
      action: "social_login",
      google_id: userid,
    };
    console.log(userSet);
    this.userService.social_login(userSet).subscribe((res: any) => {
      // debugger;

      // this._router.navigate(['dashboard']);  
 
        this._router.navigate(["dashboard"]);
       

      // this.response = res.userDetail;
      // localStorage.setItem('socialusers', JSON.stringify( this.usersocial));
      // console.log(localStorage.setItem('socialusers', JSON.stringify(this.usersocial)));
    });
  }
}
