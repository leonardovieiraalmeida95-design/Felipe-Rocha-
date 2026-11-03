// Existing interactions retained during the framework migration.
let initialized = false;
export function initializeSite() {
if (initialized) return;
initialized = true;

    const pageSections = [...document.querySelectorAll('#historias, #destaques, #videos, #balcao, #fotos, #visite')];
    const sectionLinks = [...document.querySelectorAll('.floating a[href^="#"]')];
    const sectionObserver = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      sectionLinks.forEach(link => {
        if (link.hash === `#${visible.target.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }, { rootMargin: '-30% 0px -55% 0px', threshold: [0, .15, .4, .7] });
    pageSections.forEach(section => sectionObserver.observe(section));
  
;

    (() => {
      const backdrop = document.querySelector('.site-parallax');
      const photo = document.querySelector('.hero-photo img');
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!backdrop) return;
      if (photo?.src) backdrop.style.backgroundImage = `linear-gradient(180deg,rgba(13,14,14,.84),rgba(13,14,14,.72)),url("${photo.src}")`;
      if (prefersReducedMotion) return;
      let frame = 0;
      const updateParallax = () => {
        frame = 0;
        const pageRange = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        const progress = Math.min(1, Math.max(0, window.scrollY / pageRange));
        const travel = window.innerWidth < 760 ? 22 : 64;
        backdrop.style.setProperty('--backdrop-y', `${((0.5 - progress) * travel).toFixed(1)}px`);
      };
      const requestParallax = () => {
        if (!frame) frame = window.requestAnimationFrame(updateParallax);
      };
      window.addEventListener('scroll', requestParallax, { passive: true });
      window.addEventListener('resize', requestParallax);
      updateParallax();
    })();
  
;

    (() => {
      const progressFill = document.querySelector('.scroll-progress span');
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const updateProgress = () => {
        const range = document.documentElement.scrollHeight - window.innerHeight;
        const amount = range > 0 ? Math.min(1, Math.max(0, window.scrollY / range)) : 0;
        progressFill?.style.setProperty('transform', `scaleX(${amount})`);
      };
      window.addEventListener('scroll', updateProgress, { passive: true });
      window.addEventListener('resize', updateProgress);
      updateProgress();

      const cursor = document.querySelector('.custom-cursor');
      const desktopMouse = window.matchMedia('(pointer: fine)').matches || navigator.maxTouchPoints === 0;
      if (cursor && desktopMouse) {
        let frame = 0, mouseX = 0, mouseY = 0;
        const moveCursor = event => {
          mouseX = event.clientX;
          mouseY = event.clientY;
          document.documentElement.classList.add('has-custom-cursor');
          cursor.classList.add('is-visible');
          if (!frame) frame = requestAnimationFrame(() => {
            frame = 0;
            cursor.style.setProperty('--cursor-x', `${mouseX}px`);
            cursor.style.setProperty('--cursor-y', `${mouseY}px`);
          });
        };
        window.addEventListener('mousemove', moveCursor, { passive: true });
        window.addEventListener('pointerout', event => {
          if (!event.relatedTarget) cursor.classList.remove('is-visible');
        });
        document.querySelectorAll('a,button').forEach(item => {
          item.addEventListener('pointerenter', () => cursor.classList.add('is-hovering'));
          item.addEventListener('pointerleave', () => cursor.classList.remove('is-hovering'));
        });
      }
      if (!reducedMotion && 'IntersectionObserver' in window) {
        const targets = document.querySelectorAll('.hero-grid,.intro-grid,.section-head,.campaign,.story-card,.reel-card,.product-grid,.photo-card,.visit-card,.map');
        targets.forEach((item, index) => {
          item.classList.add('reveal-on-scroll');
          item.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
        });
        document.body.classList.add('has-reveal');
        const revealObserver = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-revealed');
              revealObserver.unobserve(entry.target);
            }
          });
        }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
        targets.forEach(item => revealObserver.observe(item));
      }
    })();
  
}
