import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatFormField} from '@angular/material/form-field';
import { AddEditComponent } from './add-edit/add-edit.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';

export interface UserData {
  id: number;
  partyname: string;
  add1: string;
  add2: string;
  city: string;
  state: string;
  email: string;
  num: number;
  contper: string;
  gst: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    MatFormField,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule, 
    MatTableModule, 
    MatSortModule, 
    MatPaginatorModule
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent implements AfterViewInit {

  // filtering
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
    
  //open add user form
  openAddEdit() {
    const dialogRef = this._dialog.open(AddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getusers();
        }
      },
    });
  }
  users: any[] = [];
  displayedColumns: string[] = [
    'id',
    'partyname',
    'add1',
    'add2',
    'city',
    'state',
    'email',
    'num',
    'contper',
    'gst',
    'actions' ];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
    constructor
    (
      private _dialog: MatDialog,
      private http: HttpClient,
      private _snackBar: MatSnackBar,
      
    )
    {
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      this.getusers();
    }

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

    ngOnInit(): void {
      this.getusers();
    }

    //getuser method
    getusers() {
    this.http.get<any[]>('/api/users').subscribe(
      (response) => {
        this.dataSource = new MatTableDataSource(this.users = response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }


   //deleteuser method
   deleteUser(id: number): void {
    this.http.delete('/api/users/' + id).subscribe(
      (response) => {
        this._snackBar.open('User '+id +' Deleted.' , '' , {
          verticalPosition:'top',
          duration:3000, })
          this.getusers();
        },
        (error) => {
          console.error('Error:', error);
          }
        )
      }


    //Updateuser method
    editUser(data: any) {
     let _dialogRef= this._dialog.open(AddEditComponent, {
        data,
      });
      
      _dialogRef.afterClosed().subscribe((result) => {
        this.getusers();
      })
    }
}
