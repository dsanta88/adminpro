import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  SidebarService,
  SharedService,
  SettingsService
 } from './service.index';


@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    SidebarService,
    SharedService,
    SettingsService
  ],
  declarations: []
})
export class ServiceModule { }
