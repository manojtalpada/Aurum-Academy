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


const routes: Routes = [

  {path:"header",component:HeaderComponent,canActivate: [AuthGuard]},
  {path:"footer",component : FooterComponent,canActivate: [AuthGuard]},
  {path:"login",component: LoginComponent},
  {path:"register",component: RegisterComponent},
  {path:"dashboard",component: DashboardComponent,canActivate: [AuthGuard]},
  {path:"view-user",component: ViewUserComponent,canActivate: [AuthGuard]},
  {path:"logout",component:LogoutComponent},
  {path : "forgote",component:ForgoteComponent},
  {path : "changes",component : ChangesComponent},
  {path : "course",component : CourseComponent},
  {path : "deck",component:DeckComponent},
  {path:"cards",component:CardsComponent},
  {path:"attachment",component:AttachmentComponent},
  {path : "folder",component:FolderComponent},
  {path : "changes",component : ChangesComponent,canActivate: [AuthGuard]},
  {path : "course",component : CourseComponent,canActivate: [AuthGuard]},
  {path : "deck",component:DeckComponent,canActivate: [AuthGuard]},
  {path:"cards",component:CardsComponent,canActivate: [AuthGuard]},
  {path:"attachment",component:AttachmentComponent,canActivate: [AuthGuard]},
  {path:"lesson",component:LessonComponent,canActivate: [AuthGuard]},
  {path : "paypal-demo",component:PaypalDemoComponent},
  {path:"",redirectTo:"dashboard",pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
