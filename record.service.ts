import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  constructor(private _http: HttpClient) { }

  addRecord(data : any){
    return this._http.post('http://localhost:3000/api/userss')
  }
}
