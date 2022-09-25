import {Component, Input, OnInit} from '@angular/core';
import { Validators,FormGroup, FormControl, UntypedFormControl } from '@angular/forms';
import { HomeService } from '../home.service';
import {ValidatorService} from 'angular-iban';
import * as uuid from 'uuid';
import {  AccountModel} from '../../models/allModels.model'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector:'edit-modal-component',
    templateUrl:'./editModal.component.html',
    styles:[`
        .inputDiv{
            margin:1em
        }
    `]
})

export class EditModalComponent implements OnInit{

    @Input()inputTile:AccountModel
    @Input() index:number
    profileForm = new FormGroup({
        id:new FormControl(''),
        text: new FormControl('',Validators.required),
        IBAN: new FormControl('',[Validators.required, ValidatorService.validateIban]),
        DATE: new FormControl(UntypedFormControl ,Validators.required),
        amount:new FormControl('',[Validators.required,Validators.min(50),Validators.max(20000000)]),
        note: new FormControl(''),
      });

    constructor(
        public activeModal: NgbActiveModal,
        private mainService:HomeService,
        private config:NgbDatepickerConfig
        ){
            const current = new Date();
            config.minDate = { year: current.getFullYear(), month: 
            current.getMonth() + 1, day: current.getDate() };
            config.outsideDays = 'hidden';

        }
    
    ngOnInit(): void {
        if(this.inputTile) this.setFormValue()
    }

    setFormValue(){
        this.profileForm.patchValue(this.inputTile)
    }

    onSubmit(){
        if(!this.profileForm.value.id){
             this.profileForm.value.id = uuid.v4()
             this.mainService.newAccount(this.profileForm.value).subscribe(
                (res:any)=>{
                    this.mainService.listObj.next([...this.mainService.listObj.value,this.profileForm.value])
                    this.mainService.showAlert.next({show:true,color:'rgb(16, 250, 133)',text:'new object created'})
                    setTimeout(()=>{
                       this.mainService.showAlert.value.show=false         
                    },2000)
                    this.activeModal.dismiss()
                }
            )    
        }else {
            this.mainService.editAccount(this.profileForm.value).subscribe(
                (res)=>{
                    this.mainService.listObj.value[this.index]=this.profileForm.value
                    this.mainService.showAlert.next({show:true,color:'rgb(13, 176, 252)',text:'object edited'})
                    setTimeout(()=>{
                        this.mainService.showAlert.value.show=false         
                     },2000)
                    this.activeModal.dismiss()
                    
                }
            )
        }        
        
    }
    

}