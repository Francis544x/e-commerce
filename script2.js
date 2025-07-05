 
    // Shopping cart functionality
    let cart = [];
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');
    const clearCartBtn = document.getElementById('clearCart');
    
    // Add to cart event listeners
    document.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', () => {
        const id = button.dataset.id;
        const name = button.dataset.name;
        const price = parseFloat(button.dataset.price);
        
        addToCart(id, name, price);
        updateCartUI();
      });
    });
    
    // Clear cart
    clearCartBtn.addEventListener('click', () => {
      cart = [];
      updateCartUI();
    });
    
    // Add item to cart
    function addToCart(id, name, price) {
      // Check if item already exists in cart
      const existingItem = cart.find(item => item.id === id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({
          id,
          name,
          price,
          quantity: 1
        });
      }
    }
    
    // Remove item from cart
    function removeFromCart(id) {
      const itemIndex = cart.findIndex(item => item.id === id);
      
      if (itemIndex !== -1) {
        cart.splice(itemIndex, 1);
        updateCartUI();
      }
    }
    
    // Update item quantity
    function updateQuantity(id, change) {
      const item = cart.find(item => item.id === id);
      
      if (item) {
        item.quantity += change;
        
        // Remove item if quantity is zero
        if (item.quantity <= 0) {
          removeFromCart(id);
          return;
        }
        
        updateCartUI();
      }
    }
    
    // Update cart UI
    function updateCartUI() {
      // Update cart count
      const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
      cartCount.textContent = totalItems;
      
      // Update cart items
      if (cart.length === 0) {
        cartItems.innerHTML = `
          <div class="empty-cart-message">
            <i class="fas fa-shopping-cart"></i>
            <p>Your cart is empty</p>
            <p>Add some delicious deserts!</p>
          </div>
        `;
      } else {
        cartItems.innerHTML = '';
        cart.forEach(item => {
          const itemTotal = (item.price * item.quantity).toFixed(2);
          const cartItemElement = document.createElement('div');
          cartItemElement.className = 'cart-item';
          cartItemElement.innerHTML = `
            <div class="item-info">
              <div class="item-name">${item.name}</div>
              <div class="item-price">$${item.price.toFixed(2)}</div>
              <div class="item-quantity">
                <button class="quantity-btn" onclick="updateQuantity('${item.id}', -1)">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
              </div>
            </div>
            <div class="item-total">$${itemTotal}</div>
            <button class="remove-item" onclick="removeFromCart('${item.id}')">
              <i class="fas fa-times"></i>
            </button>
          `;
          cartItems.appendChild(cartItemElement);
        });
      }
      
      // Update cart total
      const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      cartTotal.textContent = `$${total.toFixed(2)}`;
    }
    
    // Expose functions to global scope for HTML onclick
    window.updateQuantity = updateQuantity;
    window.removeFromCart = removeFromCart;
