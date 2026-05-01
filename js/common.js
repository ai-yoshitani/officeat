/* ============================================
   Common JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

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

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
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
    window.addEventListener('scroll', () => {
      header.classList.toggle('header--shadow', window.scrollY > 10);
    });
  }

  /* --- Smooth Scroll --- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 0;
        const top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* --- FAQ Accordion --- */
  document.querySelectorAll('.faq__question').forEach(btn => {
    btn.addEventListener('click', function () {
      const item = this.closest('.faq__item');
      const isOpen = item.classList.toggle('is-open');
      this.setAttribute('aria-expanded', isOpen);
    });
  });

  /* --- Form Alert (Dummy) --- */
  document.querySelectorAll('.js-dummy-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      alert('※この仮フォームは送信されません。実際の運用時はGoogleフォーム等に置き換えてください。');
    });
  });

});
