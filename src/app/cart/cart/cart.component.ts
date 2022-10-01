import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cart, CartItem } from 'src/app/models/cart';
import { CartService } from 'src/app/services/cart.service';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItemDetailed : CartItem[] = [];
  respCart : Cart;
  totalPrice : number;

  constructor(private cartService : CartService,
    private itemService : ItemsService,
    private snackBar : MatSnackBar) { }

  ngOnInit(): void {
    this.getItemDetails();
  }

  getItemDetails(){
    this.cartService.cart$.pipe().subscribe(
      (respCart)=>{
        this.cartItemDetailed = [];
        this.respCart = respCart;
        respCart.cartItems.forEach(
          (cartItem)=>{
            this.itemService.getOneItem(cartItem.item._id).subscribe(
              (item)=>{
                this.totalPrice = item.price * cartItem.quantity;
                this.cartItemDetailed.push({
                  item:item,
                  quantity:cartItem.quantity
                })
              }
            )
          }
        )
      }
    )
  }

  removeItem(index:number, cartItem:CartItem){
    this.cartService.removeItem(index);

    this.snackBar.open("You deleted "+cartItem.item.name+" from the cart", "OK", {
      duration:2000,
      horizontalPosition:'right',
      verticalPosition:'top'
    })
  }

}
