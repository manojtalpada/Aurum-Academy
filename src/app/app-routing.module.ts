import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './view/header/header.component';
import { FooterComponent } from './view/footer/footer.component';
import { LoginComponent } from './view/login/login.component';
import { RegisterComponent } from './view/register/register.component';
import { DashboardComponent } from './view/dashboard/dashboard.component';
import { ViewUserComponent } from './view/view-user/view-user.component';
import { LogoutComponent } from './view/logout/logout.component';
import { ForgoteComponent } from './view/forgote/forgote.component';
import { ChangesComponent } from './view/changes/changes.component';
import { CourseComponent } from './view/course/course.component';
import { DeckComponent } from './view/deck/deck.component';
import { CardsComponent } from './view/cards/cards.component';
import { AttachmentComponent } from './view/attachment/attachment.component';
import { FolderComponent } from './view/folder/folder.component';
import { LessonComponent } from './view/lesson/lesson.component';
import { AuthGuard } from './guards';
import { PaypalDemoComponent } from './view/paypal-demo/paypal-demo.component';
import { RoleGuardService } from './guards/roleGuardService';
import { DeckfileComponent } from './view/deckfile/deckfile.component';

var userType = sessionStorage.getItem('user_type');
// console.log(userType)

const routes: Routes = [

  {path:"header",component:HeaderComponent,canActivate: [RoleGuardService],data:{expectedRole:['t','s']}},
  {path:"footer",component : FooterComponent,canActivate:[RoleGuardService],data:{expectedRole:['t','s']}},
  {path:"login",component: LoginComponent},
  {path:"login/:slug_url",component: LoginComponent},
  
  // {path:":username/dashboard",component: DashboardComponent,canActivate: [RoleGuardService],data:{expectedRole:['t','s']}},
  
  {path:"register",component: RegisterComponent},
  {path:"dashboard",component: DashboardComponent,canActivate: [RoleGuardService],data:{expectedRole:['t','s']}},
  {path:"view-user",component: ViewUserComponent,canActivate: [RoleGuardService],data:{expectedRole:['s']}},
  {path:"logout",component:LogoutComponent},
  {path : "forgote",component:ForgoteComponent},
  {path : "changes",component : ChangesComponent},
  {path : "course",component : CourseComponent},
  {path : "deckfile",component:DeckfileComponent},
  {path:"cards",component:CardsComponent},
  {path:"attachment",component:AttachmentComponent},
  {path : "folder",component:FolderComponent},
  {path : "changes",component : ChangesComponent,canActivate: [RoleGuardService],data:{expectedRole:['t','s']}},
  {path : "course",component : CourseComponent,canActivate: [RoleGuardService],data:{expectedRole:['t','s']}},
  {path : "deckfile",component:DeckfileComponent,canActivate: [RoleGuardService],data:{expectedRole:['t','s']}},
  {path:"cards",component:CardsComponent,canActivate: [RoleGuardService],data:{expectedRole:['t','s']}},
  {path:"attachment",component:AttachmentComponent,canActivate: [RoleGuardService],data:{expectedRole:['t','s']}},
  {path:"lesson",component:LessonComponent,canActivate:[RoleGuardService],data:{expectedRole:['t','s']}},
  {path:":url_slug/lesson",component:LessonComponent},
  {path : "paypal-demo",component:PaypalDemoComponent},
  {path : ":url_slug/paypal-demo",component:PaypalDemoComponent},
  {path:':url_slug/dashboard',component: DashboardComponent},
  {path : ":url_slug/deckfile",component:DeckfileComponent},
  {path:":url_slug/cards",component:CardsComponent},
  {path : ":url_slug/folder",component:FolderComponent},
  {path:":url_slug/view-user",component: ViewUserComponent},
  {path : ":url_slug/course",component : CourseComponent},
  {path:":url_slug/attachment",component:AttachmentComponent},

  // {path:':username/contact',component: ContactDetailComponent},
  // / {path:"",redirectTo:"dashboard/:slug_url",pathMatch:"full"},
  {path:"",redirectTo:"dashboard",pathMatch:"full"},
  { path: '**', redirectTo: ''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
