import Ship from './classes/ship.js';
import Gameboard from './classes/gameboard.js';
import Player from './classes/Player.js';
import "../css/main.css";

const starter = document.getElementById('starter');
const playerNameForm = document.querySelector('form');

playerNameForm.addEventListener('submit', e => {
    e.preventDefault();
    starter.style.display = 'none';
})