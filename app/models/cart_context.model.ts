import { CartItem } from "./cart_item.model";
import { Product } from "./product.model";

export interface ICartContext {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  cartItems: CartItem[];
  addCartItem: (product: Product) => void;
  deleteCartItem: (product: Product) => void;
}
