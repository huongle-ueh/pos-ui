import React from 'react';
import './ProductList.css';

function ProductList({
  cartItems,
  products,
  addToCart,
}: {
  cartItems: Product[];
  products: any[];
  addToCart: (product: any) => void;
}) {

  const handleClick = (product: any) => {
    addToCart(product);
    const productImg = document.querySelector(`#product-${product.id}`);
    const cartPosition = { x: window.innerWidth - 50, y: 50 }; // Adjust position as needed
    if (productImg) {
            const productImgRect = productImg.getBoundingClientRect();
            const flyingImg: HTMLImageElement = productImg.cloneNode(true) as HTMLImageElement;
            flyingImg.classList.add('flying-img');
            flyingImg.style.top = productImgRect.top + 'px';
            flyingImg.style.left = productImgRect.left + 'px';
            document.body.appendChild(flyingImg);
            setTimeout(() => {
                flyingImg.style.top = cartPosition.y + 'px';
                flyingImg.style.left = cartPosition.x + 'px';
                flyingImg.style.transform = 'translate(-50%, -50%) scale(0.5)';
            }, 50);
        
            setTimeout(() => {
                flyingImg.remove();
            }, 1000);
    }
  };

  return (
    <div className="product-grid">
    {products.map((product) => (
        <div key={product.id} className="product-item" onClick={() => handleClick(product)}>
            <img
                src={`assets/${product.id}.png`}
                alt={product.name}
                className="product-image"
                id={`product-${product.id}`} 
            />
            <h3 className="product-title">{product.name}</h3>
            <div className="product-price">${product.price}</div>
                {cartItems.find((item) => item.id === product.id) ? (
                        <div className="product-quantity">x{cartItems.find((item) => item.id === product.id)?.quantity}</div>
                ): null}
        </div>
    ))}
    </div>
  );
}

export default ProductList;
