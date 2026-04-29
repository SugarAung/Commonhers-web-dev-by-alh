/* Commenhers — Compare (localStorage) */

const COMPARE_KEY = 'commenhers_compare';
const COMPARE_MAX = 3;

function getCompare() {
  return JSON.parse(localStorage.getItem(COMPARE_KEY) || '[]');
}

function saveCompare(list) {
  localStorage.setItem(COMPARE_KEY, JSON.stringify(list));
}

function isInCompare(id) {
  return getCompare().some(i => i.id === id);
}

function toggleCompare(data) {
  const list = getCompare();
  const idx = list.findIndex(i => i.id === data.id);
  if (idx >= 0) {
    list.splice(idx, 1);
  } else {
    if (list.length >= COMPARE_MAX) {
      alert('You can compare up to 3 products. Remove one first.');
      return;
    }
    list.push({
      id: data.id,
      name: data.name,
      price: Number(data.price),
      image: data.image || '',
      category: data.category || '',
      soldOut: data.soldout === 'true'
    });
  }
  saveCompare(list);
}

function updateCompareButtons() {
  document.querySelectorAll('.btn-compare').forEach(btn => {
    const active = isInCompare(btn.dataset.id);
    btn.classList.toggle('active', active);
    btn.title = active ? 'Remove from compare' : 'Add to compare';
    btn.style.color = active ? 'var(--color-primary, #2e7d32)' : '';
  });
}

/* Compare page rendering */
document.addEventListener('DOMContentLoaded', () => {
  const section = document.querySelector('.compare-table-section');
  if (!section) return;

  function render() {
    const list = getCompare();
    if (!list.length) {
      section.innerHTML = `
        <div class="empty-state">
          <i class="fas fa-balance-scale"></i>
          <h2>Compare list is empty.</h2>
          <p>Browse the shop and add items to compare.</p>
          <a href="shop.html" class="btn btn-primary">Return to Shop</a>
        </div>`;
      return;
    }

    section.innerHTML = `
      <style>
        .compare-table { width:100%; border-collapse:collapse; }
        .compare-table th, .compare-table td { padding:14px 16px; text-align:center; border-bottom:1px solid #eee; vertical-align:middle; }
        .compare-table th { background:#f9f9f9; font-weight:700; }
        .compare-table td:first-child, .compare-table th:first-child { text-align:left; width:130px; font-weight:600; color:#555; }
      </style>
      <div style="overflow-x:auto;">
        <table class="compare-table">
          <thead>
            <tr>
              <th></th>
              ${list.map(p => `<th>${p.name}<br><button class="btn-remove-compare" data-id="${p.id}" style="font-size:0.75rem;margin-top:6px;background:none;border:none;color:#c00;cursor:pointer;text-decoration:underline;">Remove</button></th>`).join('')}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Image</td>
              ${list.map(p => `<td>${p.image ? `<img src="${p.image}" alt="${p.name}" style="width:120px;height:120px;object-fit:cover;border-radius:4px;">` : `<div class="img-placeholder" style="min-height:120px;">[ image ]</div>`}</td>`).join('')}
            </tr>
            <tr>
              <td>Price</td>
              ${list.map(p => `<td class="product-price">$${Number(p.price).toFixed(2)}</td>`).join('')}
            </tr>
            <tr>
              <td>Category</td>
              ${list.map(p => `<td style="text-transform:capitalize;">${p.category || '—'}</td>`).join('')}
            </tr>
            <tr>
              <td>Availability</td>
              ${list.map(p => `<td>${p.soldOut ? '<span style="color:#c00;font-weight:700;">Sold Out</span>' : '<span style="color:#2e7d32;font-weight:700;">In Stock</span>'}</td>`).join('')}
            </tr>
            <tr>
              <td></td>
              ${list.map(p => `<td>${p.soldOut
                ? '<button class="btn btn-primary" disabled style="width:100%;opacity:0.5;cursor:not-allowed;">Sold Out</button>'
                : `<button class="btn-add-cart-cmp btn btn-primary" data-id="${p.id}" data-name="${p.name}" data-price="${p.price}" data-image="${p.image}" style="width:100%;">Add to Cart</button>`
              }</td>`).join('')}
            </tr>
          </tbody>
        </table>
      </div>`;

    section.querySelectorAll('.btn-remove-compare').forEach(btn => {
      btn.addEventListener('click', () => {
        saveCompare(getCompare().filter(i => i.id !== btn.dataset.id));
        render();
      });
    });

    section.querySelectorAll('.btn-add-cart-cmp').forEach(btn => {
      btn.addEventListener('click', () => {
        addToCart(btn.dataset.id, btn.dataset.name, btn.dataset.price, btn.dataset.image);
        btn.textContent = 'Added!';
        setTimeout(() => { btn.textContent = 'Add to Cart'; }, 1500);
      });
    });
  }

  render();
});
