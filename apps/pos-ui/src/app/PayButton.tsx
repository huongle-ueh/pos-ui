// PayButton.js
import React from 'react';
import './PayButton.css'; // Import CSS file
import { createOrder } from './apiService';

function PayButton({ totalAmount }: { totalAmount: number }) {
  const handlePayNowClick = () => {
    const cartId = parseInt(localStorage.getItem('cartId') ?? '0');
    const customerId = parseInt(localStorage.getItem('customerId') ?? '0');
    createOrder({
      cartId: cartId,
      customerId: customerId,
      orderStatus: '',
      paymentMethod: 'cash',
    })
      .then((order) => {
        alert(`Payment of $${totalAmount} successful! Your order number is ${order.id}`);
        console.log(order);
        // Clear cart
        localStorage.removeItem('cartId');
        localStorage.removeItem('customerId');
        //reload page
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error creating order:', error);
      });
  };
  return (
    <div className="pay-button-container">
      <button
        onClick={handlePayNowClick}
        className="pay-button"
        style={{ width: '100%' }}
      >
        Pay Now - Total: ${totalAmount}
      </button>
    </div>
  );
}

export default PayButton;
