 // Shopping cart functionality
    let cart = [];
    const cartCount = document.getElementById('cartCount');
    
    // Add to cart event listeners
    document.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', () => {
        const id = button.dataset.id;
        const name = button.dataset.name;
        const price = parseFloat(button.dataset.price);
        
        addToCart(id, name, price);
        
        // Visual feedback
        button.innerHTML = '<i class="fas fa-check"></i> Added';
        button.style.background = '#28a745';
        setTimeout(() => {
          button.innerHTML = '<i class="fas fa-plus"></i> Add';
          button.style.background = '';
        }, 2000);
      });
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
      
      // Update cart count
      updateCartCount();
      
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(cart));
    }
    
    // Update cart count
    function updateCartCount() {
      const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
      cartCount.textContent = totalItems;
    }
    
    // Initialize cart from localStorage
    function initCart() {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
      }
    }
    
    // Initialize
    initCart();
    
    // Cart icon click
    document.getElementById('cartIcon').addEventListener('click', () => {
      alert('Cart functionality would open here. In a real implementation, this would open a cart sidebar with all items.');
    });