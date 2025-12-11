import "../css/main.css";
import { setupLoader } from './loaders/setup.js';

const starter = document.getElementById('starter');
const playerNameForm = document.querySelector('form');
const playerNameInput = document.getElementById('player-name-input');

playerNameForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = playerNameInput.value;
    starter.style.display = 'none';
    setupLoader(name);
})
