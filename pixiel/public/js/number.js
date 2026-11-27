document.addEventListener("DOMContentLoaded", () => {
    const section = document.querySelector('.numberSection');
    const counters = document.querySelectorAll('.counter');
    
    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const duration = 2500; 
        const startTime = performance.now();

        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const easeOut = 1 - Math.pow(1 - progress, 3);
            
            const currentValue = Math.floor(easeOut * target);
            counter.innerText = currentValue.toLocaleString('ru-RU');

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                counter.innerText = target.toLocaleString('ru-RU');
            }
        };
        
        requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                section.classList.add('is-visible');
                counters.forEach(counter => animateCounter(counter));
                observer.unobserve(section);
            }
        });
    }, { threshold: 0.4 });

    observer.observe(section);
});