import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoryDialogComponent } from 'src/app/dialogs/category-dialog/category-dialog.component';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories!:Category[];
  displayedColumns : string[] = ['name', 'categoryType', 'edit', 'delete'];

  constructor(private categoryService : CategoryService,
    public dialog : MatDialog ) { }

  ngOnInit(): void {
    this.getCategories()
  }

  getCategories(){
    this.categoryService.getCategories().subscribe(
      (categories)=>{
        this.categories = categories;
      }
    )
  }

  onDeleteCategory(category:Category){
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      width: '250px',
      data: {name: category.name},
    });

    dialogRef.afterClosed().subscribe((result:boolean) => {
     if(result){
      this.categoryService.deleteCategory(category._id).subscribe(
        (category)=>{
          this.getCategories();
        }
      )
     }
    });
  }

}
