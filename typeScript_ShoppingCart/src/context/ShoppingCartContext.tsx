import { useContext, createContext, ReactNode, useState } from "react";
import Shoppingcart from "../Components/Shoppingcart";
import { useLocalStorage } from "../hooks/useLocalStorage";
interface ShoppingCartProviderProps {
  children: ReactNode;
}

interface CartItem {
  id: number;
  quantity: number;
}

type ShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  cartQuantity: number;
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartItems: CartItem[];
};
const shoppingCartContext = createContext({} as ShoppingCartContext);

export const useShoppingCart = () => {
  return useContext(shoppingCartContext);
};

export const ShoppingCartProvider = ({
  children,
}: ShoppingCartProviderProps) => {
  // UseState's

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart",[]);

  // All Functions !

  const openCart = (): void => {
    setIsOpen(true);
  };

  const closeCart = (): void => {
    setIsOpen(false);
  };

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

  function increaseCartQuantity(id: number) {
    setCartItems((currentITems) => {
      if (currentITems.find((item) => item.id === id) == null) {
        return [
          ...currentITems,
          {
            id,
            quantity: 1,
          },
        ];
      } else {
        return currentITems.map((item: CartItem) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function decreaseCartQuantity(id: number) {
    setCartItems((currentITems) => {
      if (currentITems.find((item) => item.id === id)?.quantity === 1) {
        return currentITems.filter((item) => item.id !== id);
      } else {
        return currentITems.map((item: CartItem) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  const removeFromCart = (id: number) => {
    setCartItems((currentITems) => {
      return currentITems.filter((items) => items.id !== id);
    });
  };

  return (
    <shoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartItems,
        cartQuantity,
        openCart,
        closeCart,
      }}
    >
      {children}
      <Shoppingcart isOpen={isOpen} />
    </shoppingCartContext.Provider>
  );
};
