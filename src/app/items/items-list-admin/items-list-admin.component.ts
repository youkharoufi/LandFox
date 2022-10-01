import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Item } from 'src/app/models/item';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-items-list-admin',
  templateUrl: './items-list-admin.component.html',
  styleUrls: ['./items-list-admin.component.css']
})
export class ItemsListAdminComponent implements OnInit {

  items!:Item[];
  displayedColumns : string[] = ['name', 'description', 'price', 'image', 'category', 'edit', 'delete']

  constructor(private itemService : ItemsService,
    public dialog:MatDialog) { }

  ngOnInit(): void {
    this.getItems();
  }

  getItems(){
    this.itemService.getAllItems().subscribe(
      (items)=>{
        this.items = items;
      }
    )
  }

  

}
