// apiService.js
import axios from 'axios';

const API_URL = 'https://api.baocaocuoiky.info/';

const apiService = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiService.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const loginUser = async (userData: any) => {
  try {
    const response = await apiService.post(
      'user-service/users/login',
      userData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addCustomer = async (customerData: any) => {
  try {
    const response = await apiService.post(
      'customer-service/customer',
      customerData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const FetchProducts = async () => {
  try {
    const response = await apiService.get('product-service/products');
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const FetchCustomerById = async (id: number) => {
    try {
      const response = await apiService.get(
        `customer-service/customer/getById/${id}`
      );
      return response.data;
    } catch (error: any) {
      return [];
    }
  };

export const FetchCustomer = async (phone: string) => {
  try {
    const response = await apiService.get(
      `customer-service/customer?phoneNumber=${phone}`
    );
    return response.data;
  } catch (error: any) {
    return [];
  }
};

export const fetchCartItems = async (cartId: string) => {
  try {
    return await apiService.get(`cart-service/carts/${cartId}`);
  } catch (error) {
    throw error;
  }
};

export const createCart = async (cart: Cart) => {
  try {
    return await apiService
      .post('cart-service/carts', cart)
      .then((response) => {
        console.log('Cart created successfully:', response.data);
        const cartId = response.data.data.identifiers[0].id;
        localStorage.setItem('cartId', cartId.toString());
      })
      .catch((error) => {
        throw error;
      });
  } catch (error) {
    throw error;
  }
};

// Hàm để cập nhật cart hiện tại
export const updateCart = async (cartId: number, Cart: Cart) => {
  const payload = { ...Cart, id: cartId };
  try {
    return await apiService
      .put('cart-service/carts', payload)
      .then((response) => {
        console.log('Cart updated successfully:', response.data);
      })
      .catch((error) => {
        throw error;
      });
  } catch (error) {
    throw error;
  }
};

export const createOrder = async (orderData: any) => {
    try {
      const response = await apiService.post(
        'middleware-service/pos/orders',
        orderData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };
