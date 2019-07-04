import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Item } from './user';
import * as JWT from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class ProductService {


  form: FormGroup = new FormGroup({

    item_name: new FormControl("", [Validators.required, Validators.minLength(5)]),
    item_price: new FormControl("", Validators.required),
    // item_seller: new FormControl("", Validators.required),
    item_image: new FormControl("", Validators.required),
    item_desc: new FormControl("", Validators.required)
  });
  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      item_name: "",
      item_price: "",
      // item_seller: "",
      item_desc: "",
      item_image: ""
    });
  }

  constructor(private httpClient: HttpClient) { }
  showProductSeller() {

    console.log("Show Product Called")
    //  let user1={user['username'];user['password']}
    console.log("list")
    let token = localStorage.getItem("token")
    var decoded = JWT(token);
    var uid=decoded.user_id;
    console.log(decoded.user_id);
    
    return this.httpClient.get<any>(`https://qf2vytt1i7.execute-api.us-east-1.amazonaws.com/dev/api/v1/items/seller/owned/`)
      .pipe(map(products => {
        // login successful if there's a jwt token in the response
        // if (user && user.token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        // localStorage.setItem('currentUser', JSON.stringify(user));
        // this.currentUserSubject.next(user);
        // console.log("Logged In")
        // }
      
        console.log(products)
        return products;
      }));

  }
  showProduct() {

    console.log("Show Product Called")
 
    return this.httpClient.get<any>(`https://qf2vytt1i7.execute-api.us-east-1.amazonaws.com/dev/api/v1/items`)
      .pipe(map(products => {
        
        console.log(products)
        return products;
      }));

  }
  showSell(api: string) {
    // alert(api);
    console.log(api)
    // let token = localStorage.getItem("currentUser")
    return this.httpClient.get<any>(api)
      .pipe(map(seller => {

        console.log(seller)
        // alert(products);
        return seller.username;
      }));

  }
  postItem(item: Item) {
    console.log(item)

    // console.log(access_token) 
    return this.httpClient.post<any>(`https://qf2vytt1i7.execute-api.us-east-1.amazonaws.com/dev/api/v1/items`, item)
      .pipe(map(res => {


        return res;
      }));
  }

}
