import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from 'src/app/models/cart';
import { Item } from 'src/app/models/item';
import { CartService } from 'src/app/services/cart.service';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-signle-item',
  templateUrl: './signle-item.component.html',
  styleUrls: ['./signle-item.component.css']
})
export class SignleItemComponent implements OnInit {

  item!:Item;

  constructor(private route : ActivatedRoute,
    private itemService : ItemsService,
    private router : Router,
    private cartService : CartService,
    private _snackBar : MatSnackBar) { }

  ngOnInit(): void {
    this.getOneItem();
  }

  getOneItem(){
    this.route.params.subscribe(
      (params)=>{
        const id = params['id'];
        this.itemService.getOneItem(id).subscribe(
          (item)=>{
            this.item = item;
          }
        )
      }
    )
  }

  backToShop(){
    this.router.navigateByUrl('/')
  }

  addToCart(){
    const cartItem : CartItem = {
      //_id:this.item._id,
      item:this.item,
      quantity:1
    }

    this.cartService.setCartItem(cartItem);

    this._snackBar.open('You added '+cartItem.item.name+' to the cart', 'OK', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration:4000
    });
  }

}
