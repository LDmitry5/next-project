"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import { ICartContext } from "../models/cart_context.model";
import { CartItem } from "../models/cart_item.model";
import { Product } from "../models/product.model";

const CartContext = createContext<ICartContext>({} as ICartContext);

export const useCart = () => {
  return useContext(CartContext);
};

export default function CartProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addCartItem = (product: Product) => {
    setCartItems((prev) => {
      const findProduct = cartItems.find((p) => p.id === product.id);

      if (findProduct) {
        return prev.map((p) => {
          if (p.id === findProduct.id) {
            return { ...p, count: p.count + 1 };
          } else {
            return p;
          }
        });
      } else {
        return [...prev, { ...product, count: 1 }];
      }
    });
  };

  const deleteCartItem = (product: Product) => {
    setCartItems((prev) => {
      const findProduct = cartItems.find((p) => p.id === product.id);

      if (findProduct) {
        if (findProduct.count > 1) {
          return prev.map((p) => {
            if (p.id === findProduct.id) {
              return { ...p, count: p.count - 1 };
            } else {
              return p;
            }
          });
        } else {
          return prev.filter((p) => p.id !== product.id);
        }
      } else {
        return prev;
      }
    });
  };

  return <CartContext.Provider value={{ isOpen, setIsOpen, cartItems, addCartItem, deleteCartItem }}>{children}</CartContext.Provider>;
}
