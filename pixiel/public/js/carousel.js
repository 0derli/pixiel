document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('carouselTrack');
    if (!track) return;

    const words = ['СМЕЛО', 'ГРОМКО', 'ЯРКО', 'ТВОЙ ВАЙБ', 'БЕЗ РАМОК', 'ГРУБО', 'ИНАЧЕ', 'ВЫЗОВ', 'РЕШАЙ', 'НЕОН', 'ПИКСЕЛЬ', 'ВЫХОД', 'ВЕРА'];

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

    buildItems();

    let offset = 0;
    let speed  = 1;
    let halfWidth = 0;
    let rafId;

    function measureWidth() {
        halfWidth = track.scrollWidth / 2;
    }

    function loop() {
        offset -= speed;
        if (halfWidth > 0 && Math.abs(offset) >= halfWidth) {
            offset += halfWidth;
        }
        track.style.transform = `translate3d(${offset}px, 0, 0)`;
        rafId = requestAnimationFrame(loop);
    }

    function duplicateForLoop() {
        const originalChildren = Array.from(track.children);
        originalChildren.forEach(child => {
            track.appendChild(child.cloneNode(true));
        });
        measureWidth();
    }

    duplicateForLoop();

    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
            track.innerHTML = '';
            buildItems();
            duplicateForLoop();
        });
    }

    window.addEventListener('resize', measureWidth);

    loop();
});