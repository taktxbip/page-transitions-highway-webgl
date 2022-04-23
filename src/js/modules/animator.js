import PubSub from "pubsub-js";
import gsap from 'gsap';

PubSub.subscribe('gotoSlide', function (msg, data) {
    const { from, to } = data;

    const currentSlide = document.querySelector(`section[data-slide="${from}"]`);
    const nextSlide = document.querySelector(`section[data-slide="${to}"]`);
    const currentElements = currentSlide.querySelectorAll('p, h2, h1');
    const nextElements = nextSlide.querySelectorAll('p, h2, h1');

    const tl = gsap.timeline();

    tl
        .to(currentElements, { duration: 0.3, stagger: 0.1, y: -20, opacity: 0 }, 0.1)
        .to(currentSlide, { duration: 1, x: '-100%', opacity: 0 }, 0.2)
        .fromTo(nextSlide, { x: '100%', opacity: 0 }, { x: '0%', opacity: 1 }, 0.5)
        .fromTo(nextElements,
            { duration: 0.3, stagger: 0.1, y: 0, opacity: 0 },
            { duration: 0.3, stagger: 0.1, y: 20, opacity: 1 },
            '-=0.4');
});