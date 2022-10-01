import { Item } from "./item";

export class Cart {
    _id:string;
    cartItems:CartItem[];
    user?:string;
    totalPrice:number
}

export class CartItem {
    _id?:string;
    item:Item;
    quantity:number;
    user?:string;
}

export class CartItemDetailed {
    _id?:string;
    item:Item;
    quantity:number;
}
