/* Commenhers — My Account */

document.addEventListener('DOMContentLoaded', () => {
  const authSection   = document.getElementById('account-auth');
  const dashSection   = document.getElementById('account-dashboard');
  const customerName  = document.getElementById('account-name');
  const customerEmail = document.getElementById('account-email');
  const ordersBody    = document.getElementById('orders-tbody');
  const noOrders      = document.getElementById('no-orders');

  function showDashboard(customer, orders) {
    authSection.style.display = 'none';
    dashSection.style.display = 'block';
    customerName.textContent  = customer.name;
    customerEmail.textContent = customer.email;

    if (!orders.length) {
      ordersBody.closest('table').style.display = 'none';
      noOrders.style.display = 'block';
      return;
    }

    ordersBody.innerHTML = orders.map(o => {
      const date   = new Date(o.createdAt).toLocaleDateString('en-SG', { day: 'numeric', month: 'short', year: 'numeric' });
      const items  = o.items.map(i => `${i.name} ×${i.qty}`).join(', ');
      const badge  = `<span class="order-status order-status--${o.status}">${o.status}</span>`;
      return `<tr>
        <td>#${o.id}</td>
        <td>${date}</td>
        <td class="order-items-cell">${items}</td>
        <td>$${Number(o.total).toFixed(2)}</td>
        <td>${badge}</td>
      </tr>`;
    }).join('');
  }

  function showError(formId, msg) {
    const el = document.getElementById(formId + '-error');
    if (el) { el.textContent = msg; el.style.display = 'block'; }
  }

  function clearError(formId) {
    const el = document.getElementById(formId + '-error');
    if (el) { el.textContent = ''; el.style.display = 'none'; }
  }

  function setLoading(btn, loading) {
    btn.disabled = loading;
    btn.textContent = loading ? 'Please wait…' : btn.dataset.label;
  }

  /* Check session on load */
  fetch('/api/customer/me')
    .then(r => r.json())
    .then(data => {
      if (data.customer) showDashboard(data.customer, data.orders);
    })
    .catch(() => {});

  /* Login */
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', async e => {
      e.preventDefault();
      clearError('login');
      const btn = loginForm.querySelector('[type="submit"]');
      setLoading(btn, true);
      try {
        const res  = await fetch('/api/customer/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email:    loginForm.email.value.trim(),
            password: loginForm.password.value
          })
        });
        const data = await res.json();
        if (!res.ok) { showError('login', data.error); return; }
        const me = await fetch('/api/customer/me').then(r => r.json());
        showDashboard(me.customer, me.orders);
      } catch {
        showError('login', 'Something went wrong. Please try again.');
      } finally {
        setLoading(btn, false);
      }
    });
  }

  /* Register */
  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', async e => {
      e.preventDefault();
      clearError('register');
      const btn = registerForm.querySelector('[type="submit"]');
      setLoading(btn, true);
      try {
        const res  = await fetch('/api/customer/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name:     registerForm.fullname.value.trim(),
            email:    registerForm.email.value.trim(),
            password: registerForm.password.value
          })
        });
        const data = await res.json();
        if (!res.ok) { showError('register', data.error); return; }
        const me = await fetch('/api/customer/me').then(r => r.json());
        showDashboard(me.customer, me.orders);
      } catch {
        showError('register', 'Something went wrong. Please try again.');
      } finally {
        setLoading(btn, false);
      }
    });
  }

  /* Logout */
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      await fetch('/api/customer/logout', { method: 'POST' });
      dashSection.style.display = 'none';
      authSection.style.display = 'block';
    });
  }
});
