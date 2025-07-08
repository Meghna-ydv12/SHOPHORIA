// Splash Animation
window.addEventListener('DOMContentLoaded', function() {
  const splash = document.getElementById('splash');
  setTimeout(() => {
    splash.style.transition = 'all 0.7s cubic-bezier(.4,2,.6,1)';
    splash.style.opacity = 0;
    splash.style.transform = 'translateY(-60px)';
    setTimeout(() => {
      splash.style.display = 'none';
      document.getElementById('site-content').classList.remove('hidden');
    }, 700);
  }, 3500);
});

// Profile dropdown (fixed logic)
const profileIcon = document.getElementById('profile-icon');
const profileDropdown = document.getElementById('profile-dropdown');
const logoutBtn = document.getElementById('logout-btn');
const viewProfile = document.getElementById('view-profile');

// Show/hide dropdown on icon click
profileIcon && profileIcon.addEventListener('click', function(e) {
  e.stopPropagation();
  profileDropdown.classList.toggle('show');
  profileDropdown.classList.remove('hidden');
});

// Hide dropdown when clicking outside
document.addEventListener('click', function() {
  if (profileDropdown) profileDropdown.classList.remove('show');
});

// Prevent dropdown from closing when clicking inside it
profileDropdown && profileDropdown.addEventListener('click', function(e) {
  e.stopPropagation();
});

// --- Simple Local Auth Demo (NO backend, for demo only) ---
function showAuthModal() {
  document.getElementById('auth-modal').classList.add('show');
  document.getElementById('site-content').classList.add('blur-bg');
  document.body.style.overflow = 'hidden';
}
function hideAuthModal() {
  document.getElementById('auth-modal').classList.remove('show');
  document.getElementById('site-content').classList.remove('blur-bg');
  document.body.style.overflow = '';
  document.getElementById('auth-error').textContent = '';
}

// Tabs
const tabLogin = document.getElementById('tab-login');
const tabSignup = document.getElementById('tab-signup');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');

tabLogin.onclick = () => {
  tabLogin.classList.add('active');
  tabSignup.classList.remove('active');
  loginForm.style.display = '';
  signupForm.style.display = 'none';
  document.getElementById('auth-error').textContent = '';
};
tabSignup.onclick = () => {
  tabSignup.classList.add('active');
  tabLogin.classList.remove('active');
  signupForm.style.display = '';
  loginForm.style.display = 'none';
  document.getElementById('auth-error').textContent = '';
};

// Close modal
document.getElementById('close-auth-modal').onclick = hideAuthModal;
window.onclick = function(e) {
  if (e.target === document.getElementById('auth-modal')) hideAuthModal();
};

// Auth state
function isLoggedIn() {
  return !!localStorage.getItem('shophoria_user');
}
function getCurrentUser() {
  const u = localStorage.getItem('shophoria_user');
  return u ? JSON.parse(u) : null;
}
function updateProfileUI() {
  const user = getCurrentUser();
  const profileIcon = document.getElementById('profile-icon');
  if (user) {
    // Use first letter of username for avatar
    profileIcon.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username.charAt(0).toUpperCase())}&background=fbb1b1&color=fff&rounded=true&size=32`;
  } else {
    profileIcon.src = "https://ui-avatars.com/api/?name=U&background=fbb1b1&color=fff&rounded=true&size=32";
  }
}

// On page load, check login
window.addEventListener('DOMContentLoaded', function() {
  setTimeout(() => {
    if (!isLoggedIn()) {
      showAuthModal();
    } else {
      updateProfileUI();
    }
  }, 3700); // after splash
});

// Login
loginForm.onsubmit = function(e) {
  e.preventDefault();
  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value;
  const stored = localStorage.getItem('shophoria_account_' + username);
  if (!stored) {
    document.getElementById('auth-error').textContent = "User not found!";
    return;
  }
  const user = JSON.parse(stored);
  if (user.password !== password) {
    document.getElementById('auth-error').textContent = "Incorrect password!";
    return;
  }
  localStorage.setItem('shophoria_user', JSON.stringify({ username }));
  updateProfileUI();
  hideAuthModal();
  location.reload();
};

// Signup
signupForm.onsubmit = function(e) {
  e.preventDefault();
  const username = document.getElementById('signup-username').value.trim();
  const password = document.getElementById('signup-password').value;
  if (!username || !password) {
    document.getElementById('auth-error').textContent = "All fields required!";
    return;
  }
  if (localStorage.getItem('shophoria_account_' + username)) {
    document.getElementById('auth-error').textContent = "Username already exists!";
    return;
  }
  localStorage.setItem('shophoria_account_' + username, JSON.stringify({ username, password }));
  localStorage.setItem('shophoria_user', JSON.stringify({ username }));
  updateProfileUI();
  hideAuthModal();
  location.reload();
};

// Logout
document.getElementById('logout-btn').onclick = function(e) {
  e.preventDefault();
  localStorage.removeItem('shophoria_user');
  updateProfileUI();
  showAuthModal();
};

// Profile dropdown: hide if not logged in
const profileMenu = document.getElementById('profile-menu');
if (profileMenu) {
  profileMenu.onclick = function() {
    if (!isLoggedIn()) {
      showAuthModal();
      return false;
    }
  };
}

// Prevent site interaction if not logged in
document.getElementById('site-content').addEventListener('click', function(e) {
  if (!isLoggedIn()) {
    showAuthModal();
    e.stopPropagation();
    e.preventDefault();
    return false;
  }
}, true);

viewProfile && viewProfile.addEventListener('click', function(e) {
  e.preventDefault();
  alert('Profile page coming soon!');
  if (profileDropdown) profileDropdown.classList.remove('show');
});

// Smooth scroll for "Shop Now" button
document.getElementById('shop-now-btn').addEventListener('click', function(e) {
  e.preventDefault();
  document.getElementById('shop-by-category').scrollIntoView({ behavior: 'smooth' });
});

// Product grid, cart, wishlist, and search
function getSampleProducts() {
  return [
    {
      _id: '1',
      title: 'Wireless Bluetooth Headphones (Pastel Pink)',
      image: 'headphones.png',
      price: 49.99
    },
    {
      _id: '2',
      title: 'Smart Watch (Mint Green Strap)',
      image: 'watch.png',
      price: 89.99
    },
    {
      _id: '3',
      title: 'Cotton T-Shirt - Pastel Blue',
      image: 'tshirt.png',
      price: 24.99
    },
    {
      _id: '4',
      title: 'Non-Stick Cookware Set (Pastel Yellow)',
      image: 'cookware.png',
      price: 129.99
    },
    {
      _id: '5',
      title: 'Professional Hair Dryer (Lilac)',
      image: 'dryer.png',
      price: 42.49
    },
    {
      _id: '6',
      title: 'Pet Bed (Soft Peach)',
      image: 'bed.png',
      price: 39.99
    },
    {
      _id: '7',
      title: 'Kids Wooden Toy Set (Pastel Mix)',
      image: 'wooden.png',
      price: 29.99
    },
    {
      _id: '8',
      title: 'Pastel Stationery Gift Box',
      image: 'gift.png',
      price: 19.99
    },
    {
      _id: '9',
      title: 'Watercolor Art Kit (Beginner)',
      image: 'kit.png',
      price: 34.99
    },
    {
      _id: '10',
      title: 'Yoga Mat (Pastel Green)',
      image: 'mat.png',
      price: 22.99
    },
    {
      _id: '11',
      title: 'Minimalist Jewellery Set (Rose Gold)',
      image: 'jewellery.png',
      price: 59.99
    },
    {
      _id: '12',
      title: 'Inspirational Books Bundle',
      image: 'bundle.png',
      price: 44.99
    }
  ];
}
function loadProducts() {
  const products = getSampleProducts();
  const grid = document.getElementById('product-grid');
  if (!grid) return;
  grid.innerHTML = '';
  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.id = product._id;
    card.innerHTML = `
      <div class="product-img" style="background-image:url('${product.image}')">
        <div class="product-wishlist"><i class="far fa-heart"></i></div>
      </div>
      <div class="product-info">
        <h3 class="product-title">${product.title}</h3>
        <div class="product-rating">
          <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>
          <span>(100+)</span>
        </div>
        <div class="product-price">$${product.price.toFixed(2)}</div>
        <button class="add-to-cart"><i class="fas fa-shopping-cart"></i> Add to Cart</button>
      </div>
    `;
    grid.appendChild(card);
  });
  addCartListeners();
  addWishlistListeners();
}
loadProducts();

// Cart
let cart = [];
function addCartListeners() {
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.onclick = function() {
      const card = btn.closest('.product-card');
      const id = card.dataset.id;
      const title = card.querySelector('.product-title').textContent;
      const price = parseFloat(card.querySelector('.product-price').textContent.replace('$',''));
      const image = card.querySelector('.product-img').style.backgroundImage.split('"')[1];
      const found = cart.find(item => item.id === id);
      if (found) found.qty++;
      else cart.push({id, title, price, image, qty: 1});
      document.getElementById('cart-count').textContent = cart.reduce((a, b) => a + b.qty, 0);
    };
  });
}
const cartModal = document.getElementById('cart-modal');
const cartBtn = document.getElementById('cart-btn');
const closeCartModal = document.getElementById('close-cart-modal');
cartBtn && (cartBtn.onclick = () => { renderCart(); cartModal.style.display = 'flex'; });
closeCartModal && (closeCartModal.onclick = () => cartModal.style.display = 'none');
window.onclick = e => { if (e.target === cartModal) cartModal.style.display = 'none'; };
function renderCart() {
  const itemsDiv = document.getElementById('cart-items');
  if (!itemsDiv) return;
  itemsDiv.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.qty;
    itemsDiv.innerHTML += `
      <div style="display:flex;align-items:center;gap:1em;margin-bottom:1em;">
        <img src="${item.image}" alt="" style="width:50px;height:50px;object-fit:cover;border-radius:7px;">
        <span>${item.title}</span>
        <span>Qty: ${item.qty}</span>
        <span>$${(item.price*item.qty).toFixed(2)}</span>
        <button onclick="removeFromCart('${item.id}')">Remove</button>
      </div>
    `;
  });
  const cartTotal = document.getElementById('cart-total');
  if (cartTotal) cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}
window.removeFromCart = function(id) {
  cart = cart.filter(item => item.id !== id);
  document.getElementById('cart-count').textContent = cart.reduce((a, b) => a + b.qty, 0);
  renderCart();
};

// Wishlist
function addWishlistListeners() {
  document.querySelectorAll('.product-wishlist').forEach(btn => {
    btn.onclick = function() {
      btn.classList.toggle('active');
      const icon = btn.querySelector('i');
      if (btn.classList.contains('active')) {
        icon.classList.remove('far');
        icon.classList.add('fas');
      } else {
        icon.classList.remove('fas');
        icon.classList.add('far');
      }
    };
  });
}

// Search
document.getElementById('search-btn').onclick = function(e) {
  e.preventDefault();
  const query = document.getElementById('search-input').value.toLowerCase();
  const products = getSampleProducts().filter(product =>
    product.title.toLowerCase().includes(query)
  );
  const grid = document.getElementById('product-grid');
  if (!grid) return;
  grid.innerHTML = '';
  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.id = product._id;
    card.innerHTML = `
      <div class="product-img" style="background-image:url('${product.image}')">
        <div class="product-wishlist"><i class="far fa-heart"></i></div>
      </div>
      <div class="product-info">
        <h3 class="product-title">${product.title}</h3>
        <div class="product-rating">
          <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>
          <span>(100+)</span>
        </div>
        <div class="product-price">$${product.price.toFixed(2)}</div>
        <button class="add-to-cart"><i class="fas fa-shopping-cart"></i> Add to Cart</button>
      </div>
    `;
    grid.appendChild(card);
  });
  addCartListeners();
  addWishlistListeners();
};
