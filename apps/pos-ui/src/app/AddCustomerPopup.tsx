// AddCustomerPopup.js
import React, { useState, useRef, useEffect } from 'react';
import './AddCustomerPopup.css';

// Sample customer data
const sampleCustomers = [
  { id: 1, name: 'John Doe', phone: '1234567890' },
  { id: 2, name: 'Jane Smith', phone: '0987654321' },
  // Add more sample customers as needed
];

function AddCustomerPopup({ onClose, onAssignCustomer }: { onClose: any; onAssignCustomer: any }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearchClicked, setIsSearchClicked] = useState(false);
    const [customer, setCustomer] = useState<{ id: number; name: string; phone: string; } | null>(null); // Declare the setCustomer function
    const [isNewCustomer, setIsNewCustomer] = useState(false); // Declare the isNewCustomer state variable
    const [newCustomerData, setNewCustomerData] = useState({ id: 0, name: '', phone: '' });
    const nameInputRef = useRef(null);

    useEffect(() => {
        // Focus on the Name input field when isNewCustomer becomes true
        if (isNewCustomer && nameInputRef.current) {
            (nameInputRef.current as HTMLInputElement).focus();
        }
    }, [isNewCustomer]);

    const handleSearch = () => {
        // Simulated search logic - replace with actual search implementation
        setIsSearchClicked(true);
        const foundCustomer = sampleCustomers.find(
            (customer) => customer.phone.toLowerCase() === searchTerm.toLowerCase()
        );  
        setCustomer(foundCustomer || null); // Set customer to null if not found
    };

    const handleSubmit = () => {
        // Logic to handle form submission for adding a new customer
        // For now, we just log the new customer data
        console.log('New customer data:', newCustomerData);
        setNewCustomerData({ ...newCustomerData, id: 3});
        // You can add further logic to save the new customer data to your backend or state
        onAssignCustomer(newCustomerData);
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
                      <input type="text" id="name" name="name" value={newCustomerData.name} onChange={handleInputChange} required />
                    </div>
                    <div className="input-field">
                      <label htmlFor="phone">Phone:</label>
                      <input type="text" id="phone" name="phone" value={newCustomerData.phone} onChange={handleInputChange} required />
                    </div>
                  </form>
                ) : (
                    <>
                        <input
                            className='search-input'
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
                        ) : null }
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
