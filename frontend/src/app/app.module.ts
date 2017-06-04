import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { MessagesComponent } from './messages-component';
import { AppComponent }  from './app.component';
import { WebService } from './web.service';
import { NewMessageComponent } from './new-message.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpModule} from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { NavComponent } from './nav.component';
import { HomeComponent } from './home.component';
import {RegisterComponent} from './register.component'
import {AuthService} from './auth.service'
import {LoginComponent} from './login.component'
import {UserComponent} from './user.component'

var routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path:'messages',
    component:MessagesComponent
  },
  {
    path: 'messages/:name',
    component: MessagesComponent
  },
  {
    path: 'user',
    component: UserComponent
  }];

@NgModule({
  imports:      [ BrowserModule,BrowserAnimationsModule, MaterialModule,HttpModule, FormsModule,ReactiveFormsModule,  RouterModule.forRoot(routes) ],
  declarations: [ AppComponent, MessagesComponent, NewMessageComponent, NavComponent, HomeComponent, RegisterComponent, LoginComponent, UserComponent ],
  bootstrap:    [ AppComponent ],
  providers: [ WebService, AuthService ]
})
export class AppModule { }
