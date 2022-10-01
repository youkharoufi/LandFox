import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Item } from 'src/app/models/item';
import { SearchPipe } from 'src/app/Pipes/search-pipe/search-pipe.component';
import { CategoryService } from 'src/app/services/category.service';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  items!:Item[];
  categories!:Category[];
  filter!:string;
  showList = true;
  searchLaunch = false;
  searchDataFiltered!:Item[];

  searchForm!:FormGroup;

  constructor(private itemService :  ItemsService,
    private categoryService : CategoryService,
    private formBuilder : FormBuilder,
    private searchPipe : SearchPipe,
    private router : Router 
    ) { }

  ngOnInit(): void {
    this.getItems();
    this.getCategories();

    this.searchForm = this.formBuilder.group({
      term:['']
    })
  }

  getItems(){
    this.itemService.getAllItems().subscribe(
      (items)=>{
        this.items = items;
      }
    )
  }

  getCategories(){
    this.categoryService.getCategories().subscribe(
      (categories)=>{
        this.categories = categories;
      }
    )
  }

  changeClient(value:string){
    this.searchLaunch=false;
    this.filter=value;
    this.showList = false
    if(this.filter === 'All'){
      this.showList = true;
    }
  }

  onSubmit(){
    this.searchLaunch = true;

    const term = this.searchForm.get('term')?.value;
    this.searchDataFiltered = this.searchPipe.transform(this.items, term);

  }

  forwardToSingleItem(itemId:string){
    this.router.navigate(['/items/single-item/'+itemId]);
  }

}
