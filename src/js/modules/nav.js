import PubSub from "pubsub-js";

PubSub.subscribe('gotoSlide', function (msg, data) {
    const a = document.querySelectorAll('.pagination a');
    a.forEach(el => {
        el.classList.remove('is-active');
    });

    document.querySelector(`[data-nav="${data.to}"]`).classList.add('is-active');
});