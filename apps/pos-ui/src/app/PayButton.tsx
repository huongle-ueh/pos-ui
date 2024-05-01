// PayButton.js
import React from 'react';
import './PayButton.css'; // Import CSS file

function PayButton({ totalAmount }: { totalAmount: number }) {
    return (
        <div className="pay-button-container">
            <button className="pay-button" style={{ width: '100%' }}>
                Pay Now - Total: ${totalAmount}
            </button>
        </div>
    );
}

export default PayButton;
