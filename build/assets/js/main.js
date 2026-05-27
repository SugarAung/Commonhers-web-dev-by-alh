/* Commenhers — Main JS */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Mobile Nav ---- */
  const hamburger = document.querySelector('.hamburger');
  const drawer = document.querySelector('.mobile-nav-drawer');

  if (hamburger && drawer) {
    hamburger.addEventListener('click', () => {
      const open = hamburger.classList.toggle('open');
      drawer.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });

    drawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        drawer.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---- Scroll shrink header ---- */
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---- Formspree AJAX ---- */
  document.querySelectorAll('form[data-formspree]').forEach(form => {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      const msg = form.querySelector('.form-status');
      const originalLabel = btn.dataset.label || 'Submit';
      btn.disabled = true;
      btn.textContent = 'Sending…';
      msg.textContent = '';
      msg.className = 'form-status';
      try {
        const res = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' }
        });
        if (res.ok) {
          form.reset();
          msg.textContent = 'Message sent! We\'ll be in touch soon.';
          msg.className = 'form-status success';
        } else {
          throw new Error();
        }
      } catch {
        msg.textContent = 'Something went wrong. Please try again or email commenhers@gmail.com.';
        msg.className = 'form-status error';
      } finally {
        btn.disabled = false;
        btn.textContent = originalLabel;
      }
    });
  });

  /* ---- Shop Product Grid ---- */
  const productGrid = document.getElementById('product-grid');
  if (productGrid) {
    fetch('/api/products')
      .then(r => r.json())
      .then(products => {
        const countEl = document.getElementById('product-count');
        if (countEl) countEl.textContent = products.length;
        if (!products.length) {
          productGrid.innerHTML = '<p class="product-grid-msg">No products found.</p>';
          return;
        }
        productGrid.innerHTML = products.map(p => `
          <div class="product-card">
            <div class="product-card-img">
              ${p.image
                ? `<img src="${p.image}" alt="${p.name}">`
                : `<div class="img-placeholder">[ Product image ]</div>`}
              ${p.soldOut ? '<span class="product-badge sold-out">Sold out</span>' : ''}
              <div class="product-card-actions">
                <button class="btn-wishlist" data-id="${p.id}" data-name="${p.name}" data-price="${p.price}" data-image="${p.image || ''}" aria-label="Add to wishlist">
                  <i class="far fa-heart"></i>
                </button>
                <button class="btn-compare" data-id="${p.id}" data-name="${p.name}" data-price="${p.price}" data-image="${p.image || ''}" data-category="${p.category || ''}" data-soldout="${p.soldOut || false}" aria-label="Add to compare" title="Add to compare">
                  <i class="fas fa-balance-scale"></i>
                </button>
              </div>
            </div>
            <div class="product-card-body">
              <h3>${p.name}</h3>
              <p class="product-price">$${Number(p.price).toFixed(2)}</p>
              ${p.soldOut
                ? '<button class="btn-add-cart" disabled>Sold Out</button>'
                : `<button class="btn-add-cart" data-id="${p.id}" data-name="${p.name}" data-price="${p.price}" data-image="${p.image || ''}">Add to Cart</button>`}
            </div>
          </div>
        `).join('');
        if (typeof updateWishlistButtons === 'function') updateWishlistButtons();
        if (typeof updateCompareButtons === 'function') updateCompareButtons();
      })
      .catch(() => {
        productGrid.innerHTML = '<p class="product-grid-msg">Unable to load products. Please refresh.</p>';
      });

    productGrid.addEventListener('click', e => {
      const cartBtn = e.target.closest('.btn-add-cart');
      if (cartBtn && !cartBtn.disabled) {
        addToCart(cartBtn.dataset.id, cartBtn.dataset.name, cartBtn.dataset.price, cartBtn.dataset.image);
        cartBtn.textContent = 'Added!';
        setTimeout(() => { cartBtn.textContent = 'Add to Cart'; }, 1500);
        return;
      }
      const wBtn = e.target.closest('.btn-wishlist');
      if (wBtn) {
        toggleWishlist(wBtn.dataset);
        updateWishlistButtons();
        return;
      }
      const cBtn = e.target.closest('.btn-compare');
      if (cBtn) {
        toggleCompare(cBtn.dataset);
        updateCompareButtons();
        return;
      }
    });
  }

  /* ---- Hero Slider ---- */
  const slider = document.querySelector('.hero-slider');
  if (slider) {
    const slides = slider.querySelectorAll('.slide');
    const dotsContainer = slider.querySelector('.slider-dots');

    if (slides.length) {
      let current = 0;
      let timer = null;

      const dots = Array.from({ length: slides.length }, (_, i) => {
        const btn = document.createElement('button');
        btn.className = 'slider-dot' + (i === 0 ? ' active' : '');
        btn.setAttribute('aria-label', `Go to slide ${i + 1}`);
        btn.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(btn);
        return btn;
      });

      function goTo(index) {
        slides[current].classList.remove('active');
        dots[current].classList.remove('active');
        current = (index + slides.length) % slides.length;
        slides[current].classList.add('active');
        dots[current].classList.add('active');
      }

      function startAuto() {
        timer = setInterval(() => goTo(current + 1), 4500);
      }

      function stopAuto() {
        clearInterval(timer);
      }

      slides[0].classList.add('active');
      startAuto();

      slider.addEventListener('mouseenter', stopAuto);
      slider.addEventListener('mouseleave', startAuto);

      /* Touch swipe support */
      let touchStartX = 0;
      slider.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
      slider.addEventListener('touchend', e => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
      });
    }
  }

  /* ---- Commitments Slider ---- */
  const cSlider = document.querySelector('.commitments-slider');
  if (cSlider) {
    const cSlides = cSlider.querySelectorAll('.commitment-slide');
    const cDotsContainer = cSlider.nextElementSibling; // .commitment-dots sits right after

    if (cSlides.length) {
      let cCurrent = 0;
      let cTimer = null;

      const cDots = Array.from({ length: cSlides.length }, (_, i) => {
        const btn = document.createElement('button');
        btn.className = 'commitment-dot' + (i === 0 ? ' active' : '');
        btn.setAttribute('aria-label', `Go to commitment ${i + 1}`);
        btn.addEventListener('click', () => cGoTo(i));
        if (cDotsContainer && cDotsContainer.classList.contains('commitment-dots')) {
          cDotsContainer.appendChild(btn);
        }
        return btn;
      });

      function cGoTo(index) {
        cSlides[cCurrent].classList.remove('active');
        cDots[cCurrent].classList.remove('active');
        cCurrent = (index + cSlides.length) % cSlides.length;
        cSlides[cCurrent].classList.add('active');
        cDots[cCurrent].classList.add('active');
      }

      cSlides[0].classList.add('active');
      cTimer = setInterval(() => cGoTo(cCurrent + 1), 4500);

      cSlider.addEventListener('mouseenter', () => clearInterval(cTimer));
      cSlider.addEventListener('mouseleave', () => { cTimer = setInterval(() => cGoTo(cCurrent + 1), 4500); });

      let cTouchX = 0;
      cSlider.addEventListener('touchstart', e => { cTouchX = e.touches[0].clientX; }, { passive: true });
      cSlider.addEventListener('touchend', e => {
        const diff = cTouchX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) cGoTo(diff > 0 ? cCurrent + 1 : cCurrent - 1);
      });
    }
  }

  /* ---- Scroll entrance animations ---- */
  const animatedEls = document.querySelectorAll('.animate, .animate-fade');
  if (animatedEls.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    animatedEls.forEach(el => observer.observe(el));
  } else {
    animatedEls.forEach(el => el.classList.add('visible'));
  }

  /* ---- Back to top ---- */
  const btn = document.createElement('button');
  btn.id = 'back-to-top';
  btn.setAttribute('aria-label', 'Back to top');
  btn.innerHTML = '<i class="fas fa-chevron-up"></i>';
  document.body.appendChild(btn);
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 300);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

});
