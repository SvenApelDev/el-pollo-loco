

let backgrounds = [];
for (let x = -720; x <= 1440; x += 720) {
    backgrounds.push(new BackgroundObject('img/5_background/layers/air.png', x));
}

const level1 = new Level([], [], backgrounds);