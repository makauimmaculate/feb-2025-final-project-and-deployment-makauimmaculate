// products.js - Sample product data and rendering for ShopHome

document.addEventListener('DOMContentLoaded', function() {
  const products = [
    {
      id: 1,
      name: 'Wireless Headphones',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=400&q=80',
      description: 'High-quality wireless headphones with noise cancellation.'
    },
    {
      id: 2,
      name: 'Smart Watch',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=400&q=80',
      description: 'Track your fitness and notifications on the go.'
    },
    {
      id: 3,
      name: 'Bluetooth Speaker',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=400&q=80',
      description: 'Portable speaker with deep bass and long battery life.'
    },
    {
      id: 4,
      name: 'Laptop Stand',
      price: 19.99,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80',
      description: 'Ergonomic stand for laptops up to 17 inches.'
    },
    {
      id: 5,
      name: '4K Action Camera',
      price: 119.99,
      image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
      description: 'Capture your adventures in stunning 4K resolution.'
    },
    {
      id: 6,
      name: 'Gaming Mouse',
      price: 39.99,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80',
      description: 'Precision gaming mouse with customizable buttons.'
    },
    {
      id: 7,
      name: 'Mechanical Keyboard',
      price: 69.99,
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80',
      description: 'RGB backlit mechanical keyboard for fast typing.'
    },
    {
      id: 8,
      name: 'Smartphone Gimbal',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
      description: 'Stabilize your smartphone videos with ease.'
    }
  ];

  const grid = document.getElementById('productGrid');
  if (grid) {
    grid.innerHTML = products.map(product => `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}">
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <p><strong>$${product.price.toFixed(2)}</strong></p>
        <div class="product-actions">
          <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
          <button class="buy-now" data-id="${product.id}">Buy Now</button>
        </div>
        <div class="buy-options-modal" id="buy-options-modal-${product.id}" style="display:none;">
          <div class="buy-options-content">
            <h3>Choose Payment Method</h3>
            <button class="pay-option" data-method="mpesa" data-id="${product.id}"><img src="https://upload.wikimedia.org/wikipedia/commons/4/4e/M-PESA_LOGO-01.svg" alt="M-Pesa" style="height:1.2em;vertical-align:middle;"> M-Pesa</button>
            <button class="pay-option" data-method="card" data-id="${product.id}"><img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Card" style="height:1.2em;vertical-align:middle;"> Card</button>
            <button class="pay-option" data-method="paypal" data-id="${product.id}"><img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" style="height:1.2em;vertical-align:middle;"> PayPal</button>
            <button class="close-buy-options" data-id="${product.id}">Cancel</button>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Add to cart logic (simple localStorage demo)
  if (grid) {
    grid.addEventListener('click', function(e) {
      if (e.target.classList.contains('add-to-cart')) {
        const id = e.target.getAttribute('data-id');
        // Update cartItems in localStorage
        let cart = JSON.parse(localStorage.getItem('cartItems') || '{}');
        cart[id] = (cart[id] || 0) + 1;
        localStorage.setItem('cartItems', JSON.stringify(cart));
        // Update cartCount
        let count = 0;
        Object.values(cart).forEach(qty => count += qty);
        localStorage.setItem('cartCount', count);
        document.querySelectorAll('#cart-count').forEach(el => el.textContent = count);
        e.target.textContent = 'Added!';
        setTimeout(() => { e.target.textContent = 'Add to Cart'; }, 1000);
      }
      if (e.target.classList.contains('buy-now')) {
        const id = e.target.getAttribute('data-id');
        document.querySelectorAll('.buy-options-modal').forEach(opt => opt.style.display = 'none');
        const modal = document.getElementById('buy-options-modal-' + id);
        if (modal) modal.style.display = 'flex';
      }
      if (e.target.classList.contains('close-buy-options')) {
        const id = e.target.getAttribute('data-id');
        const modal = document.getElementById('buy-options-modal-' + id);
        if (modal) modal.style.display = 'none';
      }
      if (e.target.classList.contains('pay-option')) {
        const method = e.target.getAttribute('data-method');
        const id = e.target.getAttribute('data-id');
        let cart = JSON.parse(localStorage.getItem('cartItems') || '{}');
        cart[id] = (cart[id] || 0) + 1;
        localStorage.setItem('cartItems', JSON.stringify(cart));
        let count = 0;
        Object.values(cart).forEach(qty => count += qty);
        localStorage.setItem('cartCount', count);
        document.querySelectorAll('#cart-count').forEach(el => el.textContent = count);
        alert('Proceeding to pay with ' + (method === 'mpesa' ? 'M-Pesa' : method.charAt(0).toUpperCase() + method.slice(1)) + ' for 1 item. (Demo only)');
        const modal = document.getElementById('buy-options-modal-' + id);
        if (modal) modal.style.display = 'none';
      }
    });
  }
});
