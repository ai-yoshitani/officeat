/* ============================================
   Common JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Hamburger Menu --- */
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (hamburger && mobileMenu) {
    const menuLinks = Array.from(mobileMenu.querySelectorAll('a'));

    function openMenu() {
      hamburger.classList.add('is-active');
      mobileMenu.classList.add('is-open');
      hamburger.setAttribute('aria-expanded', 'true');
      hamburger.setAttribute('aria-label', 'メニューを閉じる');
      document.body.style.overflow = 'hidden';
      if (menuLinks.length) menuLinks[0].focus();
    }

    function closeMenu() {
      hamburger.classList.remove('is-active');
      mobileMenu.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.setAttribute('aria-label', 'メニューを開く');
      document.body.style.overflow = '';
      hamburger.focus();
    }

    hamburger.addEventListener('click', () => {
      hamburger.classList.contains('is-active') ? closeMenu() : openMenu();
    });

    /* メニュー内リンクをクリックで閉じる（ページ遷移するためfocus戻し不要） */
    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('is-active');
        mobileMenu.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    /* Escキーで閉じる */
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
        closeMenu();
      }
    });

    /* フォーカストラップ: 先頭↔末尾をループ */
    mobileMenu.addEventListener('keydown', e => {
      if (e.key !== 'Tab' || !menuLinks.length) return;
      const first = menuLinks[0];
      const last  = menuLinks[menuLinks.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
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
