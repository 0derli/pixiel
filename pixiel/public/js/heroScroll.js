document.addEventListener('DOMContentLoaded', () => {

    const logo         = document.getElementById('movingLogo');
    const track        = document.getElementById('heroTrack');
    const content      = document.querySelector('.heroContent');
    const slides       = Array.from(document.querySelectorAll('.slide'));
    const decorPersist = Array.from(document.querySelectorAll('.decorLayer--persist .decor'));
    const decorFade    = Array.from(document.querySelectorAll('.decorLayer--fade .decor'));
    const progressBar  = document.getElementById('scrollProgress');

    const LOGO_FONT_START     = 120;
    const LOGO_FONT_END       = 46.91;
    const LOGO_START_OFFSET_X = 100;

    const SLIDE_RANGES = [
        { start: 0.00, end: 0.45 },
        { start: 0.55, end: 1.00 }
    ];

    let trackTop     = 0;
    let scrollRange  = 1;
    let logoStart    = { top: 0, left: 0 };
    let logoEnd      = { top: 0, left: 0 };
    let logoScaleEnd = 1;

    const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
    const ease  = t => 1 - Math.pow(1 - t, 3);
    const lerp  = (a, b, t) => a + (b - a) * t;
    const range = (p, s, e) => clamp((p - s) / (e - s), 0, 1);

    function measure() {
        trackTop    = track.offsetTop;
        scrollRange = Math.max(1, track.offsetHeight - window.innerHeight);

        const logoW = logo.offsetWidth;
        const logoH = logo.offsetHeight;

        logoStart = {
            top:  window.innerHeight / 2 - logoH / 2,
            left: window.innerWidth  / 2 - logoW / 2 + LOGO_START_OFFSET_X
        };

        logoScaleEnd = LOGO_FONT_END / LOGO_FONT_START;

        const scaledW = logoW * logoScaleEnd;
        const scaledH = logoH * logoScaleEnd;

        const headerRect = document.querySelector('header').getBoundingClientRect();
        const centerX = headerRect.left + headerRect.width  / 2;
        const centerY = headerRect.top  + headerRect.height / 2;

        logoEnd = {
            top:  centerY - scaledH / 2,
            left: centerX - scaledW / 2
        };

        const contentRect          = content.getBoundingClientRect();
        const logoLeftInContent    = logoStart.left - contentRect.left;
        const logoCenterYInContent = (logoStart.top - contentRect.top) + logoH / 2;

        decorPersist.forEach(el => {
            if (el.classList.contains('decor-a1')) {
                el._startX  = logoLeftInContent - 335 - 17;
                el._startY  = logoCenterYInContent - 335 / 2 - 116;
                el._endX    = 30 - contentRect.left + 100;
                el._endY    = logoCenterYInContent - 543 / 2;
                el._startS  = 335 / 543;
                el._endS    = 1;
                el._startR  = 0;
                el._endR    = 0;
                el._startP  = 0;
                el._endP    = 1;

            } else if (el.classList.contains('decor-a2')) {
                el._startX  = logoLeftInContent + logoW - 530;
                el._startY  = logoCenterYInContent - 200 / 2;
                el._endX    = logoLeftInContent + logoW - 890 + 100;
                el._endY    = logoCenterYInContent - 120 / 2;
                el._startS  = 1;
                el._endS    = 2;
                el._startR  = 0;
                el._endR    = 0;
                el._startP  = 0;
                el._endP    = 1;

            } else if (el.classList.contains('decor-a3')) {
                const decorW = el.offsetWidth;
                const decorH = el.offsetHeight;

                el._startS = 1;
                el._endS   = 1;

                el._startX = contentRect.width - decorW - 35;
                el._startY = contentRect.height * (2 / 3) - decorH / 2;
                el._endX   = contentRect.width - decorW - 35 + 100;
                el._endY   = contentRect.height - decorH * el._endS - 30;

                el._startR = -5;
                el._endR   = 0;
                el._startP = 0;
                el._endP   = 1;
            } else {
                el._startX  = parseFloat(el.dataset.startX)     || 0;
                el._startY  = parseFloat(el.dataset.startY)     || 0;
                el._startS  = parseFloat(el.dataset.startScale) || 1;
                el._endX    = parseFloat(el.dataset.endX)       || 0;
                el._endY    = parseFloat(el.dataset.endY)       || 0;
                el._endS    = parseFloat(el.dataset.endScale)   || 1;
                el._startR  = parseFloat(el.dataset.startRotate) || 0;
                el._endR    = parseFloat(el.dataset.endRotate)   || 0;
                el._startP  = parseFloat(el.dataset.startP)     || 0;
                el._endP    = parseFloat(el.dataset.endP)       || 1;
            }
        });

        decorFade.forEach(el => {
            el._startX  = parseFloat(el.dataset.startX)     || 0;
            el._startY  = parseFloat(el.dataset.startY)     || 0;
            el._startS  = parseFloat(el.dataset.startScale) || 1;
            el._endX    = parseFloat(el.dataset.endX)       || 0;
            el._endY    = parseFloat(el.dataset.endY)       || 0;
            el._endS    = parseFloat(el.dataset.endScale)   || 1;
            el._startR  = parseFloat(el.dataset.startRotate) || 0;
            el._endR    = parseFloat(el.dataset.endRotate)   || 0;
            el._startP  = parseFloat(el.dataset.startP)     || 0;
            el._endP    = parseFloat(el.dataset.endP)       || 1;
        });
    }

    function update() {
        const scrollY = window.scrollY;
        const p = clamp((scrollY - trackTop) / scrollRange, 0, 1);
        const e = ease(p);

        const top   = lerp(logoStart.top,  logoEnd.top,  e);
        const left  = lerp(logoStart.left, logoEnd.left, e);
        const scale = lerp(1, logoScaleEnd, e);

        logo.style.transform =
            `translate3d(${left}px, ${top}px, 0) scale(${scale})`;

        logo.classList.toggle('is-pinned', p >= 0.98);

        slides.forEach((slide, i) => {
            const r = SLIDE_RANGES[i];
            if (!r) return;
            const active = p >= r.start && p <= r.end;
            slide.classList.toggle('is-active', active);
        });

        decorPersist.forEach(el => {
            const k  = range(p, el._startP, el._endP);
            const tx = lerp(el._startX, el._endX, k);
            const ty = lerp(el._startY, el._endY, k);
            const sc = lerp(el._startS, el._endS, k);
            const rt = lerp(el._startR, el._endR, k);
            el.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(${sc}) rotate(${rt}deg)`;
        });

        decorFade.forEach(el => {
            const k  = range(p, el._startP, el._endP);
            const tx = lerp(el._startX, el._endX, k);
            const ty = lerp(el._startY, el._endY, k);
            const sc = lerp(el._startS, el._endS, k);
            const rt = lerp(el._startR, el._endR, k);
            el.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(${sc}) rotate(${rt}deg)`;
            el.style.opacity = String(1 - k);
        });

        if (progressBar) {
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress  = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
            progressBar.style.width = progress + '%';
        }
    }

    let ticking = false;

    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                update();
                ticking = false;
            });
            ticking = true;
        }
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.2, rootMargin: '0px 0px -10% 0px' });

    document.querySelectorAll('.heroSection, .scroll-section').forEach(s => observer.observe(s));

    function init() {
        measure();
        update();
    }

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(init, 100);
    });

    window.addEventListener('scroll', onScroll, { passive: true });

    init();
});