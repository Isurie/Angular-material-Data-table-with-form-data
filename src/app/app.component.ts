import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import Swal from 'sweetalert2';

export interface user {
  userName: string;
  email: string;
  phone: number;
  amount: number;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  name: string="";
  
  columnsToDisplay: string[] = ["userName", "email","phone","amount","actions"];
  public USER_DATA: user[] = [
    { userName: "W1", email: "E1@gmail.com" ,phone:777777777, amount:1000},
    { userName: "W2", email: "E2@gmail.com" ,phone:888888888, amount:2000},
    { userName: "W3", email: "e3@gmail.com" ,phone:999999999, amount:11000}
  ];
  public newUser = {userName: "ABC", email: "abc@gmail.com", phone:666666666, amount:21000};
  public myDataArray: any;

  
  addUser() {
    if(this.newUser.userName!=""&&this.newUser.email!=""&&this.newUser.phone!=0&&this.newUser.amount!=0){
      const newUsersArray = this.USER_DATA;
      newUsersArray.push(this.newUser);
      this.myDataArray = [...newUsersArray];
      this.newUser = {userName:"User name", email: "abc@gmail.com", phone:0, amount:0};
    //console.warn(this.myDataArray);
    }else{
      Swal.fire(':-|', 'Invalid input values..!', 'error')
      //Swal.fire('Invalid input values..!')
    }
    
  }

  delete(row_obj:any){
    this.USER_DATA = this.USER_DATA.filter((value,key)=>{
      return value.email != row_obj.email;
    });
    this.myDataArray = [...this.USER_DATA];//refresh the dataSource
    Swal.fire('Deleted successfully..!')
  }

  
  constructor(public dialog: MatDialog) {
    this.myDataArray = new MatTableDataSource<user>([...this.USER_DATA]);
  }

  openDialog(row_obj:any): void {
    let dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data: { name: this.name }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.name = result;
      if(this.name!=undefined){
        if(this.name==""){
          Swal.fire('Username cannot be empty..!')
        } else{
          row_obj.userName=this.name
          const newUsersArray = this.USER_DATA;
          this.myDataArray = [...newUsersArray];
          Swal.fire('Updated successfully..!')
        }
        
      }
            
      
    });
  }

  ngOnInit() {
  }


}





