// App.tsx
import React, { useState, useEffect } from 'react';
import './App.css';
import Layout from './Layout';
import SearchProduct from './SearchProduct';
import ProductList from './ProductList';
import Cart from './Cart';
import AddCustomerButton from './AddCustomerButton';
import {
  loginUser,
  FetchProducts,
  createCart,
  updateCart,
  fetchCartItems,
  FetchCustomerById,
} from './apiService';

function App() {
  const [isNewPage, setIsNewPage] = useState(true);
  const [isCallAPI, setIsCallAPI] = useState(false);
  const [isManualRemoveItem, setIsManualRemoveItem] = useState(false);
  const [isCallCartAPI, setIsCallCartAPI] = useState(false);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [originProducts, setOriginProducts] = useState<OriginalProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loggedInUser, setLoggedInUser] = useState<{ name: string } | null>();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [customerNote, setCustomerNote] = useState('');
  const [customerData, setCustomerData] = useState<Customer | null>();
  const [customerId, setCustomerId] = useState(0);
  const [isLogin, setIsLogin] = useState(false);
  const token = localStorage.getItem('token');
  const cartId = localStorage.getItem('cartId') ?? '';
  console.log('cartId:', cartId);

  const onCartLoad = () => {
    setIsCallCartAPI(true);
    fetchCartItems(cartId).then((cart: any) => {
      setCartItems(cart.data.data.products);
      setCustomerNote(cart.data.data.note);
      if (cart.data.data.customerId > 0) {
        FetchCustomerById(cart.data.data.customerId)
          .then((customer) => {
            setCustomerId(customer.data.id);
            const customerData = {
              id: customer.data.id,
              name: customer.data.name,
              phone: customer.data.phoneNumber,
            };
            setCustomerData(customerData);
          })
          .catch((error) => {
            console.error('Error fetching customer:', error);
          });
      }
    });
  };

  useEffect(() => {
    if (cartId) {
      if (isCallCartAPI == false) {
        onCartLoad();
      }
    }
  }, [cartId]);
  

  if (isCallAPI == false) {
    FetchProducts().then((products) => {
      console.log('products:', products);
      setIsCallAPI(true);
      setOriginProducts(products.data.items);
    });
  }

  const mapProducts = (originalProducts: OriginalProduct[]) => {
    return originalProducts.map((product: OriginalProduct) => ({
      id: product.productId,
      name: product.name,
      price: parseFloat(product.price),
      quantity: 1,
      image: '',
      note: '',
      tax: 0,
    }));
  };
  const products = mapProducts(originProducts);

  const getSubTotalAmount = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };
  const discountPercentage = 0;
  const taxRate = 0.1;
  const getDiscount = () => {
    return getSubTotalAmount() * (discountPercentage / 100);
  };

  const getTotalAmount = () => {
    return (
      cartItems.reduce((total, item) => total + item.price * item.quantity, 0) +
      getSubTotalAmount() * taxRate -
      getDiscount()
    );
  };

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

  useEffect(() => {
    addCart();
  }, [cartItems, customerNote, customerId]);

  const addCart = () => {
    if (!cartItems.length && !isManualRemoveItem) {
      return;
    }
    const cartId = parseInt(localStorage.getItem('cartId') ?? '', 10);
    const cart = {
      customerId: customerId,
      discountTotal: getDiscount(),
      coupon: {
        code: '',
        value: 0,
      },
      note: customerNote,
      products: cartItems,
      tax: 10,
      totalPrice: getTotalAmount(),
      subTotal: getSubTotalAmount(),
    };

    if (!cartId) {
      createCart(cart);
    } else {
      updateCart(cartId, cart);
    }
    setIsManualRemoveItem(false);
  };

  const handleSearch = (query: string) => {
    setIsNewPage(false);
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const removeFromCart = (productId: number) => {
    setIsManualRemoveItem(true);
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    // Update the quantity of the product in the cart
  };
  const updateCustomerNote = (note: string) => {
    setCustomerNote(note);
  };

  const handleSetCustomer = (customer: {
    id: number;
    name: string;
    phone: string;
  }) => {
    setCustomerId(customer.id);
    localStorage.setItem('customerId', customer.id.toString());
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('username:', username);
    console.log('password:', password);
    loginUser({
      name: username,
      password: password,
    })
      .then((user) => {
        setIsLogin(true);
        setLoggedInUser({ name: username });
        // Lưu token vào localStorage
        localStorage.setItem(
          'user',
          JSON.stringify({ name: user.data.userInfo.name })
        );
        localStorage.setItem('token', user.data.token);
      })
      .catch((error) => {
        alert('Invalid username or password');
      });
  };

  return (
    <>
      {!token && !isLogin ? (
        <div className="login-container">
          <div className="login-header">
            <img src="assets/logo.png" alt="Logo" />
          </div>
          <form className="login-form" onSubmit={handleLogin}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
          </form>
        </div>
      ) : (
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
                <AddCustomerButton
                  onSetCustomer={handleSetCustomer}
                  customerData={customerData}
                />
              </div>
              <Cart
                cartItems={cartItems}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
                onCustomerNote={updateCustomerNote}
                cartNote={customerNote}
              />
            </div>
          </div>
        </Layout>
      )}
    </>
  );
}

export default App;
