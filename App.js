/* CreamyDay – shared app.js */

document.addEventListener('DOMContentLoaded', function () {

  /* ── Nav scroll shadow ── */
  var nav = document.getElementById('mainNav');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  /* ── Hamburger ── */
  var hamburger = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      mobileMenu.classList.toggle('open');
    });
  }

  /* ── Hero Slider (index only) ── */
  var slides = document.querySelectorAll('.slide');
  var dots   = document.querySelectorAll('.dot');
  var prevBtn = document.getElementById('prevBtn');
  var nextBtn = document.getElementById('nextBtn');

  if (slides.length > 0) {
    var current = 0;
    var timer;

    function goTo(n) {
      slides[current].classList.remove('active');
      dots[current].classList.remove('active');
      current = (n + slides.length) % slides.length;
      slides[current].classList.add('active');
      dots[current].classList.add('active');
    }

    function startTimer() {
      clearInterval(timer);
      timer = setInterval(function () { goTo(current + 1); }, 4500);
    }

    if (nextBtn) nextBtn.addEventListener('click', function () { goTo(current + 1); startTimer(); });
    if (prevBtn) prevBtn.addEventListener('click', function () { goTo(current - 1); startTimer(); });

    dots.forEach(function (d) {
      d.addEventListener('click', function () { goTo(+d.dataset.dot); startTimer(); });
    });

    startTimer();
  }

  /* ── Novelties Tabs & Dynamic Image ── */
  var tabBtns   = document.querySelectorAll('.tab-btn');
  var tabPanels = document.querySelectorAll('.tab-panel');
  var heroImg   = document.getElementById('noveltiesHeroImg');

  var imageMap = {
    'cups': 'images/cups.png',
    'cones': 'images/cones.png',
    'bars': 'images/bars.png',
    'kids': 'images/kids-sundaes.png',
    'sundaes': 'images/sundaes.png'
  };

  if (tabBtns.length > 0) {
    tabBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        tabBtns.forEach(function (b) { b.classList.remove('active'); });
        tabPanels.forEach(function (p) { p.classList.remove('active'); });
        
        btn.classList.add('active');
        var tabId = btn.dataset.tab;
        var panel = document.getElementById('tab-' + tabId);
        if (panel) panel.classList.add('active');

        // Dynamically change the header image based on the selected tab
        if (heroImg && imageMap[tabId]) {
          heroImg.style.opacity = '0'; // Fade out
          setTimeout(function() {
            heroImg.src = imageMap[tabId];
            heroImg.style.opacity = '1'; // Fade in
          }, 200);
        }

        btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      });
    });
  }

  /* ── Write email safely (avoids CDN email obfuscation) ── */
  document.querySelectorAll('[data-mail]').forEach(function (el) {
    var addr = el.dataset.mail;
    el.href = 'mailto:' + addr;
    el.textContent = addr;
  });

});