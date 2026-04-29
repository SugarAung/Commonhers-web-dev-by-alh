/* Commenhers — Wishlist (localStorage) */

const WISHLIST_KEY = 'commenhers_wishlist';

function getWishlist() {
  return JSON.parse(localStorage.getItem(WISHLIST_KEY) || '[]');
}

function saveWishlist(list) {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(list));
}

function isInWishlist(id) {
  return getWishlist().some(i => i.id === id);
}

function toggleWishlist(data) {
  const list = getWishlist();
  const idx = list.findIndex(i => i.id === data.id);
  if (idx >= 0) {
    list.splice(idx, 1);
  } else {
    list.push({ id: data.id, name: data.name, price: Number(data.price), image: data.image || '' });
  }
  saveWishlist(list);
}

function updateWishlistButtons() {
  document.querySelectorAll('.btn-wishlist').forEach(btn => {
    const active = isInWishlist(btn.dataset.id);
    btn.classList.toggle('active', active);
    const icon = btn.querySelector('i');
    if (icon) icon.className = active ? 'fas fa-heart' : 'far fa-heart';
    btn.style.color = active ? '#e53935' : '';
  });
}

/* Wishlist page rendering */
document.addEventListener('DOMContentLoaded', () => {
  const section = document.querySelector('.wishlist-grid-section');
  if (!section) return;

  function render() {
    const list = getWishlist();
    if (!list.length) {
      section.innerHTML = `
        <div class="empty-state">
          <i class="far fa-heart"></i>
          <h2>Your wishlist is empty.</h2>
          <p>Browse the shop and heart the pieces you love.</p>
          <a href="shop.html" class="btn btn-primary">Return to Shop</a>
        </div>`;
      return;
    }
    section.innerHTML = `<div class="product-grid">${list.map(p => `
      <div class="product-card">
        <div class="product-card-img">
          ${p.image
            ? `<img src="${p.image}" alt="${p.name}" style="width:100%;height:240px;object-fit:cover;border-radius:0;">`
            : `<div class="img-placeholder" style="min-height:240px;border-radius:0;">[ Product image ]</div>`}
        </div>
        <div class="product-card-body">
          <h3>${p.name}</h3>
          <p class="product-price">$${Number(p.price).toFixed(2)}</p>
          <div style="display:flex;gap:8px;margin-top:8px;">
            <button class="btn-add-cart-wl btn-add-cart" data-id="${p.id}" data-name="${p.name}" data-price="${p.price}" data-image="${p.image}">Add to Cart</button>
            <button class="btn-remove-wishlist" data-id="${p.id}" style="background:#fff;border:1px solid #ddd;color:#c00;padding:0 14px;cursor:pointer;border-radius:4px;" aria-label="Remove from wishlist"><i class="fas fa-trash-alt"></i></button>
          </div>
        </div>
      </div>`).join('')}</div>`;

    section.querySelectorAll('.btn-add-cart-wl').forEach(btn => {
      btn.addEventListener('click', () => {
        addToCart(btn.dataset.id, btn.dataset.name, btn.dataset.price, btn.dataset.image);
        btn.textContent = 'Added!';
        setTimeout(() => { btn.textContent = 'Add to Cart'; }, 1500);
      });
    });

    section.querySelectorAll('.btn-remove-wishlist').forEach(btn => {
      btn.addEventListener('click', () => {
        saveWishlist(getWishlist().filter(i => i.id !== btn.dataset.id));
        render();
      });
    });
  }

  render();
});
