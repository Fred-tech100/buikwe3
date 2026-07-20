// =========================================================
// Buikwe Foundation — Shared JS
// =========================================================
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Navbar scroll state ---------- */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll);
  }

  /* ---------- Mobile menu ---------- */
  const hamburger = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileMenuClose');
  const toggleMenu = () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  };
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', toggleMenu);
    mobileClose && mobileClose.addEventListener('click', toggleMenu);
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      if (mobileMenu.classList.contains('open')) toggleMenu();
    }));
  }

  /* ---------- Back to top ---------- */
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => backToTop.classList.toggle('show', window.scrollY > 500));
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ---------- Button ripple ---------- */
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.left = (e.clientX - rect.left) + 'px';
      ripple.style.top = (e.clientY - rect.top) + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    });
  });

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in-view'); io.unobserve(en.target); } });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  }

  /* ---------- Hero slider ---------- */
  const heroSlider = document.querySelector('.hero-slider');
  if (heroSlider) {
    const slides = [...heroSlider.querySelectorAll('.hero-slide')];
    const dots = [...heroSlider.querySelectorAll('.hero-dot')];
    let current = 0, timer;
    const show = (i) => {
      slides[current].classList.remove('active');
      dots[current] && dots[current].classList.remove('active');
      current = (i + slides.length) % slides.length;
      slides[current].classList.add('active');
      dots[current] && dots[current].classList.add('active');
    };
    const next = () => show(current + 1);
    const prev = () => show(current - 1);
    const restart = () => { clearInterval(timer); timer = setInterval(next, 6000); };
    heroSlider.querySelector('.hero-arrow.next')?.addEventListener('click', () => { next(); restart(); });
    heroSlider.querySelector('.hero-arrow.prev')?.addEventListener('click', () => { prev(); restart(); });
    dots.forEach((d, i) => d.addEventListener('click', () => { show(i); restart(); }));
    restart();
  }

  /* ---------- Animated counters ---------- */
  const counters = document.querySelectorAll('.counter');
  if (counters.length) {
    const animateCounter = (el) => {
      const target = parseInt(el.dataset.target, 10);
      const duration = 1600;
      const start = performance.now();
      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target).toLocaleString();
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target.toLocaleString() + (el.dataset.suffix || '');
      };
      requestAnimationFrame(step);
    };
    const cIo = new IntersectionObserver((entries) => {
      entries.forEach(en => { if (en.isIntersecting) { animateCounter(en.target); cIo.unobserve(en.target); } });
    }, { threshold: 0.5 });
    counters.forEach(el => cIo.observe(el));
  }

  /* ---------- Generic carousel (data-carousel) ---------- */
  document.querySelectorAll('[data-carousel]').forEach(root => {
    const track = root.querySelector('.carousel-track');
    const slides = [...track.children];
    const prevBtn = root.querySelector('.carousel-prev');
    const nextBtn = root.querySelector('.carousel-next');
    const dotsWrap = root.querySelector('.carousel-dots');
    let perView = 1;
    const getPerView = () => {
      if (window.innerWidth >= 1024 && slides[0].classList.contains('per3')) return 3;
      if (window.innerWidth >= 768 && (slides[0].classList.contains('per2') || slides[0].classList.contains('per3'))) return 2;
      return 1;
    };
    let index = 0;
    const maxIndex = () => Math.max(0, slides.length - perView);
    const render = () => {
      perView = getPerView();
      const w = 100 / perView;
      track.style.transform = `translateX(-${index * w}%)`;
      if (dotsWrap) {
        dotsWrap.innerHTML = '';
        for (let i = 0; i <= maxIndex(); i++) {
          const b = document.createElement('button');
          b.className = 'w-2.5 h-2.5 rounded-full ' + (i === index ? 'bg-yellow-400' : 'bg-white/25');
          b.addEventListener('click', () => { index = i; render(); });
          dotsWrap.appendChild(b);
        }
      }
    };
    nextBtn && nextBtn.addEventListener('click', () => { index = Math.min(index + 1, maxIndex()); render(); });
    prevBtn && prevBtn.addEventListener('click', () => { index = Math.max(index - 1, 0); render(); });
    window.addEventListener('resize', render);
    render();
    if (root.dataset.autoplay) {
      setInterval(() => { index = index >= maxIndex() ? 0 : index + 1; render(); }, 5000);
    }
  });

  /* ---------- Accordion (FAQ) ---------- */
  document.querySelectorAll('.accordion-item .accordion-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.accordion-item');
      const group = item.closest('[data-accordion-group]');
      if (group) {
        group.querySelectorAll('.accordion-item').forEach(i => { if (i !== item) i.classList.remove('open'); });
      }
      item.classList.toggle('open');
    });
  });

  /* ---------- Gallery filter ---------- */
  const filterBtns = document.querySelectorAll('[data-filter-btn]');
  if (filterBtns.length) {
    const items = document.querySelectorAll('[data-gallery-item]');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('bg-red-600', 'text-white'));
        btn.classList.add('bg-red-600', 'text-white');
        const cat = btn.dataset.filterBtn;
        items.forEach(it => {
          const show = cat === 'all' || it.dataset.galleryItem === cat;
          it.style.display = show ? '' : 'none';
        });
      });
    });
  }

  /* ---------- Lightbox ---------- */
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    const lbImg = lightbox.querySelector('.lb-inner');
    document.querySelectorAll('[data-lightbox-trigger]').forEach(trigger => {
      trigger.addEventListener('click', () => {
        lbImg.innerHTML = trigger.querySelector('.ph-img').outerHTML.replace('class="ph-img', 'style="height:70vh" class="ph-img');
        lightbox.classList.add('open');
      });
    });
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox || e.target.closest('.lb-close')) lightbox.classList.remove('open'); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') lightbox.classList.remove('open'); });
  }

  /* ---------- Donation amount chips ---------- */
  document.querySelectorAll('[data-amount-group]').forEach(group => {
    const chips = group.querySelectorAll('.amount-chip');
    const customInput = document.querySelector(group.dataset.amountGroup);
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('selected'));
        chip.classList.add('selected');
        if (customInput) customInput.value = chip.dataset.amount;
        document.querySelectorAll('[data-selected-amount]').forEach(el => el.textContent = chip.dataset.amount);
      });
    });
  });

  /* ---------- Impact calculator (donate page) ---------- */
  const calcInput = document.getElementById('impactCalcInput');
  if (calcInput) {
    const output = document.getElementById('impactCalcOutput');
    const update = () => {
      const val = parseInt(calcInput.value || 0, 10);
      let msg = 'Enter an amount to see the impact of your gift.';
      if (val >= 250) msg = `UGX/USD ${val} can fund a full business startup kit for a graduate — helping her become financially independent.`;
      else if (val >= 100) msg = `$${val} can cover a term of school fees for one girl.`;
      else if (val >= 50) msg = `$${val} can sponsor a full round of tailoring training for one participant.`;
      else if (val > 0) msg = `$${val} can provide school supplies for a girl in one of our programs.`;
      output.textContent = msg;
    };
    calcInput.addEventListener('input', update);
    update();
  }

  /* ---------- Forms: prevent default, show success ---------- */
  document.querySelectorAll('form[data-demo-form]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const success = form.parentElement.querySelector('.form-success');
      form.reset();
      form.classList.add('hidden');
      if (success) success.classList.add('show');
    });
  });

  /* ---------- Newsletter ---------- */
  document.querySelectorAll('[data-newsletter-form]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button');
      const original = btn.textContent;
      btn.textContent = 'Subscribed ✓';
      btn.disabled = true;
      form.reset();
      setTimeout(() => { btn.textContent = original; btn.disabled = false; }, 3000);
    });
  });

});
