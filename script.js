/* ═══════════════════════════════════════════════════════════
   SAIPRANEETH JUPALLI — PORTFOLIO SCRIPTS  v3.0
   Industry-level: Tabs · Typing · Parallax · Reveal · Cursor
   ═══════════════════════════════════════════════════════════ */

'use strict';

/* ══════════════════════════
   1. TYPING ANIMATION
══════════════════════════ */
(function initTyping() {
    const el = document.getElementById('typed-name');
    const cursor = document.querySelector('.typed-cursor');
    if (!el) return;

    const name = 'SaiPraneeth';
    let i = 0;

    setTimeout(type, 400);

    function type() {
        if (i < name.length) {
            el.textContent += name[i++];
            setTimeout(type, 85 + Math.random() * 65);
        } else {
            // Fade cursor after done
            setTimeout(() => {
                if (cursor) cursor.remove();
            }, 1800);
        }
    }
})();


/* ══════════════════════════
   2. CUSTOM CURSOR
══════════════════════════ */
(function initCursor() {
    const dot = document.querySelector('.cursor');
    const ring = document.querySelector('.cursor-follower');
    if (!dot || !ring) return;

    let mx = 0, my = 0, rx = 0, ry = 0, raf;

    document.addEventListener('mousemove', e => {
        mx = e.clientX; my = e.clientY;
        dot.style.left = mx + 'px';
        dot.style.top  = my + 'px';
    });

    function animate() {
        rx += (mx - rx) * .11;
        ry += (my - ry) * .11;
        ring.style.left = rx + 'px';
        ring.style.top  = ry + 'px';
        raf = requestAnimationFrame(animate);
    }
    animate();

    const hoverEls = document.querySelectorAll('a, button, .project-card, .contact-card, .stat-card, .tab-btn, .tech-chip');
    hoverEls.forEach(el => {
        el.addEventListener('mouseenter', () => {
            dot.style.width  = dot.style.height  = '16px';
            ring.style.width = ring.style.height = '54px';
            ring.style.opacity = '.15';
        });
        el.addEventListener('mouseleave', () => {
            dot.style.width  = dot.style.height  = '10px';
            ring.style.width = ring.style.height = '34px';
            ring.style.opacity = '.35';
        });
    });
})();


/* ══════════════════════════
   3. NAV TOGGLE (MOBILE)
══════════════════════════ */
(function initNav() {
    const toggle = document.getElementById('nav-toggle');
    const menu   = document.getElementById('nav-menu');
    if (!toggle || !menu) return;

    const OPEN = 'open';
    const SHOW = 'show';

    function close() {
        menu.classList.remove(SHOW);
        toggle.classList.remove(OPEN);
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    toggle.addEventListener('click', () => {
        const isOpen = menu.classList.toggle(SHOW);
        toggle.classList.toggle(OPEN, isOpen);
        toggle.setAttribute('aria-expanded', String(isOpen));
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    menu.querySelectorAll('.nav__link').forEach(l => l.addEventListener('click', close));

    document.addEventListener('click', e => {
        if (menu.classList.contains(SHOW) &&
            !menu.contains(e.target) &&
            !toggle.contains(e.target)) close();
    });

    // Close on Escape
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') close();
    });
})();


/* ══════════════════════════
   4. ACTIVE NAV ON SCROLL
══════════════════════════ */
(function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const links    = document.querySelectorAll('.nav__link');

    function update() {
        const sy = window.scrollY + 140;
        sections.forEach(sec => {
            if (sy >= sec.offsetTop && sy < sec.offsetTop + sec.offsetHeight) {
                links.forEach(l => l.classList.remove('active'));
                const a = document.querySelector(`.nav__link[href="#${sec.id}"]`);
                if (a) a.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', update, { passive: true });
    update();
})();


/* ══════════════════════════
   5. HEADER SHADOW
══════════════════════════ */
(function initHeader() {
    const header = document.getElementById('header');
    if (!header) return;
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
})();


/* ══════════════════════════
   6. SKILLS TABS
══════════════════════════ */
(function initSkillTabs() {
    const tabBtns   = document.querySelectorAll('.tab-btn');
    const panels    = document.querySelectorAll('.skills__panel');

    function activateTab(targetId) {
        tabBtns.forEach(b => b.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));

        const btn   = document.querySelector(`[data-tab="${targetId}"]`);
        const panel = document.getElementById(`tab-${targetId}`);

        if (btn)   btn.classList.add('active');
        if (panel) {
            panel.classList.add('active');
            // Re-animate bars in newly visible panel
            panel.querySelectorAll('.skill-fill').forEach(fill => {
                fill.style.width = '0';
                setTimeout(() => {
                    fill.style.width = fill.dataset.width + '%';
                }, 80);
            });
            // Re-trigger reveal for panel content
            panel.querySelectorAll('[data-reveal]').forEach(el => {
                el.classList.remove('revealed');
                setTimeout(() => el.classList.add('revealed'), 60);
            });
        }
    }

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => activateTab(btn.dataset.tab));
    });

    // Keyboard: left/right arrows on tab row
    tabBtns.forEach((btn, idx) => {
        btn.addEventListener('keydown', e => {
            if (e.key === 'ArrowRight') tabBtns[idx + 1]?.focus();
            if (e.key === 'ArrowLeft')  tabBtns[idx - 1]?.focus();
        });
    });

    // Activate first tab on load
    if (tabBtns.length) activateTab(tabBtns[0].dataset.tab);
})();


/* ══════════════════════════
   7. SCROLL REVEAL
══════════════════════════ */
(function initReveal() {
    const els = document.querySelectorAll('[data-reveal]');
    if (!('IntersectionObserver' in window)) {
        els.forEach(el => el.classList.add('revealed'));
        return;
    }

    const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.dataset.delay || 0);
                setTimeout(() => entry.target.classList.add('revealed'), delay);
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    els.forEach(el => obs.observe(el));
})();


/* ══════════════════════════
   8. SKILL BAR ANIMATION
══════════════════════════ */
(function initSkillBars() {
    const fills = document.querySelectorAll('.skill-fill');
    if (!('IntersectionObserver' in window)) {
        fills.forEach(f => f.style.width = (f.dataset.width || 0) + '%');
        return;
    }

    const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.width = (entry.target.dataset.width || 0) + '%';
                }, 120);
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.35 });

    fills.forEach(f => obs.observe(f));
})();


/* ══════════════════════════
   9. STAT COUNT-UP
══════════════════════════ */
(function initStats() {
    const els = document.querySelectorAll('.stat-num');

    function run(el) {
        const raw = el.textContent.trim();
        const end = parseInt(raw.replace(/\D/g, ''));
        if (isNaN(end)) return;
        let cur = 0;
        const step = end / 55;
        const t = setInterval(() => {
            cur += step;
            if (cur >= end) { el.textContent = end; clearInterval(t); }
            else el.textContent = Math.floor(cur);
        }, 16);
    }

    if (!('IntersectionObserver' in window)) { els.forEach(run); return; }

    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) { run(e.target); obs.unobserve(e.target); }
        });
    }, { threshold: 0.5 });

    els.forEach(el => obs.observe(el));
})();


/* ══════════════════════════
   10. SCROLL PARALLAX — Profile Photo
══════════════════════════ */
(function initParallax() {
    const ring = document.getElementById('img-ring');
    if (!ring) return;

    let ticking = false;

    function apply() {
        if (window.innerWidth <= 900) {
            ring.style.transform = '';
            ring.style.opacity   = '';
            ticking = false;
            return;
        }
        const sy = window.scrollY;
        const vh = window.innerHeight;
        ring.style.transform = `translateY(${-sy * .28}px) scale(${Math.max(.89, 1 - sy * .00018)})`;
        ring.style.opacity   = String(Math.max(0, 1 - sy / (vh * .95)));
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) { requestAnimationFrame(apply); ticking = true; }
    }, { passive: true });

    window.addEventListener('resize', apply, { passive: true });
    apply();
})();


/* ══════════════════════════
   11. CONTACT FORM
══════════════════════════ */
(function initForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', e => {
        e.preventDefault();

        // Simple client-side validation
        const inputs = form.querySelectorAll('[required]');
        let valid = true;
        inputs.forEach(inp => {
            inp.style.borderColor = '';
            if (!inp.value.trim()) {
                inp.style.borderColor = '#f74f8e';
                valid = false;
            }
        });
        if (!valid) return;

        const btn  = form.querySelector('.btn--primary');
        const span = btn?.querySelector('span');
        if (!btn || !span) return;

        const orig = span.textContent;
        btn.disabled = true;
        span.textContent = 'Sending…';
        btn.style.opacity = '.7';

        // Simulated send — replace with real fetch() / EmailJS / Formspree
        setTimeout(() => {
            span.textContent = '✓ Message Sent!';
            btn.style.background = '#22c55e';
            btn.style.opacity = '1';
            form.reset();
            setTimeout(() => {
                span.textContent = orig;
                btn.disabled = false;
                btn.style.background = '';
            }, 3500);
        }, 1400);
    });
})();


/* ══════════════════════════
   12. SMOOTH SCROLL
══════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top, behavior: 'smooth' });
    });
});


/* ══════════════════════════
   13. BACK TO TOP VISIBILITY
══════════════════════════ */
(function initBackToTop() {
    const btn = document.querySelector('.back-to-top');
    if (!btn) return;
    btn.style.opacity = '0';
    btn.style.pointerEvents = 'none';

    window.addEventListener('scroll', () => {
        const show = window.scrollY > 400;
        btn.style.opacity = show ? '1' : '0';
        btn.style.pointerEvents = show ? '' : 'none';
    }, { passive: true });
})();
