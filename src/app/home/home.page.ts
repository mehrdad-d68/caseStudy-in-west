import { Component } from '@angular/core';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable } from 'rxjs';
import { alertInterface, AccountModel} from '../models/allModels.model'
import { DeleteModalComponent } from './deleteModal/deleteModal.component';
import { EditModalComponent } from './editModal/editModal.component';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  tiles: AccountModel[] =[] 
  list$:Observable<AccountModel[]>
  show$:Observable<boolean>
  
  constructor(
    public mainService:HomeService,
    private modalService: NgbModal
    ) {}

  ngOnInit(){
    this.list$=this.mainService.listObj.asObservable()
    this.mainService.loadAll().subscribe()
    // this.show$=this.mainService.showAlert.show
    
  }

  openDialog(tile:AccountModel,i:number) {
    const modalRef=this.modalService.open(EditModalComponent)
    modalRef.componentInstance.inputTile=tile
    modalRef.componentInstance.index=i
    return modalRef
  }

  openDialog2() {
    return this.modalService.open(EditModalComponent)
  }
  deleteConfirmation(tile:AccountModel,i:number){
    const modalRef=this.modalService.open(DeleteModalComponent)
    modalRef.componentInstance.inputTile=tile
    modalRef.componentInstance.index=i
    return modalRef
  }
  
}
