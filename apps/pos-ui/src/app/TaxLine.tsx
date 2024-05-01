// TaxLine.js
import React from 'react';
import { taxRate } from './config';
import './TaxLine.css'; // Import CSS file

function TaxLine({
  subtotal,
  discount,
  discountPercent
}: {
  subtotal: number;
  discount: number;
  discountPercent: number;
}) {
  const taxAmount = subtotal * taxRate;

  return (
    <>
      <div className="tax-line">
        <span className="tax-text">Tax (10%):</span>
        <span className="tax-amount">${taxAmount.toFixed(2)}</span>
      </div>
      {discount > 0 ? (
        <div className="tax-line">
          <span className="tax-text">Discount({discountPercent}%):</span>
          <span className="tax-amount">-${discount.toFixed(2)}</span>
        </div>
      ) : null}
    </>
  );
}

export default TaxLine;
