import { Component, Inject, OnInit, inject } from '@angular/core';
import { AppComponent } from '../app.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-add-edit',
  standalone: true,
  imports: [
    AppComponent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-edit.component.html',
  styleUrl: './add-edit.component.scss'
})
export class AddEditComponent implements OnInit{
  formAdd: FormGroup;
  users: any[] = [];

  constructor(
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<AddEditComponent>,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
      this.formAdd = this._fb.group({
        partyname: '',
        add1: '',
        add2: '',
        city: '',
        state: '',
        email: '',
        num: '',
        contper: '',
        gst: '',
      });
    }


    ngOnInit(): void {
      this.formAdd.patchValue(this.data);
    }

    onSubmit() {
      if (this.formAdd.valid) {
        if(this.data){
          const item = this.formAdd.value;
          this.http.put('/api/users/' + this.data.id , item , {headers:{
            'Content-Type': 'application/json'
          }}).subscribe({
            next: (response) => {
              console.log('Item added successfully:', response);
              // Reset form or provide feedback to user
              this.formAdd.reset(); 
              this._dialogRef.close();
            },
          });
        } else{
          const item = this.formAdd.value;
          this.http.post<any>('/api/users', item , {headers:{
            'Content-Type': 'application/json'
          }}).subscribe({
            next: (response) => {
              console.log('Item added successfully:', response);
              // Reset form or provide feedback to user
              this.formAdd.reset(); 
              this._dialogRef.close();
            },
          });
        }
      }
    }
}
