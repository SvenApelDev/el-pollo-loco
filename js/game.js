
let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

window.addEventListener('keydown', (event) => {
    let key = Keyboard.KEYS[event.keyCode];
    if (key) keyboard[key] = true;
});

window.addEventListener('keyup', (event) => {
    let key = Keyboard.KEYS[event.keyCode];
    if (key) keyboard[key] = false;
});