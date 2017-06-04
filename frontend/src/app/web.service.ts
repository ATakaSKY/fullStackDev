import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { MdSnackBar } from '@angular/material';
import {Subject} from "rxjs/rx";
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class WebService {
    BASE_URL = 'http://localhost:8081/api';

    private messagesStore = [];

    private messageSubject = new Subject();

    messages = this.messageSubject.asObservable();

    constructor(private http: Http, private sb: MdSnackBar, private auth: AuthService, private router:Router) {
        this.getMessages();
    }

    getMessages(user?:any) {
        user = (user) ? '/' + user : '';
        this.http.get(this.BASE_URL + '/messages' + user).subscribe(response => {
            this.messagesStore = response.json();
            this.messageSubject.next(this.messagesStore);
        }, error => {
            this.handleError("Unable to get messages");
        });
    }

     async postMessage(message) {
        try {
            var response = await this.http.post(this.BASE_URL + '/messages', message).toPromise();
            this.messagesStore.push(response.json());
            this.messageSubject.next(this.messagesStore);
        } catch (error) {
            this.handleError("Unable to post message");
        }

    }

    getUser() {
        return this.http.get(this.BASE_URL + '/users/me', this.auth.tokenHeader).map(res => res.json());
    }

     saveUser(userData) {
        return this.http.post(this.BASE_URL + '/users/me',userData,  this.auth.tokenHeader).map(
            res =>{
                debugger;
                
                 var a=res.json();
                 
                 console.log(a.firstName);
                //  this.auth.name=a.firstname;
                localStorage.setItem('name',a.firstName);
                 this.router.navigate(['/']);
             }
            );
    }

    private handleError(error) {
        console.error(error);
        this.sb.open(error, 'close', { duration: 2000 });
    }
}