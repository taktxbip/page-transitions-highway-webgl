import PubSub from "pubsub-js";

export default class Paginator {
    constructor() {
        this.scrollEvents();
        this.clickEvents();
        this.activeSlide = 1;
        this.canGo = true;
        this.max = 4;
        this.timeout = 1300;
    }

    scrollEvents() {
        document.addEventListener('wheel', e => {

            if (!this.canGo) return;

            this.canGo = false;

            const direction = e.deltaY > 0 ? 1 : -1;
            const nextSlide = this.activeSlide + direction;

            if (nextSlide > this.max || nextSlide < 1) {
                this.canGo = true;
                return;
            }

            PubSub.publish('gotoSlide', { from: this.activeSlide, to: nextSlide });
            this.activeSlide = nextSlide;
            setTimeout(() => {
                this.canGo = true;
            }, this.timeout);
        }, { passive: true });
    }

    clickEvents() {
        const a = document.querySelectorAll('.pagination a');
        a.forEach(el => {
            el.addEventListener('click', e => {
                if (!this.canGo) return;
                this.canGo = false;

                const goto = +e.currentTarget.getAttribute('data-gotoslide');
                if (goto !== this.activeSlide) {
                    PubSub.publish('gotoSlide', { from: this.activeSlide, to: goto });
                    this.activeSlide = goto;
                }

                setTimeout(() => {
                    this.canGo = true;
                }, this.timeout);
            });
        });
    }
}

