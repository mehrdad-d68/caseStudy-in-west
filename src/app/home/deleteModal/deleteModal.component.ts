import {Component, Input, OnInit} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { alertInterface, AccountModel} from '../../models/allModels.model'
import { HomeService } from '../home.service';

@Component({
    selector:'delete-confirm-component',
    templateUrl:'./deleteModal.component.html'
})
export class DeleteModalComponent implements OnInit{

    @Input() inputTile:AccountModel
    @Input()index:number
    constructor(
        public modal: NgbActiveModal,
        private mainService:HomeService,
        public activeModal: NgbActiveModal,
    ){

    }
    ngOnInit(): void {
        
    }
    deleteAccount(){
        this.mainService.deleteAccount(this.inputTile.id).subscribe(
            res=>{
                this.mainService.listObj.value.splice(this.index,1)
                this.mainService.showAlert.next({show:true,color:'red',text:'object deleted'})
                setTimeout(()=>{
                    this.mainService.showAlert.value.show=false         
                 },2000)
                this.activeModal.dismiss()
                // this.mainService.listObj.value=this.mainService.listObj.value.filter(e=>e.id !=this.tile.id)
            }
        )
      }
}