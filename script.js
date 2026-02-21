/* ═══════════════════════════════════════════════
   SAIPRANEETH PORTFOLIO — PROFESSIONAL SCRIPTS
   White + #2f7afa Theme
   ═══════════════════════════════════════════════ */

/* ══════════════════════════
   1. TYPING ANIMATION — Name
   ══════════════════════════ */
(function initTyping() {
    const target = document.getElementById('typed-name');
    if (!target) return;

    const name    = 'SaiPraneeth';
    const cursorEl = document.querySelector('.typed-cursor-custom');
    let   index   = 0;
    let   started = false;

    /* Wait until the title's fade-in starts (~0.2s) then begin typing */
    setTimeout(() => {
        started = true;
        typeChar();
    }, 350);

    function typeChar() {
        if (index < name.length) {
            target.textContent += name[index];
            index++;
            /* Vary speed slightly for realistic feel */
            const delay = 90 + Math.random() * 60;
            setTimeout(typeChar, delay);
        } else {
            /* Typing done — hide blinking cursor after 2 s */
            setTimeout(() => {
                if (cursorEl) {
                    cursorEl.remove();
                }
            }, 2000);
        }
    }
})();


/* ══════════════════════════
   2. CUSTOM CURSOR
   ══════════════════════════ */
const cursor   = document.querySelector('.cursor');
const cursorFl = document.querySelector('.cursor-follower');

let mx = 0, my = 0, fx = 0, fy = 0;

document.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    if (cursor) { cursor.style.left = mx + 'px'; cursor.style.top = my + 'px'; }
});

function animateCursor() {
    fx += (mx - fx) * 0.11;
    fy += (my - fy) * 0.11;
    if (cursorFl) { cursorFl.style.left = fx + 'px'; cursorFl.style.top = fy + 'px'; }
    requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('a, button, .project-card, .pill, .stat-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        if (cursor) Object.assign(cursor.style, { width: '18px', height: '18px' });
        if (cursorFl) Object.assign(cursorFl.style, { width: '52px', height: '52px', opacity: '0.15' });
    });
    el.addEventListener('mouseleave', () => {
        if (cursor) Object.assign(cursor.style, { width: '10px', height: '10px' });
        if (cursorFl) Object.assign(cursorFl.style, { width: '32px', height: '32px', opacity: '0.4' });
    });
});


/* ══════════════════════════
   3. MOBILE NAV TOGGLE
   ══════════════════════════ */
const navToggle = document.getElementById('nav-toggle');
const navMenu   = document.getElementById('nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show');
        navToggle.classList.toggle('open');
        /* Lock body scroll when menu is open */
        document.body.style.overflow = navMenu.classList.contains('show') ? 'hidden' : '';
    });

    /* Close on link click */
    navMenu.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show');
            navToggle.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    /* Close on outside tap */
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('show') &&
            !navMenu.contains(e.target) &&
            !navToggle.contains(e.target)) {
            navMenu.classList.remove('show');
            navToggle.classList.remove('open');
            document.body.style.overflow = '';
        }
    });
}


/* ══════════════════════════
   4. ACTIVE NAV ON SCROLL
   ══════════════════════════ */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__link');

function updateActiveNav() {
    const scrollY = window.scrollY;
    sections.forEach(section => {
        const top    = section.offsetTop - 130;
        const bottom = top + section.offsetHeight;
        if (scrollY >= top && scrollY < bottom) {
            navLinks.forEach(l => l.classList.remove('active'));
            const a = document.querySelector(`.nav__link[href="#${section.id}"]`);
            if (a) a.classList.add('active');
        }
    });
}
window.addEventListener('scroll', updateActiveNav, { passive: true });


/* ══════════════════════════
   5. HEADER SCROLL SHADOW
   ══════════════════════════ */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });


/* ══════════════════════════
   6. SCROLL-REVEAL (data-reveal)
   ══════════════════════════ */
const revealEls = document.querySelectorAll('[data-reveal]');
if ('IntersectionObserver' in window) {
    const revealObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.dataset.delay || 0);
                setTimeout(() => entry.target.classList.add('revealed'), delay);
                revealObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    revealEls.forEach(el => revealObs.observe(el));
} else {
    revealEls.forEach(el => el.classList.add('revealed'));
}


/* ══════════════════════════
   7. SKILL BAR ANIMATION
   ══════════════════════════ */
const skillFills = document.querySelectorAll('.skill-fill');
if ('IntersectionObserver' in window) {
    const skillObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.width = entry.target.dataset.width + '%';
                }, 150);
                skillObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.35 });
    skillFills.forEach(bar => skillObs.observe(bar));
} else {
    skillFills.forEach(bar => {
        bar.style.width = (bar.dataset.width || 0) + '%';
    });
}


/* ══════════════════════════
   8. STAT COUNT-UP
   ══════════════════════════ */
const statNums = document.querySelectorAll('.stat-num');
function animateStat(el) {
    const raw = el.textContent.trim();
    const num = parseInt(raw.replace(/\D/g, ''));
    const suf = raw.replace(/[0-9]/g, '');
    if (isNaN(num)) return;

    let cur = 0;
    const step = num / 60;
    const timer = setInterval(() => {
        cur += step;
        if (cur >= num) {
            el.textContent = num + suf;
            clearInterval(timer);
        } else {
            el.textContent = Math.floor(cur) + suf;
        }
    }, 16);
}

if ('IntersectionObserver' in window) {
    const statObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStat(entry.target);
                statObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    statNums.forEach(el => statObs.observe(el));
} else {
    statNums.forEach(el => animateStat(el));
}


/* ══════════════════════════
   9. SMOOTH SCROLL PARALLAX — Profile Photo
   Scroll down → image drifts upward slightly
   ══════════════════════════ */
const homeImg  = document.querySelector('.home__img');
const imgRing  = document.querySelector('.img-ring');

if (homeImg && imgRing) {
    let ticking = false;

    function applyParallax() {
        const scrollY    = window.scrollY;
        const viewHeight = window.innerHeight;

        /* Only apply on desktop (>860px) where image is beside text */
        if (window.innerWidth > 860) {
            /* Parallax depth: image moves at 30% scroll speed */
            const offset = scrollY * 0.30;
            /* Also add a gentle scale-down as page scrolls */
            const scale  = Math.max(0.88, 1 - scrollY * 0.0002);
            /* Fade out slightly when scrolled past hero */
            const opacity = Math.max(0, 1 - scrollY / (viewHeight * 0.9));

            imgRing.style.transform  = `translateY(${-offset}px) scale(${scale})`;
            imgRing.style.opacity    = opacity;
        } else {
            /* Reset on mobile */
            imgRing.style.transform  = '';
            imgRing.style.opacity    = '';
        }
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(applyParallax);
            ticking = true;
        }
    }, { passive: true });

    /* Initial call */
    applyParallax();

    /* Re-run on resize */
    window.addEventListener('resize', applyParallax, { passive: true });
}


/* ══════════════════════════
   10. CONTACT FORM UX
   ══════════════════════════ */
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn  = contactForm.querySelector('.btn--primary');
        if (!btn) return;
        const span = btn.querySelector('span');
        if (!span) return;
        const orig = span.textContent;

        btn.disabled = true;
        span.textContent = 'Sending…';

        setTimeout(() => {
            span.textContent = '✓ Message Sent!';
            btn.style.background = '#16a34a';
            contactForm.reset();
            setTimeout(() => {
                span.textContent = orig;
                btn.disabled = false;
                btn.style.background = '';
            }, 3500);
        }, 1500);
    });
}


/* ══════════════════════════
   11. SMOOTH ANCHOR SCROLL
   ══════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const top = target.getBoundingClientRect().top + window.scrollY - 72;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});
