type OriginalProduct = {
  name: string;
  description: string;
  tax: number;
  image: string;
  price: string;
  categoryName: string;
  productId: number;
  categoryId: number;
};

type OriginalCustomer = {
  id: number;
  name: string;
  phoneNumber: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

type Cart = {
  customerId: number;
  discountTotal: number;
  coupon: {
    code: string;
    value: number;
  };
  note: string;
  products: Product[];
  tax: number;
  totalPrice: number;
  subTotal: number;
};

type Customer = { id: number; name: string; phone: string };
