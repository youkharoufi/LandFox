import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/cart';

const CART = 'cart';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart$ : BehaviorSubject<Cart> = new BehaviorSubject(this.getCart());

  constructor() { 
    this.initCartLocalStorage();
  }

    initCartLocalStorage(){
      const cart : Cart = this.getCart();

    if(!cart){
      const initialCart = {
          cartItems: [],
          user:{}
        };
    const initialCartJson = JSON.stringify(initialCart);
    localStorage.setItem(CART, initialCartJson);
      }
  
    }

    getCart():Cart{
    
      const cartJsonString : string = localStorage.getItem(CART);
      const cart : Cart = JSON.parse(cartJsonString);

      return cart;
    }

    setCartItem(cartItem:CartItem) {

      const cart = this.getCart();

      const cartItemExist = cart.cartItems.find(item => item.item._id === cartItem.item._id);
      
      if(cartItemExist){
        cart.cartItems.map((item)=>{
          if(item.item._id === cartItem.item._id){
            item.quantity = item.quantity + cartItem.quantity;
          }
        });
      }else{
        const user = localStorage.getItem('user');
        cart.cartItems.push(cartItem);
        cart.user = user;
        console.log(cart);
        this.cart$.next(cart);
      }
    
      const cartJson = JSON.stringify(cart);
      localStorage.setItem(CART, cartJson);
      this.cart$.next(cart);
      console.log(cart)
      return cart;
      
    }

    removeItem(index:number){
      const cart = this.getCart();
      cart.cartItems.splice(index, 1);
      const cartJson = JSON.stringify(cart);
      localStorage.setItem(CART, cartJson);
      this.cart$.next(cart);
    }
}

