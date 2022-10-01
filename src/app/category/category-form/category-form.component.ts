import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

  categoryForm!:FormGroup;
  isSubmitted = false;
  editMode = false;
  currentCategoryId!:string;

  constructor(private formBuilder : FormBuilder,
    private route : ActivatedRoute,
    private categoryService : CategoryService,
    private _snackBar : MatSnackBar,
    private router : Router) { }

  ngOnInit(): void {
    this.initCategoryForm();
    this.checkEditMode()
  }

  initCategoryForm(){
    this.categoryForm = this.formBuilder.group({
      name:['', Validators.required],
      categoryType:[''],
    })
  }

  checkEditMode(){
    this.route.params.subscribe(
      (params)=>{
        if(params['id']){
          this.editMode = true;
          this.currentCategoryId = params['id'];
          this.categoryService.getCategory(params['id']).subscribe(
            (category)=>{
              this.categoryForm.get('name')?.setValue(category.name);
              this.categoryForm.get('categoryType')?.setValue(category.categoryType);
            }
          )
        }
      }
    )
  }

  addCategory(category:Category){
    this.categoryService.createCategory(category).subscribe(
      (category)=>{
        this._snackBar.open('You added '+category.name+' as new Category', 'OK', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration:4000,
        });
      }
      
    )
  }

  updateCategory(category:Category){
    this.categoryService.updateCategory(category).subscribe(
      (category)=>{
        this._snackBar.open('You updated '+category.name+' Category', 'OK', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration:4000,
        });
      }
      
    )
  }

onSubmit(){
  this.isSubmitted = true;
  if(this.categoryForm.invalid){
    return
  }

  const category : Category = {
    _id:this.currentCategoryId,
    name:this.categoryForm.get('name')?.value,
    categoryType:this.categoryForm.get('categoryType')?.value
  }

  if(this.editMode){
    this.updateCategory(category)
  }else{
    this.addCategory(category)
  }

  this.categoryService.getCategories();

  setTimeout(()=>{
    this.router.navigate(['/categories/list'])
  },2000)

}


}
