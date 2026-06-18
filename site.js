/* The Paradox — site behaviour: nav condense, scroll reveal, theme toggle, mobile menu.
 * Progressive enhancement only; content is fully visible with JS disabled. */
(function () {
  // Nav condense on scroll
  var nav = document.querySelector('.nav');
  function onScroll() { if (nav) nav.classList.toggle('scrolled', window.scrollY > 24); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Scroll reveal — hide only below-the-fold elements, reveal on entry
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce && 'IntersectionObserver' in window) {
    var vh = window.innerHeight || 800;
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (e) { if (e.isIntersecting) { e.target.removeAttribute('data-pending'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(function (el) {
      if (el.getBoundingClientRect().top >= vh * 0.95) { el.setAttribute('data-pending', ''); io.observe(el); }
    });
  }

  // Theme toggle (persists)
  var KEY = 'pdx-theme';
  try { if (localStorage.getItem(KEY) === 'dark') document.documentElement.setAttribute('data-theme', 'dark'); } catch (e) {}
  function syncIcon() {
    var dark = document.documentElement.getAttribute('data-theme') === 'dark';
    document.querySelectorAll('.theme-toggle .material-symbols-outlined').forEach(function (i) { i.textContent = dark ? 'light_mode' : 'dark_mode'; });
  }
  syncIcon();
  document.querySelectorAll('.theme-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var dark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (dark) { document.documentElement.removeAttribute('data-theme'); try { localStorage.setItem(KEY, 'light'); } catch (e) {} }
      else { document.documentElement.setAttribute('data-theme', 'dark'); try { localStorage.setItem(KEY, 'dark'); } catch (e) {} }
      syncIcon();
    });
  });

  // Mobile menu
  var menu = document.getElementById('mobileMenu');
  var openBtn = document.getElementById('menuBtn');
  var closeBtn = document.getElementById('closeMenu');
  if (openBtn && menu) openBtn.addEventListener('click', function () { menu.classList.add('open'); });
  if (closeBtn && menu) closeBtn.addEventListener('click', function () { menu.classList.remove('open'); });
  if (menu) menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { menu.classList.remove('open'); }); });

  // Language choice: clicking EN/NL stores an explicit preference so the
  // first-visit auto-redirect (in each page's <head>) never fights the user.
  document.querySelectorAll('.lang a').forEach(function (a) {
    a.addEventListener('click', function () {
      var t = (a.textContent || '').trim().toLowerCase();
      if (t === 'en' || t === 'nl') {
        try { localStorage.setItem('pdx-lang', t); sessionStorage.setItem('pdx-redir', '1'); } catch (e) {}
      }
    });
  });
})();
