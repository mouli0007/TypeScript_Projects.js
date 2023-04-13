import React from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";
import StoreItems from "../data/items.json";
import { Stack, Button } from "react-bootstrap";
import { formatCurrency } from "../utilities/formatCurrency";
interface IPROPS {
  id: number;
  quantity: number;
}

const CartItem = ({ id, quantity }: IPROPS) => {
  const { removeFromCart } = useShoppingCart();
  const item = StoreItems.find((items_) => items_.id === id);
  if (item == null) return null;
  return (
    <>
      <Stack
        direction="horizontal"
        gap={2}
        className="d-flex align-items-center"
      >
        <img
          src={item.imgUrl}
          alt={item.name}
          style={{
            width: "125px",
            height: "75px",
            objectFit: "cover",
          }}
        />

        <div className="me-auto">
          <div>
            {item.name}

            {quantity > 1 && (
              <span
                className="text-muted"
                style={{
                  fontSize: ".65rem",
                  paddingLeft: "6px",
                }}
              >
                X{quantity}
              </span>
            )}
          </div>
          <div
            className="text-muted"
            style={{
              fontSize: ".75rem",
            }}
          >
            {formatCurrency(item.price)}
          </div>
        </div>

        <div>{formatCurrency(item.price * quantity)}</div>
        <Button
          variant="danger"
          size="sm"
          onClick={() => removeFromCart(item.id)}
        >
          &times;
        </Button>
      </Stack>
    </>
  );
};

export default CartItem;
