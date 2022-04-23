'strict';

import Paginator from './js/modules/paginator';
import './js/modules/animator';
import './js/modules/nav';


import './scss/main.scss';
import './js/assets';

(function () {
    window.addEventListener('DOMContentLoaded', (e) => {
        new Paginator();
    });
})();
