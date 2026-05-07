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

  /* --- Coming Soon モーダル --- */
  const comingSoonPaths = ['/company/index.html', '/reskill/index.html'];

  /* モーダルをDOMに生成 */
  const modal = document.createElement('div');
  modal.id = 'coming-soon-modal';
  modal.className = 'coming-soon-modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-labelledby', 'coming-soon-title');
  modal.setAttribute('hidden', '');
  modal.innerHTML = `
    <div class="coming-soon-modal__overlay"></div>
    <div class="coming-soon-modal__box">
      <p id="coming-soon-title" class="coming-soon-modal__title" lang="en">Coming Soon</p>
      <p class="coming-soon-modal__text">このページは現在準備中です。<br>もうしばらくお待ちください。</p>
      <button class="coming-soon-modal__close" aria-label="閉じる">閉じる</button>
    </div>
  `;
  document.body.appendChild(modal);

  const modalOverlay = modal.querySelector('.coming-soon-modal__overlay');
  const modalClose   = modal.querySelector('.coming-soon-modal__close');
  let lastFocused    = null;

  /* モーダル外の主要要素（背景コンテンツ） */
  const bgRegions = () => document.querySelectorAll('body > *:not(#coming-soon-modal)');

  function openComingSoon() {
    lastFocused = document.activeElement;
    modal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    /* 背景コンテンツをスクリーンリーダーから隠す */
    bgRegions().forEach(el => el.setAttribute('aria-hidden', 'true'));
    modalClose.focus();
  }

  function closeComingSoon() {
    modal.setAttribute('hidden', '');
    document.body.style.overflow = '';
    /* 背景コンテンツを元に戻す */
    bgRegions().forEach(el => el.removeAttribute('aria-hidden'));
    if (lastFocused) lastFocused.focus();
  }

  modalOverlay.addEventListener('click', closeComingSoon);
  modalClose.addEventListener('click', closeComingSoon);

  /* Escキーで閉じる */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !modal.hasAttribute('hidden')) closeComingSoon();
  });

  /* フォーカストラップ: モーダル内の focusable 要素のみを循環 */
  modal.addEventListener('keydown', e => {
    if (e.key !== 'Tab') return;
    const focusable = Array.from(
      modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
    ).filter(el => !el.disabled);
    if (!focusable.length) { e.preventDefault(); return; }
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  /* coming soon 対象リンクにクリックイベントを付与 */
  document.querySelectorAll('a').forEach(link => {
    try {
      const path = new URL(link.href, location.href).pathname;
      if (comingSoonPaths.some(p => path.endsWith(p))) {
        link.addEventListener('click', e => {
          e.preventDefault();
          openComingSoon();
        });
      }
    } catch (_) { /* 無効なhrefは無視 */ }
  });

});
