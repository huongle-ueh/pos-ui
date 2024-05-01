// AddCustomerPopup.js
import React, { useState } from 'react';
import './AddCouponPopup.css';

// Sample coupon data
const sampleCoupon = [
  { id: 1, code: 'DISCOUNT10', value: 10 },
  { id: 2, code: 'DISCOUNT20', value: 20 },
];

function AddCouponPopup({ onClose, onAssignCoupon }: { onClose: any; onAssignCoupon: any }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearchClicked, setIsSearchClicked] = useState(false);
    const [coupon, setCoupon] = useState<{ id: number; code: string; value: number; } | null>(null);

    const handleRedeemCoupon = () => {
        // Simulated search logic - replace with actual search implementation
        setIsSearchClicked(true);
        const foundCoupon = sampleCoupon.find(
            (coupon) => coupon.code.toLowerCase() === searchTerm.toLowerCase()
        );  
        setCoupon(foundCoupon || null);
    };

    const handleApplyCoupon = () => {
        onAssignCoupon(coupon);
    };

    return (
        <div className="add-customer-popup">
            <div className="popup-content">
                <h2>Apply Coupon</h2>
                <input
                    className='search-input'
                    type="text"
                    placeholder="Enter coupon code"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={handleRedeemCoupon}>Apply</button>
                {coupon ? (
                    <div>
                        <h3>Coupon Information:</h3>
                        <p>Code: {coupon.code}</p>
                        <p>Value: {coupon.value}%</p>
                    </div>
                ) : null }
                {coupon == null && isSearchClicked ? (
                    <p>Coupon is invalid!!!</p>
                ) : null}

                {coupon && isSearchClicked ? (
                    <button onClick={handleApplyCoupon}>Confirm Apply Coupon</button>
                ) : null}
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default AddCouponPopup;
