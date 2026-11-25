document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('carouselTrack');
    if (!track) return;

    const words = ['СМЕЛО', 'ГРОМКО', 'ЯРКО', 'ТВОЙ ВАЙБ', 'БЕЗ РАМОК', 'ГРУБО', 'ИНАЧЕ', 'ВЫЗОВ', 'РЕШАЙ', 'НЕОН', 'ПИКСЕЛЬ', 'ВЫХОД', 'ВЕРА'];

    const SPEED = 60;  

    function buildItems() {
        words.forEach(word => {
            const item = document.createElement('div');
            item.className = 'carousel-item';

            const span = document.createElement('span');
            span.className = 'carousel-word';
            span.textContent = word;

            const sep = document.createElement('img');
            sep.className = 'carousel-sep';
            sep.src = 'img/Dawn.png';
            sep.alt = '';

            item.appendChild(span);
            item.appendChild(sep);
            track.appendChild(item);
        });
    }

    function duplicateForLoop() {
        const originalChildren = Array.from(track.children);
        originalChildren.forEach(child => {
            track.appendChild(child.cloneNode(true));
        });
    }

    let offset = 0;
    let halfWidth = 0;
    let lastTime = 0;

    function measureWidth() {
        halfWidth = track.scrollWidth / 2;
    }

    function loop(now) {
        if (!lastTime) lastTime = now;
        const dt = (now - lastTime) / 1000;
        lastTime = now;

        offset -= SPEED * dt;

        if (halfWidth > 0) {
            offset = offset % halfWidth;
            if (offset > 0) offset -= halfWidth;
        }

        track.style.transform = `translate3d(${offset}px, 0, 0)`;
        requestAnimationFrame(loop);
    }

    function init() {
        track.innerHTML = '';
        buildItems();
        duplicateForLoop();
        measureWidth();
        offset = 0;
        lastTime = 0;
        requestAnimationFrame(loop);
    }

    window.addEventListener('resize', measureWidth);

    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(init);
    } else {
        init();
    }
});