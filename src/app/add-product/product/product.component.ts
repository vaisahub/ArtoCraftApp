import { Component, OnInit } from '@angular/core';
// import { FormGroup,FormControl}
import { FormGroup, FormControl } from '@angular/forms';
import { ProductService } from 'src/app/shared/product.service';
import { MatSnackBar, MatTableDataSource } from '@angular/material';
import { NotificationService } from 'src/app/shared/notification.service';
import { first, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}



// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})


export class ProductComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'desc', 'price', 'seller','actions'];
  dataSource = [];

  pro: product1;
  count: number = 0;
  seller: string;


  // productDetails=[];

  constructor(public httpClient: HttpClient, public prodServ: ProductService, private notfserv: NotificationService) { }

  headerTable: string[] = ['Item Seller', 'Item Name', 'Item Price', 'Image', 'Item Description', 'Avilability']

  tablelist: MatTableDataSource<any>;
  showSellerclient(api:string){
  //   this.prodServ.showSeller(api)
  //   .pipe(first())
  //   .subscribe(data => {

  //     this.seller = data;
  //   },
  //     error => {
  //  alert(error)
  //       this.notfserv.success("Oops !! Login seller not found !!" + error);

  //     });
  }
    ngOnInit(){

      this.prodServ.showProduct()
        .pipe(first())
        .subscribe(data => {

          this.dataSource = data;
        },
          error => {

            this.notfserv.success("Oops !! Login Failed !!" + error);

          });


      // this.tablelist= new MatTableDataSource(this.productDetails);

    }

    onClear() {
      this.prodServ.form.reset();
      this.prodServ.initializeFormGroup();
    }

    // onSubmit() {

      // this.count=this.count+1
      // this.pro.name = "hai";
      // this.pro.price = 20;
      // this.pro.id = this.count;
      // this.productName.push(this.pro)
    
      // this.notfserv.success("Added Successfully");
    // }

    onSubmit(){
      if(this.prodServ.form){
      this.prodServ.postItem(this.prodServ.form.value)
       .pipe(first())
        .subscribe(data => {

          this.notfserv.success("Product Added !!  " + data);
          this.prodServ.form.reset();
          this.prodServ.initializeFormGroup();
        },
          error => {

            this.notfserv.success("Oops !! Adding Failed !! " + error);
           
          });   }
        }
  }
export class product1 {
  id: number
  name: string
  price: number
}