import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './view/login/login.component';
import { RegisterComponent } from './view/register/register.component';
import { HeaderComponent } from './view/header/header.component';
import { FooterComponent } from './view/footer/footer.component';
import { DashboardComponent } from './view/dashboard/dashboard.component';
import { ViewUserComponent } from './view/view-user/view-user.component';
import { MasterService, AuthenticationService } from './services';
import { AuthGuard } from './guards';
import { AunumService } from './services/aunumServices';
import { UserService } from './services/user.service';
import { LocationStrategy, HashLocationStrategy, CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from './helper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SocialLoginModule, AuthService } from 'angularx-social-login';
import { AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { FullLayoutComponent, SimpleLayoutComponent } from './containers';
import { LogoutComponent } from './view/logout/logout.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ModalModule, AlertModule, TabsModule } from 'ngx-bootstrap';
import { SelectModule } from 'ng-select';
import { DataTableModule } from 'angular2-datatable';
import { ChangesComponent } from './view/changes/changes.component';
import { ForgoteComponent } from './view/forgote/forgote.component';
import { CourseComponent } from './view/course/course.component';
import { DeckComponent } from './view/deck/deck.component';
import { CardsComponent } from './view/cards/cards.component';
import { AttachmentComponent } from './view/attachment/attachment.component';
import { FolderComponent } from './view/folder/folder.component';
import { LessonComponent } from './view/lesson/lesson.component';
import { PaypalDemoComponent } from './view/paypal-demo/paypal-demo.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { DeckFilterPipe } from './view/deck/datafilterpipe';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { TreeTableModule } from 'primeng/components/treetable/treetable';

import { MarkdownModule, MarkedOptions, MarkedRenderer } from 'ngx-markdown';
import { AngularMarkdownEditorModule } from 'src/lib/angular-markdown-editor';
import { RoleGuardService } from './guards/roleGuardService';

const APP_CONTAINERS = [
  FullLayoutComponent,
  SimpleLayoutComponent
]

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('17498439726-opbu80ciirqrgtml7tikfu5l3pudenfu.apps.googleusercontent.com')
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('2256700081100205')
  },
  // {
  //   id: LinkedInLoginProvider.PROVIDER_ID,
  //   provider: new LinkedInLoginProvider("78iqy5cu2e1fgr")
  // }
]);

export function provideConfig() {
  return config;
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    ViewUserComponent,
    LogoutComponent,
    ChangesComponent,
    ForgoteComponent,
    CourseComponent,
    DeckComponent,
    CardsComponent,
    AttachmentComponent,
    FolderComponent,
    LessonComponent,
    PaypalDemoComponent,
    DeckFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,    
    CommonModule, 
    FormsModule,   
    SocialLoginModule,
    BsDropdownModule,
    DataTableModule,   
    SelectModule, 
    ReactiveFormsModule,
    TabsModule,
    NgxPayPalModule,
    AngularEditorModule,
    ButtonsModule.forRoot(),
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    CKEditorModule,
    TreeTableModule,
    MarkdownModule.forRoot({
      provide: MarkedOptions,
      useFactory: (): MarkedOptions => {
        return {
          renderer: new MarkedRenderer(),
          gfm: true,
          tables: true,
          breaks: false,
          pedantic: false,
          sanitize: false,
          smartLists: true,
          smartypants: false,
        };
      },
    }),
    AngularMarkdownEditorModule.forRoot({
      // add any Global Options/Config you might want
      // to avoid passing the same options over and over in each components of your App
      iconlibrary: 'glyph'
    })
    
  ],
  providers: [
    MasterService,
    AuthenticationService,
    AuthGuard,
    RoleGuardService,
    AuthService,
    AunumService,
    UserService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
   {
   provide: LocationStrategy,
   useClass: HashLocationStrategy
 },{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
