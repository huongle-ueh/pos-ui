// App.tsx
import React, { useState } from 'react';
import './App.css';
import Layout from './Layout';
import SearchProduct from './SearchProduct';
import ProductList from './ProductList';
import Cart from './Cart';
import AddCustomerButton from './AddCustomerButton';
import axios from 'axios';

// const products: Product[] = [
//   { id: 1, name: 'Product 1', price: 10, quantity: 1 },
//   { id: 2, name: 'Product 2', price: 20, quantity: 1 },
//   { id: 3, name: 'Product 3', price: 30, quantity: 1 },
//   { id: 4, name: 'Product 4', price: 40, quantity: 1 },
//   { id: 5, name: 'Product 5', price: 10, quantity: 1 },
//   { id: 6, name: 'Product 6', price: 20, quantity: 1 },
//   { id: 7, name: 'Product 7', price: 30, quantity: 1 },
//   { id: 8, name: 'Product 8', price: 40, quantity: 1 },
//   { id: 9, name: 'Product 9', price: 10, quantity: 1 },
//   { id: 10, name: 'Product 10', price: 20, quantity: 1 },
//   { id: 11, name: 'Product 11', price: 30, quantity: 1 },
//   { id: 12, name: 'Product 12', price: 40, quantity: 1 },
//   { id: 13, name: 'Product 13', price: 10, quantity: 1 },
//   { id: 14, name: 'Product 14', price: 20, quantity: 1 },
//   { id: 15, name: 'Product 15', price: 30, quantity: 1 },
//   { id: 16, name: 'Product 16', price: 40, quantity: 1 },
// ];
type OriginalProduct = {
  name: string,
  description: string,
  tax: number,
  image: string,
  price: string,
  categoryName: string,
  productId: number,
  categoryId: number
};

type OriginalCustomer = {
  id: number,
  name: string,
  phoneNumber: string,
  email: string,
  createdAt: string,
  updatedAt: string
};

function App() {
  const [isNewPage, setIsNewPage] = useState(true);
  const [isCallAPI, setIsCallAPI] = useState(false);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [originProducts, setOriginProducts] = useState<OriginalProduct[]>([]);
  const [originCustomer, setOriginCustomer] = useState<OriginalCustomer>();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loggedInUser, setLoggedInUser] = useState<{ name: string } | null>();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  // setToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InRvbnkiLCJlbWFpbCI6ImFkbWluQHRvbnkuY29tIiwicGhvbmVOdW1iZXIiOiIwOTg3NjU0MzIxIiwiaWF0IjoxNzE0NjMwODkzLCJleHAiOjE3MTQ2MzQ0OTN9.jLmcV2-nFpebTjZAVuNwz-I3j3W1s_Yr5_z5wFesiGA');
  const FetchProducts = async (token: string) => {
    setIsCallAPI(true);
    try {
        const response = await axios.get('http://42.112.26.77:3003/products', {
            headers: {
                'accept': '*/*',
                'Authorization': `Bearer ${token}`
            }
        });
    
        return response.data;
    } catch (error: any) {
        console.error('Error fetching products:', error.message);
        return [];
    }
  };
  const FetchCustomer = async (phone:string, token: string) => {
    try {
        const response = await axios.get(`http://42.112.26.77:3005/customer?phoneNumber=${phone}`, {
            headers: {
                'accept': '*/*',
                'Authorization': `Bearer ${token}`
            }
        });
    
        return response.data;
    } catch (error: any) {
        console.error('Error fetching products:', error.message);
        return [];
    }
  };
  const login = async (username:string, password:string) => {
    try {
      const response = await axios.post('http://42.112.26.77:3004/users/login', {
        name: username,
        password: password
      }, {
        headers: {
          'Content-Type': 'application/json',
          'accept': '*/*'
        }
      });
  
      return response.data;
    } catch (error: any) {
      // Xử lý lỗi nếu có
      console.error('Error during login:', error.response.data);
    }
  }
  if (isCallAPI == false && token != '') {
    FetchProducts(token).then(products => {
      console.log('products:', products);
      setOriginProducts(products.data.items);
    });
  }
  
  const mapProducts = (originalProducts: OriginalProduct[]) => {
    return originalProducts.map((product: OriginalProduct) => ({
      id: product.productId,
      name: product.name,
      price: parseFloat(product.price),
      quantity: 1
    }));
  };
  const products = mapProducts(originProducts);

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

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('username:', username);
    console.log('password:', password);
    login(username, password).then(user => {
      console.log('user:', user);
      setToken(user.data.token);
      setLoggedInUser({name: username});
    }).catch(error => {
      alert('Invalid username or password');
    });
  };

  return (
    <>
    {!token ? (
      <div className="login-container">
      <div className="login-header">
        <img src="assets/logo.png" alt="Logo" />
      </div>
      <form className="login-form" onSubmit={handleLogin}>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </div>
    ): (
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
            <AddCustomerButton />
          </div>
          <Cart
            cartItems={cartItems}
            removeFromCart={removeFromCart}
            updateQuantity={updateQuantity}
          />
        </div>
      </div>
    </Layout>
    )}
    </>
  );
}

export default App;
