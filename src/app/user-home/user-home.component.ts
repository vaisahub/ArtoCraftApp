import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from '../shared/login-service.service';
import { NotificationService } from '../shared/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  constructor(private route:Router,private log:LoginServiceService,private noti: NotificationService) {  }

  ngOnInit() {
  }
logOut()
{
this.log.logout();
this.noti.success("LoggedOut !! Come Back Soon !!")
this.route.navigate(['login']);

}
}
