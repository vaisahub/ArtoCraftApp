import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { first } from 'rxjs/operators';
import { NotificationService } from '../shared/notification.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  dataSource = [];
  seller =[]
  constructor(private prodServ: ProductService,private notfserv:NotificationService) { }
 
  ngOnInit() {
    this.prodServ.showProduct()
        .pipe(first())
        .subscribe(data => {

          this.dataSource = data;
          // alert(this.dataSource);
        },
          error => {

            this.notfserv.success("Oops !! Can't Get the products !! " + error);

          });
  }
  showSeller(api:string){
    // alert(api)
      this.prodServ.showSell(api)
      .pipe(first())
      .subscribe(data => {
  
        this.seller = data;
      
      },
        error => {
    //  alert(error)
          this.notfserv.success("Oops !! Login seller not found !!" + error);
  
        });
        // alert(this.seller)
        return this.seller

    }
}
