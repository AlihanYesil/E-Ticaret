import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {
  MatTableDataSource,
  _MatTableDataSource,
} from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Products } from 'src/app/contracts/list_products';
import {
  AlertifyService,
  MessageType,
  Position,
} from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/models/product.service';
declare var $: any;


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private productService: ProductService,
    private alertify: AlertifyService
  ) {
    super(spinner);
  }

  displayedColumns: string[] = [
    'name',
    'stock',
    'price',
    'createdDate',
    'updatedDate',
    'delete',
    'edit'
  ];
  dataSource: MatTableDataSource<List_Products> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getProducts() {
    this.showSpinner(SpinnerType.BallRunningDots);
    const allProducts: { totalCount: number; products: List_Products[] } =
      await this.productService.read(
        this.paginator ? this.paginator.pageIndex : 0,
        this.paginator ? this.paginator.pageSize : 5,
        () => this.hideSpinner(SpinnerType.BallRunningDots),
        (errorMessage) =>
          this.alertify.message(errorMessage, {
            dismissOthers: true,
            messageType: MessageType.Error,
            position: Position.TopRight,
          })
      );
    this.dataSource = new MatTableDataSource<List_Products>(
      allProducts.products
    );
    this.paginator.length = allProducts.totalCount;
  }

 

  async pageChanged() {
    await this.getProducts();
  }
  async ngOnInit() {
    await this.getProducts();
  }
}
