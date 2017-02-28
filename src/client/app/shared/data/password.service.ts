import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { NewPassObj } from '../../login/newpass.component';
import { CONTEXTROOT } from '../contextRoot';


@Injectable()
export class PasswordService {
    constructor(private http: Http) { }

    forgetPass(email: string) {
        return this.http.post(CONTEXTROOT+'password/email', {email:email}).map((response: Response) => response.json());
    }

    resetPass(newPassObj:NewPassObj) {
        return this.http.post(CONTEXTROOT+'password/reset', newPassObj).map((response: Response) => response.json());
    }
    

}