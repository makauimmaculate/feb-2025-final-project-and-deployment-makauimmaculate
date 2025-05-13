// cart.js - Display cart items from localStorage

document.addEventListener('DOMContentLoaded', function() {
  // Sample product data (should match products.js)
  const products = [
    {
      id: 1,
      name: 'Wireless Headphones',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 2,
      name: 'Smart Watch',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 3,
      name: 'Bluetooth Speaker',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 4,
      name: 'Laptop Stand',
      price: 19.99,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80'
    }
  ];

  // Get cart from localStorage (object: {id: quantity})
  let cart = JSON.parse(localStorage.getItem('cartItems') || '{}');
  const cartItemsDiv = document.getElementById('cart-items');
  const emptyMsg = document.getElementById('cart-empty-message');

  function renderCart() {
    cart = JSON.parse(localStorage.getItem('cartItems') || '{}');
    cartItemsDiv.innerHTML = '';
    let total = 0;
    let hasItems = false;
    products.forEach(product => {
      const qty = cart[product.id] || 0;
      if (qty > 0) {
        hasItems = true;
        total += product.price * qty;
        cartItemsDiv.innerHTML += `
          <div class="product-card" style="display:flex;align-items:center;gap:1em;margin-bottom:1em;">
            <img src="${product.image}" alt="${product.name}" style="width:80px;height:80px;object-fit:cover;border-radius:6px;">
            <div style="flex:1;">
              <h2 style="margin:0;">${product.name}</h2>
              <p style="margin:0.2em 0;">$${product.price.toFixed(2)} x ${qty}</p>
              <button class="remove-item" data-id="${product.id}">Remove</button>
            </div>
          </div>
        `;
      }
    });
    if (!hasItems) {
      emptyMsg.style.display = 'block';
    } else {
      emptyMsg.style.display = 'none';
      cartItemsDiv.innerHTML += `<div style="margin-top:1em;font-weight:bold;">Total: $${total.toFixed(2)}</div>`;
    }
  }

  // Remove item from cart
  cartItemsDiv.addEventListener('click', function(e) {
    if (e.target.classList.contains('remove-item')) {
      const id = e.target.getAttribute('data-id');
      cart[id] = 0;
      localStorage.setItem('cartItems', JSON.stringify(cart));
      // Update cart count
      let count = 0;
      Object.values(cart).forEach(qty => count += qty);
      localStorage.setItem('cartCount', count);
      document.querySelectorAll('#cart-count').forEach(el => el.textContent = count);
      renderCart();
    }
  });

  renderCart();
});
