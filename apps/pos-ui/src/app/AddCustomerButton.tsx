import React, { useState, useEffect } from 'react';
import AddCustomerPopup from './AddCustomerPopup';

function AddCustomerButton({ onSetCustomer, customerData }: { onSetCustomer: any, customerData:any }) {
  const [showPopup, setShowPopup] = useState(false);
  const [customer, setCustomer] = useState<{
    id: number;
    name: string;
    phone: string;
  } | null>(null);

  useEffect(() => {
    if(customerData){
      setCustomer(customerData);
    }
  }, [customerData]);

  const handleAssignCustomer = (customer: Customer | null) => {
    setCustomer(customer);
    onSetCustomer(customer);
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
          <button>
            Customer Name: {customer.name} - Phone: {customer.phone}
          </button>
        </>
      ) : (
        <>
          <button onClick={handleButtonClick}>Add Customer</button>
          {showPopup && (
            <AddCustomerPopup
              onClose={handleClosePopup}
              onAssignCustomer={handleAssignCustomer}
            />
          )}
        </>
      )}
    </>
  );
}

export default AddCustomerButton;
