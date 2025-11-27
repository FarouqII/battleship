import { placeShipRequest } from './gameLogic.js';
import { renderShip } from './render.js';
import loadImage from './assets';

export function setupShipOptions(options, onSelect) {
    options.forEach(option => {
        option.addEventListener('click', e => {
            e.preventDefault();

            selected = option.id;
            options.forEach(o => o.classList.remove('selected'));
            option.classList.add('selected');
            onSelect(option.id);
        });

        const optionImage = document.querySelector(`#${option.id} .option-image`)
        if (optionImage) optionImage.src = loadImage(option.id);
    });
}
