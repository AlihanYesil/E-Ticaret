import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Create_Product } from 'src/app/contracts/create_product';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService:HttpClientService) { }

  create(product:Create_Product,successcallback?:any,errorCallBack?:any){
    this.httpClientService.post({
    controller:"Products"
    },product)
    .subscribe(result=>{
      successcallback( );
    },(errorResponse:HttpErrorResponse)=>{
      const _error:Array<{key:string,value:Array<string>}>=errorResponse.error;
      let message="";
      _error.forEach((v,index)=>{
         v.value.forEach((_v,_index)=>{
          message += `${_v}<br>`;
         });
      });

      errorCallBack(message);
    });
  }
}
