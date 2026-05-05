/* ============================================
   Counter Animation (IntersectionObserver)
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'), 10);
    const duration = 2000;
    element.textContent = '0'; // アニメーション開始前に0にリセット（JS無効時は実値を表示）
    const start = performance.now();

    const update = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      element.textContent = Math.floor(eased * target).toLocaleString();
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        element.textContent = target.toLocaleString();
      }
    };

    requestAnimationFrame(update);
  };

  const counters = document.querySelectorAll('.js-counter');
  if (!counters.length) return;

  /* アニメーション無効設定の場合は即座に最終値を表示してアニメーションをスキップ */
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'), 10);
      counter.textContent = target.toLocaleString();
    });
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));

});
