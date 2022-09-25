import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { EditModalComponent } from './editModal/editModal.component';
import { DeleteModalComponent } from './deleteModal/deleteModal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    IonicModule,
    HomePageRoutingModule,
    NgbModule
  ],
  declarations: [HomePage,EditModalComponent,DeleteModalComponent],
  providers:[
  ]
})
export class HomePageModule {}
