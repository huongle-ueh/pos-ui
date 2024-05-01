import React, { useState } from 'react';
import AddCouponPopup from './AddCouponPopup';

function AddCouponButton({ onApplyCoupon }: { onApplyCoupon: any }) {
  const [showPopup, setShowPopup] = useState(false);
  const [coupon, setCoupon] = useState<{ id: number; code: string; value: number; } | null>(null);

  type Coupon = {id: number; code: string; value: number;};

  const handleAssignCoupon = (coupon: Coupon | null) => {
    setCoupon(coupon);
    onApplyCoupon(coupon);
  };

  const handleButtonClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      {coupon ? (
        <>
          <button>Coupon code: {coupon.code} </button>
        </>
      ) : (
        <>
          <button onClick={handleButtonClick}>Add Coupon</button>
          {showPopup && <AddCouponPopup onClose={handleClosePopup}  onAssignCoupon={handleAssignCoupon} />}
        </>
      )}
    </>
  );
}

export default AddCouponButton;
