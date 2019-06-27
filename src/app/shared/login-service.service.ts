import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm, FormGroupDirective } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { tap, map, min } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from './user';
import { ErrorStateMatcher } from '@angular/material';
import * as JWT from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  loginForm: FormGroup = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required)
  })
  signForm: FormGroup = new FormGroup({
    username: new FormControl("", Validators.required),
    email: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
    // confirmPass: new FormControl(""),
    phno: new FormControl("", Validators.required)
  })
  // },{validators: this.CheckPasswords })


  CheckPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPass.value;

    return pass === confirmPass ? null : { notSame: true }
  }

  constructor(private httpClient: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }


  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
  login(user) {
    // console.log("Login Called" + user)
    //  let user1={user['username'];user['password']}
    // console.log(access_token) 
    return this.httpClient.post<any>(`https://qf2vytt1i7.execute-api.us-east-1.amazonaws.com/dev/api-token-auth/`, user)
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('token', user.token);
          this.currentUserSubject.next(user);
          console.log("Logged In")
          var decoded = JWT(user.token);
          // console.log(decoded);
        }

        return user;
      }));
  }

  SignUp(user: User) {
    console.log(user)

    // console.log(access_token) 
    return this.httpClient.post<any>(`https://qf2vytt1i7.execute-api.us-east-1.amazonaws.com/dev/api/v1/users/`, user)
      .pipe(map(res => {


        return res;
      }));
  }
  
  refreshToken()
  {

    return this.httpClient.get<any>(`https://qf2vytt1i7.execute-api.us-east-1.amazonaws.com/dev/api-token-refresh/`)
    .pipe(map(res => {


      return res;
    }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  reset() {
    this.signForm.reset();
    this.loginForm.reset();
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}