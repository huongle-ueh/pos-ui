// AddCustomerPopup.js
import React, { useState, useRef, useEffect } from 'react';
import './AddCustomerPopup.css';
import { addCustomer, FetchCustomer } from './apiService';

// Sample customer data
const sampleCustomers = [
  { id: 1, name: 'John Doe', phone: '1234567890' },
  { id: 2, name: 'Jane Smith', phone: '0987654321' },
  // Add more sample customers as needed
];

function AddCustomerPopup({
  onClose,
  onAssignCustomer,
}: {
  onClose: any;
  onAssignCustomer: any;
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [customer, setCustomer] = useState<{
    id: number;
    name: string;
    phone: string;
  } | null>(null);
  const [isNewCustomer, setIsNewCustomer] = useState(false); // Declare the isNewCustomer state variable
  const [newCustomerData, setNewCustomerData] = useState({
    id: 0,
    name: '',
    phone: '',
  });
  const nameInputRef = useRef(null);

  useEffect(() => {
    // Focus on the Name input field when isNewCustomer becomes true
    if (isNewCustomer && nameInputRef.current) {
      (nameInputRef.current as HTMLInputElement).focus();
    }
  }, [isNewCustomer]);

  const handleSearch = () => {
    setIsSearchClicked(true);
    FetchCustomer(searchTerm.toLowerCase())
      .then((response) => {
        if (!response.data) {
          console.log('No customer found');
          return;
        }
        console.log('Customer found:', response.data);
        const newCustomerData = {
          id: response.data.id,
          name: response.data.name,
          phone: response.data.phoneNumber,
        };
        setCustomer(newCustomerData);
      })
      .catch((error) => {
        console.error('Error fetching customer:', error);
      });
  };

  const handleSubmit = () => {
    const newInsertCustomerData = {
      name: newCustomerData.name,
      phoneNumber: newCustomerData.phone,
      email: 'admin@admin.com',
    };
    addCustomer(newInsertCustomerData)
      .then((response) => {
        console.log('Customer added successfully:', response.data);
        const insertCustomer = {
          ...newCustomerData,
          id: response.data.identifiers[0].id,
        };
        setNewCustomerData(insertCustomer);
        setCustomer(insertCustomer);
        onAssignCustomer(insertCustomer);
      })
      .catch((error) => {
        console.error('Error adding customer:', error);
      });
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewCustomerData({ ...newCustomerData, [name]: value });
  };

  const handleAssignCustomer = () => {
    // Logic to handle assigning the customer
    onAssignCustomer(customer);
  };

  const handleAddNewCustomer = () => {
    // Logic to handle assigning the customer
    setIsNewCustomer(true);
    setNewCustomerData({ ...newCustomerData, phone: searchTerm });
  };

  return (
    <div className="add-customer-popup">
      <div className="popup-content">
        <h2>{isNewCustomer ? 'Add New Customer' : 'Search Customer'}</h2>
        {isNewCustomer ? (
          <form>
            <div className="input-field">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={newCustomerData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="input-field">
              <label htmlFor="phone">Phone:</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={newCustomerData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
          </form>
        ) : (
          <>
            <input
              className="search-input"
              type="text"
              placeholder="Enter customer phone"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
            {customer ? (
              <div>
                {/* Display customer information if found */}
                <h3>Customer Information:</h3>
                <p>Name: {customer.name}</p>
                <p>Phone: {customer.phone}</p>
                {/* Display more customer information */}
              </div>
            ) : null}
            {customer == null && isSearchClicked ? (
              <p>No customer found. Would you like to add a new customer?</p>
            ) : null}

            {customer && isSearchClicked ? (
              <button onClick={handleAssignCustomer}>Assign Customer</button>
            ) : null}

            {customer == null && isSearchClicked ? (
              <button onClick={handleAddNewCustomer}>Add New Customer</button>
            ) : null}
          </>
        )}
        {isNewCustomer ? (
          <button onClick={handleSubmit}>Add Customer</button>
        ) : null}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default AddCustomerPopup;
