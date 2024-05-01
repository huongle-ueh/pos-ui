import React, { useState } from 'react';
import AddCustomerPopup from './AddCustomerPopup';

function AddCustomerButton() {
  const [showPopup, setShowPopup] = useState(false);
  const [customer, setCustomer] = useState<{ id: number; name: string; phone: string; } | null>(null);

  type Customer = { id: number; name: string; phone: string; };

  const handleAssignCustomer = (customer: Customer | null) => {
    setCustomer(customer);
  };

  const handleButtonClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      {customer ? (
        <>
          <button>Customer Name: {customer.name} - Phone: {customer.phone}</button>
        </>
      ) : (
        <>
          <button onClick={handleButtonClick}>Add Customer</button>
          {showPopup && <AddCustomerPopup onClose={handleClosePopup}  onAssignCustomer={handleAssignCustomer} />}
        </>
      )}
    </>
  );
}

export default AddCustomerButton;