import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { NgbActiveModal, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HomePage } from './home.page';
import { HomeService } from './home.service';
import { DeleteModalComponent } from './deleteModal/deleteModal.component';

export class EditModalRef  {
  
  componentInstance = {
    inputTile: undefined,
      index: undefined
  };
  result: Promise<any> = new Promise((resolve, reject) => resolve(true));
}

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let ngbModal: NgbModal;
  let deleteFixture :ComponentFixture<DeleteModalComponent>
  let deletecomponent :DeleteModalComponent
  let editModalRef: EditModalRef = new EditModalRef();

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePage ],
      imports: [HttpClientModule, IonicModule.forRoot(), NgbModule
      ],
      providers: [HomeService ,NgbActiveModal]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;

    deleteFixture = TestBed.createComponent(DeleteModalComponent)
    deletecomponent= deleteFixture.componentInstance
    ngbModal=TestBed.get(NgbModal)
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fill the list$ with listObj from service',()=>{
    component.mainService.listObj.next([{id:'cs7778cds78sd',text:'csdcdvfs',IBAN:'kjf888776-07689',DATE:'2022/5/3'}])
    component.list$.subscribe((value)=>expect(value).toEqual([{id:'cs7778cds78sd',text:'csdcdvfs',IBAN:'kjf888776-07689',DATE:'2022/5/3'}]))
  })

  it('should open a modal for new tile',()=>{
    spyOn(ngbModal, 'open')
    component.openDialog2()
    expect(ngbModal.open).toHaveBeenCalled()
  })

  it('should open edit modal with value for edit',()=>{
    spyOn(ngbModal,'open').and.returnValue(editModalRef as any)
    component.openDialog({id:'cs7778cds78sd',text:'csdcdvfs',IBAN:'kjf888776-07689',DATE:'2022/5/3'},2)
    expect(ngbModal.open).toHaveBeenCalled()
    expect(editModalRef.componentInstance.inputTile).toEqual({id:'cs7778cds78sd',text:'csdcdvfs',IBAN:'kjf888776-07689',DATE:'2022/5/3'})
    expect(editModalRef.componentInstance.index).toEqual(2)
  })

  it('should open the delete component',()=>{
    spyOn(ngbModal,'open').and.returnValue(editModalRef as any)
    component.list$.subscribe(
      res=>{
        component.deleteConfirmation(res[0],0)
        expect(ngbModal.open).toHaveBeenCalled()
      }
    )
  })

  it('should gave the deleteComponent the tile and index',()=>{
    spyOn(ngbModal,'open').and.returnValue(editModalRef as any)
    component.list$.subscribe(
      res=>{
        if(res && res.length>0){
          console.log(res[0])
          component.deleteConfirmation(res[0],0)
          expect(ngbModal.open).toHaveBeenCalled()
          expect(editModalRef.componentInstance.index).toEqual(0)
          expect(editModalRef.componentInstance.inputTile).toEqual(res[0])
        }
      }
    )
  })
});
