// App.tsx
import React, { useState } from 'react';
import './App.css';
import Layout from './Layout';
import SearchProduct from './SearchProduct';
import ProductList from './ProductList';
import Cart from './Cart';
import SaleButton from './SaleButton';
import AddCustomerButton from './AddCustomerButton';
// import AddCouponButton from './AddCouponButton';
// import NoteButton from './NoteButton';
// import TaxLine from './TaxLine';
// import PaymentMethod from './PaymentMethod';
// import PayButton from './PayButton';
import { taxRate } from './config';

const products: Product[] = [
  { id: 1, name: 'Product 1', price: 10, quantity: 1 },
  { id: 2, name: 'Product 2', price: 20, quantity: 1 },
  { id: 3, name: 'Product 3', price: 30, quantity: 1 },
  { id: 4, name: 'Product 4', price: 40, quantity: 1 },
  { id: 5, name: 'Product 5', price: 10, quantity: 1 },
  { id: 6, name: 'Product 6', price: 20, quantity: 1 },
  { id: 7, name: 'Product 7', price: 30, quantity: 1 },
  { id: 8, name: 'Product 8', price: 40, quantity: 1 },
  { id: 9, name: 'Product 9', price: 10, quantity: 1 },
  { id: 10, name: 'Product 10', price: 20, quantity: 1 },
  { id: 11, name: 'Product 11', price: 30, quantity: 1 },
  { id: 12, name: 'Product 12', price: 40, quantity: 1 },
  { id: 13, name: 'Product 13', price: 10, quantity: 1 },
  { id: 14, name: 'Product 14', price: 20, quantity: 1 },
  { id: 15, name: 'Product 15', price: 30, quantity: 1 },
  { id: 16, name: 'Product 16', price: 40, quantity: 1 },
];

function App() {
  const [isNewPage, setIsNewPage] = useState(true);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loggedInUser, setLoggedInUser] = useState<{ name: string } | null>({ name: 'Tony' });

  const addToCart = (product: Product) => {
    const existingProductIndex = cartItems.findIndex(
      (item) => item.id === product.id
    );
    if (existingProductIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingProductIndex].quantity += 1;
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const handleSearch = (query: string) => {
    setIsNewPage(false);
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const removeFromCart = (productId: number) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    // Update the quantity of the product in the cart
  };

  return (
    <Layout user={loggedInUser}>
      <div className="App">
        <div className="left-column">
          <SearchProduct onSearch={handleSearch} />
          <ProductList
            cartItems={cartItems}
            products={
              filteredProducts.length
                ? filteredProducts
                : isNewPage
                ? products
                : []
            }
            addToCart={addToCart}
          />
        </div>
        <div className="right-column">
          <div className="actions">
            {/* <SaleButton /> */}
            <AddCustomerButton />
          </div>
          <Cart
            cartItems={cartItems}
            removeFromCart={removeFromCart}
            updateQuantity={updateQuantity}
          />
          {/* <div className="additional-actions">
            <AddCouponButton />
            <NoteButton />
          </div> */}
          {/* <TaxLine subtotal={getSubTotalAmount()} />
          <PaymentMethod />
          <PayButton totalAmount={getTotalAmount()} /> */}
        </div>
      </div>
    </Layout>
  );
}

export default App;
