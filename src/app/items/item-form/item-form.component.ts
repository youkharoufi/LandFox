import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Item } from 'src/app/models/item';
import { CategoryService } from 'src/app/services/category.service';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent implements OnInit {

  itemForm!:FormGroup;
  categories!:Category[];
  imageDisplay!: string | ArrayBuffer;
  isSubmitted = false;
  editMode = false;
  currentItemId!:string;

  constructor(private formBuilder : FormBuilder,
    private route : ActivatedRoute,
    private itemService:ItemsService,
    private _snackBar : MatSnackBar,
    private router : Router,
    private categoryService : CategoryService) { }

  ngOnInit(): void {
    this.initForm();
    this.checkEditMode();
    this.getCategories();
  }

  getCategories(){
    this.categoryService.getCategories().subscribe(
      (categories)=>{
        this.categories = categories;
      }
    )
  }

  initForm(){
    this.itemForm = this.formBuilder.group({
      name:['', Validators.required],
      description:['', Validators.required],
      price:['', Validators.required],
      image:[''],
      category:['', Validators.required],
    })
  }

  onImageUpload(event:any){
    const file = event.target.files[0];
    if(file){
      this.itemForm.patchValue({image:file});
      this.itemForm.get('image')?.updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () =>{
        this.imageDisplay=fileReader.result;
      };

      fileReader.readAsDataURL(file);
    }
  }

  checkEditMode(){
    this.route.params.subscribe(
      (params)=>{
        if(params['id']){
          this.editMode = true;
          this.currentItemId = params['id'];
          this.itemService.getOneItem(params['id']).subscribe(
            (item)=>{
              this.itemForm.get('name').setValue(item.name);
              this.itemForm.get('description').setValue(item.description);
              this.itemForm.get('price').setValue(item.price);
              this.imageDisplay = item.image;
              this.itemForm.get('category').setValue(item.category);
            }
          )
        }
      }
    )
  }

  addItem(item:FormData){
    this.itemService.createItem(item).subscribe(
      (item)=>{
        this._snackBar.open('You added '+this.itemForm.get('name').value+' as a new Item', 'OK', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration:4000
        });
      }
    )
  }

  updateItem(item:FormData){
    this.itemService.updateItem(item, this.currentItemId).subscribe(
      (item)=>{
        this._snackBar.open('You updated '+this.itemForm.get('name').value+' Item', 'OK', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration:4000
        });
      }
    )
  }

  onSubmit(){
    this.isSubmitted = true;
    if(this.itemForm.invalid){
      return
    }

    const itemData = new FormData();

    itemData.append('name', this.itemForm.get('name').value);
    itemData.append('description', this.itemForm.get('description').value);
    itemData.append('price', this.itemForm.get('price').value);
    itemData.append('image', this.itemForm.get('image').value);
    itemData.append('category', this.itemForm.get('category').value);

    if(this.editMode){
      this.updateItem(itemData);
    }else{
      this.addItem(itemData);
    }

    this.itemService.getAllItems()
    
        setTimeout(()=>{
          this.router.navigate(['/items/list'])
      
      },2000)
  }

}
