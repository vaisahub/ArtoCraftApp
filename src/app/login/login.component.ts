import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { first } from 'rxjs/operators';
import { LoginServiceService, MyErrorStateMatcher } from '../shared/login-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from '../shared/notification.service';
import { User } from '../shared/user';
const users = [{ username: "vaisakh", password: "vma2019" }]
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userError :boolean
  constructor(private notfserv: NotificationService, private route: ActivatedRoute, public logServ: LoginServiceService, public signUpForm: LoginServiceService, private router: Router) { }
  user: User = new User;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  matcher = new MyErrorStateMatcher();

  ngOnInit() {

    $(document).ready(function () {

      var formInputs = $('input[type="email"],input[type="password"]');
      formInputs.focus(function () {
        $(this).parent().children('p.formLabel').addClass('formTop');
        $('div#formWrapper').addClass('darken-bg');
        $('div.logo').addClass('logo-active');
      });
      formInputs.focusout(function () {
        if ($.trim($(this).val()).length == 0) {
          $(this).parent().children('p.formLabel').removeClass('formTop');
        }
        $('div#formWrapper').removeClass('darken-bg');
        $('div.logo').removeClass('logo-active');
      });
      $('p.formLabel').click(function () {
        $(this).parent().children('.form-style').focus();
      });
    });
    this.logServ.logout();



  }
  OnFieldFocus(){
    // this.userError=this.logServ.loginForm.controls['username'].errors.required;

  }
  get f() { return this.logServ.loginForm.controls; }
  get g() { return this.logServ.signForm.controls; }

  onSubmit() {
    if (this.logServ.loginForm.valid) {


      console.log(this.logServ.loginForm.value)
      this.logServ.login(this.logServ.loginForm.value)
        .pipe(first())
        .subscribe(data => {

          this.notfserv.success("Bingo :) !! Login Successfull !!");
          this.logServ.reset();
          this.router.navigate(['ArtoCartHome']);
          this.logServ.reset();
        },
          error => {

            this.notfserv.success("Oops !! Login Failed !!" + error);
            this.logServ.reset();
          });
    }

  }
  onSignUp() {
    if (this.signUpForm.signForm.valid) {

      this.logServ.SignUp(this.signUpForm.signForm.value)
        .pipe(first())
        .subscribe(res => {

          this.notfserv.success("Hurray...! Welcome to Arto Cart :) !!");

          this.router.navigate(['login']);
          this.logServ.reset();
        },
          error => {

            this.notfserv.success("Oops !! Something Went Wrong !!");
            this.logServ.reset();
          });
    }



  }
  OnSignOut() {
    this.logServ.logout();
    console.log("LoggedOut");
    this.router.navigate(['login']);
  }
  reset() {
    this.logServ.signForm.reset();
    this.signUpForm.loginForm.reset();
  }

}
