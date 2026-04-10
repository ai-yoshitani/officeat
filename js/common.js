/* ============================================
   Common JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* --- Hamburger Menu --- */
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      const isOpen = this.classList.toggle('is-active');
      mobileMenu.classList.toggle('is-open');
      this.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu on link click
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('is-active');
        mobileMenu.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* --- Header Scroll Shadow --- */
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        header.classList.add('header--shadow');
      } else {
        header.classList.remove('header--shadow');
      }
    });
  }

  /* --- Smooth Scroll --- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 0;
        const top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* --- FAQ Accordion --- */
  document.querySelectorAll('.faq__question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const item = this.closest('.faq__item');
      const isOpen = item.classList.toggle('is-open');
      this.setAttribute('aria-expanded', isOpen);
    });
  });

  /* --- Form Alert (Dummy) --- */
  document.querySelectorAll('.js-dummy-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('※この仮フォームは送信されません。実際の運用時はGoogleフォーム等に置き換えてください。');
    });
  });

});
