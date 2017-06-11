import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthHttp } from 'angular2-jwt/angular2-jwt';
import { Subject } from 'rxjs/Subject';
import { CONTEXTROOT } from '../contextRoot';

export interface User {
    email: number;
    employee_id:Number;
    name:string;
    role:string;
}

@Injectable()
export class UserService {
    constructor(private http: Http, private authHttp:AuthHttp) { }

    saveCurrentUser(user:any){
        localStorage.setItem('tessol_user', JSON.stringify(user));
    }

    getActivityLog(startdt:any, enddt:any, userId:string) {
        return this.authHttp.post(CONTEXTROOT+"user/log",{
            "from_timestamp":startdt,
            "to_timestamp":enddt,
            "email":userId || this.getCurrentUser().email
        }).map((response: Response) => response.json());
    }

    getCurrentUser(){
        return JSON.parse(localStorage.getItem('tessol_user'));
        //return this.subject.asObservable();
    }

    // getAll() {
    //     return this.http.get('/api/users', this.jwt()).map((response: Response) => response.json());
    // }

    // getById(id: number) {
    //     return this.http.get('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    // }

    create(user: User) {
        return this.authHttp.post(CONTEXTROOT+'user/add', user).map((response: Response) => response.json());
    }

    saveProfile(user: User) {
        return this.authHttp.post(CONTEXTROOT+'user/update', user).map((response: Response) => response.json());
    }

    // update(user: User) {
    //     return this.http.put('/api/users/' + user.id, user, this.jwt()).map((response: Response) => response.json());
    // }

    delete(email: string) {
        return this.authHttp.post(CONTEXTROOT+'user/remove',{email:email}).map((response: Response) => response.json());
    }
    
    getAllUsers() {
        return this.authHttp.get(CONTEXTROOT+'user/all').map((response: Response) => response.json());
    }

}