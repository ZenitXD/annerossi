// Injects nav and footer, handles hamburger, marks active link
(function(){
  const path = window.location.pathname.split('/').pop() || 'index.html';

  const navHTML = `
  <nav id="navbar">
    <a class="nav-logo" href="index.html">Anne <span>Rossi</span></a>
    <ul class="nav-links" id="navLinks">
      <li><a href="index.html" data-page="index.html">Home</a></li>
      <li><a href="services.html" data-page="services.html">Services</a></li>
      <li><a href="about.html" data-page="about.html">About</a></li>
      <li><a href="shop.html" data-page="shop.html">Gift Cards</a></li>
      <li><a href="contact.html" data-page="contact.html">Contact</a></li>
      <li><a href="https://phorest.com/book/salons/annerossi" target="_blank" class="nav-book">Book Now</a></li>
    </ul>
    <button class="hamburger" id="hamburger" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  </nav>`;

  const footerHTML = `
  <div class="social-bar">
    <p>Follow us on social media</p>
    <div class="social-links">
      <a href="https://instagram.com/anne_rossi_beauty" target="_blank" class="social-link" aria-label="Instagram">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".5" fill="currentColor"/></svg>
      </a>
      <a href="https://www.facebook.com/p/Anne-Rossi-Clinic-and-Beauty-100063679985281/" target="_blank" class="social-link" aria-label="Facebook">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
      </a>
    </div>
  </div>
  <footer>
    <div class="footer-logo">Anne <span>Rossi</span><br><small style="font-size:.62rem;color:var(--taupe);letter-spacing:.14em;font-family:var(--sans);font-weight:300">SKIN & BEAUTY · CLONTARF</small></div>
    <p>© 2025 Anne Rossi Skin & Beauty. All rights reserved.</p>
    <nav class="footer-nav">
      <a href="index.html">Home</a>
      <a href="services.html">Services</a>
      <a href="about.html">About</a>
      <a href="shop.html">Gift Cards</a>
      <a href="contact.html">Contact</a>
      <a href="https://phorest.com/book/salons/annerossi" target="_blank">Book Now</a>
    </nav>
  </footer>`;

  // Inject nav before first element
  document.body.insertAdjacentHTML('afterbegin', navHTML);
  document.body.insertAdjacentHTML('beforeend', footerHTML);

  // Mark active link
  document.querySelectorAll('.nav-links a[data-page]').forEach(a => {
    if(a.dataset.page === path) a.classList.add('active');
  });

  // Hamburger toggle
  document.getElementById('hamburger').addEventListener('click', () => {
    document.getElementById('navLinks').classList.toggle('open');
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => document.getElementById('navLinks').classList.remove('open'));
  });

  // Scroll reveal
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(e.isIntersecting){ e.target.style.opacity=1; e.target.style.transform='translateY(0)'; }
    });
  }, { threshold: 0.08 });
  setTimeout(() => {
    document.querySelectorAll('.reveal').forEach(el => {
      el.style.opacity=0; el.style.transform='translateY(18px)';
      el.style.transition='opacity .55s ease, transform .55s ease';
      observer.observe(el);
    });
  }, 100);

  // Auto-replace image placeholders when images exist
  document.querySelectorAll('.img-ph[data-img]').forEach(el => {
    const src = 'images/' + el.dataset.img;
    const alt = el.dataset.alt || '';
    const img = new Image();
    img.onload = () => {
      const newImg = document.createElement('img');
      newImg.src = src;
      newImg.alt = alt;
      newImg.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block;';
      // preserve dimensions from placeholder
      newImg.style.minHeight = el.style.minHeight || '';
      el.parentNode.replaceChild(newImg, el);
    };
    img.src = src;
  });
})();
