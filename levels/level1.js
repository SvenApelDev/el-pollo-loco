const backgrounds = [];
let i = 0;
for (let x = -720; x <= 3600; x += 720) {
	const n = i % 2 === 0 ? "1" : "2";
	backgrounds.push(new BackgroundObject("img/5_background/layers/air.png", x));
	backgrounds.push(new BackgroundObject(`img/5_background/layers/3_third_layer/${n}.png`, x));
	backgrounds.push(new BackgroundObject(`img/5_background/layers/2_second_layer/${n}.png`, x));
	backgrounds.push(new BackgroundObject(`img/5_background/layers/1_first_layer/${n}.png`, x));
	i++;
}

const clouds = [];
for (let x = -300; x <= 3600; x += 500) {
	clouds.push(new Cloud(x));
}

const enemies = [];
for (let i = 0; i < 8; i++) {
    enemies.push(new ChickenNormal());
    enemies.push(new ChickenSmall());
    enemies.push(new Endboss());   
}

const bottles = [];
for (let i = 0; i < 8; i++) {
    bottles.push(new Bottle());
}

const coins = [];
for(let i = 0; i < 8; i++) {
    coins.push(new Coin());
}

const level1 = new Level(enemies, clouds, backgrounds, bottles, coins);