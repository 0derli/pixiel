gsap.registerPlugin(ScrollTrigger);

const track = document.querySelector('.words-track');
const words = gsap.utils.toArray('.words-track span');
const wrap  = document.querySelector('.words-wrap');

const steps = words.length - 1;

function setActive(progress) {
  const idx = Math.round(progress * steps);
  words.forEach((w, i) => w.classList.toggle('is-active', i === idx));
}

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.youCan',
    start: 'top top',
    end: () => '+=' + (steps * 100) + '%', 
    pin: true,
    scrub: 1,
    anticipatePin: 1,
    invalidateOnRefresh: true,
    onUpdate: (self) => setActive(self.progress),
  }
});

tl.to(track, {
  x: () => -(steps * wrap.offsetWidth),
  ease: 'none',
});