// Cart.tsx
import React, { useState } from 'react';
import './Cart.css'; // Import CSS file
import AddCouponButton from './AddCouponButton';
import NoteButton from './NoteButton';
import { taxRate } from './config';
import TaxLine from './TaxLine';
import PaymentMethod from './PaymentMethod';
import PayButton from './PayButton';

type Product = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};
type Coupon = { id: number; code: string; value: number };

type Props = {
  cartItems: Product[];
  removeFromCart: (productId: number) => void;
  updateQuantity: (index: number, value: number) => void;
  onCustomerNote: (note: string) => void;
  cartNote: string;
};

function Cart({
  cartItems,
  removeFromCart,
  updateQuantity,
  onCustomerNote,
  cartNote,
}: Props) {
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const getSubTotalAmount = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };
  const getDiscount = () => {
    return getSubTotalAmount() * (discountPercentage / 100);
  };

  const getTotalAmount = () => {
    return (
      cartItems.reduce((total, item) => total + item.price * item.quantity, 0) +
      getSubTotalAmount() * taxRate -
      getDiscount()
    );
  };

  const handleApplyCoupon = (coupon: Coupon | null) => {
    if (coupon) {
      setDiscountPercentage(coupon.value);
    }
  };

  const handleAddNote = (note: string | null) => {
    if (note) {
      onCustomerNote(note);
    }
  };

  const handleRemove = (productId: number) => {
    removeFromCart(productId);
  };

  const handleQuantityChange = (index: number, value: number) => {
    updateQuantity(index, value);
  };

  return (
    <>
      <div className="cart">
        <h2 className="cart-header">Cart 🛒</h2>
        <ul className="cart-items">
          {cartItems.map((item) => (
            <li key={item.id} className="cart-item">
              <div className="item-info">
                <div className="item-name">{item.name}</div>
                <div className="item-price">${item.price}</div>
                <input
                  type="number"
                  className="item-quantity"
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item.id, parseInt(e.target.value))
                  }
                />
                <div className="item-total-price">
                  Total: ${item.price * item.quantity}
                </div>
              </div>
              <button
                className="remove-button"
                onClick={() => handleRemove(item.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="additional-actions">
        <AddCouponButton onApplyCoupon={handleApplyCoupon} />
        <NoteButton onAddNote={handleAddNote} cartNote={cartNote} />
      </div>
      <TaxLine
        subtotal={getSubTotalAmount()}
        discount={getDiscount()}
        discountPercent={discountPercentage}
      />
      <PaymentMethod />
      <PayButton totalAmount={getTotalAmount()} />
    </>
  );
}

export default Cart;
