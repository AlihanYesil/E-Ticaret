import { Component, OnInit } from '@angular/core';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BaseComponent implements OnInit {

  constructor(private alertify:AlertifyService,spinner:NgxSpinnerService) {
    super(spinner)
   }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallScaleMultiple)

  }
 m(){
  this.alertify.message("merhaba",{
    messageType:MessageType.Success,
    delay:5,
    position:Position.TopLeft
  })
 }

 d(){
  this.alertify.dismiss()
 }
}
