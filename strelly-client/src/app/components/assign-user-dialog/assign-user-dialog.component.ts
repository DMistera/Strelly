import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User, Task } from '@app/models';
import { UsersService } from '@app/services/users.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-assign-user-dialog',
  templateUrl: './assign-user-dialog.component.html',
  styleUrls: ['./assign-user-dialog.component.scss']
})
export class AssignUserDialogComponent implements OnInit {
  users: User[];
  
  loadingData: boolean;

  myControl = new FormControl();
  // users: User[] = [{name: 'Mary'}, {name: 'Shelley'}, {name: 'Igor'}];
  filteredUsers: Observable<User[]>;

  constructor(@Inject(MAT_DIALOG_DATA) public task: Task, private usersService: UsersService, public dialogRef: MatDialogRef<AssignUserDialogComponent>) { 
    this.loadingData = true;
    this.usersService.getUsers().subscribe(
      (data)=>{
        console.log(data);
        if(task.assignees.length>0){
          for(let a of task.assignees){
            data = data.filter((u:User)=>u.id != a.id);
          }
          this.users = data;
        }
        else{
          this.users = data;
        }
        this.loadingData = false;
      }
    )
  }
  ngOnInit() {
    this.filteredUsers = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filter(name) : this.users.slice())),
    );
  }

  displayFn(user: User): string {
    return user && user.userName ? user.userName : '';
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.users.filter(option => option.userName.toLowerCase().includes(filterValue));
  }

  closeDialog() {
    if (this.myControl.valid) {
      console.log(this.myControl);
      this.dialogRef.close(this.myControl.value);
    }
  }
}
