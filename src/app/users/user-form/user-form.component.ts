import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  userForm!:FormGroup;
  isSubmitted = false;
  editMode = false;
  currentUserId!:string;

  constructor(private formBuilder : FormBuilder, 
    private route : ActivatedRoute,
    private userService : UserServiceService, 
    private _snackBar : MatSnackBar,
    private router : Router) { }

  ngOnInit(): void {
    this.initForm();
    this.checkEditMode()
  }

  initForm(){
    this.userForm = this.formBuilder.group({
      email:['', Validators.required],
      password:['', Validators.required],
      isAdmin:['']
    })
  }

  private checkEditMode(){
    this.route.params.subscribe(
      (params)=>{
        if(params['id']){
          this.editMode = true;
          this.currentUserId = params['id'];
          this.userService.getOneUser(params['id']).subscribe(
            (user)=>{
              this.userForm.get('email').setValue(user.email);
              this.userForm.get('password').setValue(user.password);
              this.userForm.get('isAdmin').setValue(user.isAdmin);
            }
          )
        }
      }
    )
  }

  addUser(user:User){
    this.userService.createUser(user).subscribe(
      (user)=>{
        this._snackBar.open('You created a new user : '+user.email, 'OK', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration:4000
        });
      }
    )
  }

  updateUser(user:User){
    this.userService.updateUser(user, user._id).subscribe(
      (user)=>{
        this._snackBar.open('You updated this user : '+user.email, 'OK', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration:4000
        });
      }
    )
  }

  onSubmit(){

    this.isSubmitted = true;
    if(this.userForm.invalid){
      return;
    }

    const user : User = {
      _id:this.currentUserId,
      email:this.userForm.get('email').value,
      password:this.userForm.get('password').value,
      isAdmin:this.userForm.get('isAdmin').value,
    }

    if(this.editMode){
      this.updateUser(user);
    }else{
      this.addUser(user)
    }

    this.userService.getAllUsers();
    setTimeout(()=>{
      this.router.navigate(['/users/list']);
    }, 2000)

  }

}
