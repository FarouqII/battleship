# Battleship — JavaScript Project (The Odin Project)

A fully interactive, browser-based implementation of the classic Battleship game.  
Built as part of The Odin Project’s JavaScript curriculum, this project focuses on modular architecture, DOM manipulation, game logic, AI design, and UI rendering.

---

## Features

### Gameplay
- Full player vs AI Battleship experience.
- Manual or randomized player ship placement.
- Horizontal and vertical ship placement.
- Visual ship rendering aligned accurately to gameboard tiles.
- Interactive attack phase using click-based targeting.
- Hit and miss markers for both player and opponent.
- Automatic detection of game end once all ships are sunk.

### AI Opponent
A lightweight heuristic AI that:
- Remembers previously attacked cells (no repeats).
- Switches from random shots to targeted shots after a hit.
- Stores hit positions to determine ship orientation.
- Builds a dynamic queue of likely next positions to attack.
- Resets tracking data after successfully sinking a ship.

### Core JavaScript Concepts

#### Modular Architecture
The project is organized using ES Modules, splitting responsibilities across:
- Gameboard logic
- Ship objects
- DOM handlers
- Rendering utilities
- Game setup loader
- Attack handling and AI controller

#### Object-Oriented Design
- `Ship` class handles hit tracking, sunk state, name, and length.
- `Gameboard` class manages ship placement, collision detection, attack logic, and win condition checks.

#### Event-Driven UI
- Tile clicks update gameboard state, render hit/miss markers, and trigger AI attacks.
- Ship option clicks switch selected ship and load preview images.
- Start Game transitions from setup phase to the attack phase.

### DOM and Rendering
- Dynamic creation of gameboards for both player and opponent.
- Ships rendered as images positioned relative to tile coordinates.
- Hit and miss markers added directly to the correct tiles.
- Overlay and UI containers prepared for transitions and end-game states.

---

## Technical Stack
- JavaScript (ES Modules)
- Webpack bundler
- CSS and HTML
- Git and GitHub version control

---

## Educational Purpose
This project was created as part of The Odin Project curriculum. It demonstrates proficiency in:

- Structuring JavaScript applications using modules  
- Designing classes and managing game state  
- DOM manipulation and event handling  
- Implementing simple algorithmic AI  
- Managing application flow between setup and gameplay  
- Applying clean, maintainable project architecture  

---