import { useEffect } from 'react';

// Animaciones al estilo de apple.com, sin librerías:
// - .reveal aparece (desvanecido hacia arriba) cuando entra en pantalla; --d escalona el retraso.
// - [data-scroll] recibe --p (0 → 1) según cuánto se ha recorrido el elemento; el CSS lo usa para
//   escalar, inclinar o iluminar palabras mientras se baja.
// Con "reducir movimiento" activado en el sistema todo se muestra de una vez, sin animación.

export const useReveal = () => {
  useEffect(() => {
    const els = [...document.querySelectorAll('.reveal')];
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-in'));
      return undefined;
    }
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        // En las filas deslizables del teléfono se muestran todas las tarjetas a la vez.
        const rail = e.target.parentElement?.classList.contains('rail') ? e.target.parentElement : null;
        (rail ? [...rail.children] : [e.target]).forEach((el) => { el.classList.add('is-in'); io.unobserve(el); });
      }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
};

export const useScrollProgress = () => {
  useEffect(() => {
    const els = [...document.querySelectorAll('[data-scroll]')];
    if (!els.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach((el) => el.style.setProperty('--p', '1'));
      return undefined;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      for (const el of els) {
        const r = el.getBoundingClientRect();
        // "hero": 0 arriba del todo, 1 cuando ya se recorrió su alto. "enter": 0 al asomar por abajo, 1 al llegar al centro.
        const p = el.dataset.scroll === 'hero'
          ? -r.top / Math.max(1, r.height * 0.8)
          : (vh - r.top) / (vh * 0.5 + r.height * 0.5);
        el.style.setProperty('--p', Math.min(1, Math.max(0, p)).toFixed(4));
      }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
};
