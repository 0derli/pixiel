document.addEventListener('DOMContentLoaded', () => {
    const progressBar = document.getElementById('scrollProgress');
    if (!progressBar) return;

    function updateProgress() {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress  = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
        progressBar.style.width = progress + '%';
    }

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateProgress();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    updateProgress();
});