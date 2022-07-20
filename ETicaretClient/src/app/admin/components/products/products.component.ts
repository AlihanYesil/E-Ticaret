import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { HttpClientService } from 'src/app/services/common/http-client.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit {

  constructor(spinner:NgxSpinnerService,private httpClientService:HttpClientService) {
    super(spinner)
   }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallScaleMultiple)

   /*  this.httpClientService.get({
      controller:"Products"
    }).subscribe(data=>console.log(data)); */

  /*   this.httpClientService.post({
      controller:"Products"
    },{
        Name:"Kalem",
        Stock:15,
        Price:10
    }).subscribe(); */
    /// getirmiyor post da atmıyor


    /* this.httpClientService.put({
      controller:"Products"
    },{
      id:"678f3175-0fe0-4e26-aa90-47c141a72c9e",
      name:"Patates",
      stock:1,
      price:11

    }).subscribe(); */

  /*   this.httpClientService.delete({
      controller:"Products"
    },"a68e667e-8525-4721-8d81-3a55568aa419").subscribe(); */

  }

}
