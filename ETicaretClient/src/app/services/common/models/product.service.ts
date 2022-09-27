import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Create_Product } from 'src/app/contracts/create_product';
import { List_Products } from 'src/app/contracts/list_products';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClientService: HttpClientService) {}

  create(
    product: Create_Product,
    successcallback?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ) {
    this.httpClientService
      .post(
        {
          controller: 'Products',
        },
        product
      )
      .subscribe(
        (result) => {
          successcallback();
        },
        (errorResponse: HttpErrorResponse) => {
          const _error: Array<{ key: string; value: Array<string> }> =
            errorResponse.error;
          let message = '';
          _error.forEach((v, index) => {
            v.value.forEach((_v, _index) => {
              message += `${_v}<br>`;
            });
          });

          errorCallBack(message);
        }
      );
  }

  async read(
    page: number = 0,
    size: number = 5,
    successcallback?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ): Promise<{ totalCount: number; products: List_Products[] }> {
    const promiseData: Promise<{
      totalCount: number;
      products: List_Products[];
    }> = this.httpClientService
      .get<{ totalCount: number; products: List_Products[] }>({
        controller: 'products',
        queryString: `page=${page}&size=${size}`,
      })
      .toPromise();

    promiseData
      .then((d) => successcallback())
      .catch((errorResponse: HttpErrorResponse) =>
        errorCallBack(errorResponse.message)
      );


    return await promiseData;
  }

 async delete(id:string){
   const DeleteObservable:Observable<any>= this.httpClientService.delete<any>({
      controller:"products",
    },id)
    await firstValueFrom(DeleteObservable);
  }
}
