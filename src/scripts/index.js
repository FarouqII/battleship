import Ship from './classes/Ship.js';
import Gameboard from './classes/Gameboard.js';
import Player from './classes/Player.js';
import "../css/main.css";
import { setupLoader } from './loaders/setup.js';

const starter = document.getElementById('starter');
const playerNameForm = document.querySelector('form');
const playerNameInput = document.getElementById('player-name-input');

playerNameForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = playerNameInput.innerText;
    starter.style.display = 'none';
    setupLoader(name);
})