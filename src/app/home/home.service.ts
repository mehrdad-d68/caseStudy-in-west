import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {map,tap} from 'rxjs/operators'
import { alertInterface, AccountModel} from '../models/allModels.model'

@Injectable({
    providedIn:'root'
})
export class HomeService {

    baseUrl='http://localhost:3001'
    listObj=new BehaviorSubject<AccountModel[]>([])
    showAlert=new BehaviorSubject<alertInterface>({show:false,color:'red',text:''})

    constructor(private http:HttpClient){
        
    }
    
    loadAll():Observable<AccountModel[]>{
        return this.http.get<AccountModel[]>(`${this.baseUrl}`)
            .pipe(
                map(res=>res["data"]),
                tap(res=>this.listObj.next(res))
        )
    }
    newAccount(data:AccountModel){
        return this.http.post(`${this.baseUrl}/new`,JSON.stringify(data))
    }

    editAccount(data:AccountModel){
        return this.http.post(`${this.baseUrl}/edit`,data)
    }

    deleteAccount(id:string){
        return this.http.delete(`${this.baseUrl}/delete/${id}`)
    }


}
