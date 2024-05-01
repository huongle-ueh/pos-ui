// PaymentMethod.js
import React from 'react';
import './PaymentMethod.css'; // Import CSS file

function PaymentMethod() {
  return (
    <div className="payment-method">
      <h3>Payment Method</h3>
      <div className="payment-options">
        <label htmlFor="cash">
          <input type="radio" id="cash" name="payment" value="cash" defaultChecked />
          <span>Cash</span>
        </label>
        <label htmlFor="credit-card">
          <input type="radio" id="credit-card" name="payment" value="credit-card" />
          <span>Credit Card</span>
        </label>
      </div>
    </div>
  );
}

export default PaymentMethod;
