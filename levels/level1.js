
let backgrounds = [];
for (let x = -720; x <= 1440; x += 720) {
	backgrounds.push(new BackgroundObject('img/5_background/layers/air.png', x));
    backgrounds.push(new BackgroundObject('img/5_background/layers/3_third_layer/1.png', x));
    backgrounds.push(new BackgroundObject('img/5_background/layers/2_second_layer/1.png', x));
    backgrounds.push(new BackgroundObject('img/5_background/layers/1_first_layer/1.png', x));
    
}

let clouds = [];
for (let x = -300; x <= 1440; x += 500) {
    clouds.push(new Cloud(x));
}

const level1 = new Level([], clouds, backgrounds);
