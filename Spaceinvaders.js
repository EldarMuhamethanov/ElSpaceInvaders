var game = {
    fps: 1000/60,
    width: 480,
    height: 600,
    //background: new Image(),
    score: 0,
    level: 1,
    gameOver:{background:new Image()}
}

var fon = {
	1:{background: new Image(), x:0, y:0},
	2:{background: new Image(), x:0, y: -game.height},
}


var ship = {
	x: 230,
	y: 500,
	width: 80,
	height: 80,
	background: new Image(),
	xDirection: 5,
	yDirection: 5,
}

var enemys = {
	1:{
		x:230,
		y:10,
		width: 30,
		height: 30,
		speed: 5,
		expl: false,
		background: new Image(),
	},
	2:{
		x:300,
		y:100,
		width: 40,
		height: 40,
		speed: 4,
		expl: false,
		background: new Image(),
	},
	3:{
		x:100,
		y:50,
		width: 50,
		height: 50,
		speed: 3,
		expl: false,
		background: new Image(),
	},
	4:{
		x:400,
		y:50,
		width: 35,
		height: 35,
		speed: 4,
		expl: false,
		background: new Image(),
	},
}

var ammo = {
	1:{
		x:1000,
		y:1000,
		width: 10,
		height: 40,
		speed: 10,
		enable: false,
		background: new Image(),
	},
	2:{
		x:1000,
		y:1000,
		width: 10,
		height: 40,
		speed: 10,
		enable: false,
		background: new Image(),
	},
	3:{
		x:1000,
		y:1000,
		width: 10,
		height: 40,
		speed: 10,
		enable: false,
		background: new Image(),
	},
}

var explosion = {
	background: new Image(),
	enable: false,
	checkExplosion() {
		for (var n in enemys){
			if ((ship.x <= enemys[n].x) & ((ship.x + ship.width) >= (enemys[n].x + enemys[n].width))) {
				if ((ship.y <= (enemys[n].y + enemys[n].height)) & (ship.y > enemys[n].y)) {
					explosion.enable = true;
				}
			}
			if ((ship.x + 10 <= (enemys[n].x + enemys[n].width)) & ((ship.x + ship.width - 10) >= enemys[n].x)) {
				if ((ship.y <= (enemys[n].y + enemys[n].height)) & (ship.y > enemys[n].y)) {
					explosion.enable = true;
				}	
			}
			for(var am in ammo){
				if ((ammo[am].x <= enemys[n].x) & ((ammo[am].x + ammo[am].width) >= (enemys[n].x + enemys[n].width))) {
					if ((ammo[am].y <= (enemys[n].y + enemys[n].height))) {
						enemys[n].expl = true;
						ammo[am].enable = false;
						game.score += 1;
					}
				}
				if ((ammo[am].x <= (enemys[n].x + enemys[n].width)) & ((ammo[am].x + ammo[am].width) >= enemys[n].x)) {
					if ((ammo[am].y <= (enemys[n].y + enemys[n].height))) {
						enemys[n].expl = true;
						ammo[am].enable = false;
						game.score += 1;
					}	
				}
			}
		}
		
	}
}
	


function init() {
    var canvas = document.getElementById("canvas");
    canvasContext = canvas.getContext("2d");
    //game.background.src = "FonNew.png";
    ship.background.src = "image/Ship.png";
    enemys[1].background.src = "image/enemy1.png";
    enemys[2].background.src = "image/enemy2.png";
    enemys[3].background.src = "image/enemy3.png";
    enemys[4].background.src = "image/enemy4.png";
    for(var am in ammo){
    	ammo[am].background.src = "image/fire.png";
    }
    for(var f in fon){
    	fon[f].background.src = "image/FonNew.png"
    }
    explosion.background.src = "image/expl.png";
    game.gameOver.background.src = "image/gameover.png"
    canvas.addEventListener("mousemove", onCanvasMouseMove);
    document.addEventListener("keydown", onDocumentKeyDown);
    	ship.background.onload = function() {
    		setInterval(play, game.fps)		
    	}
}
var counter = 0;
function update(){
	for(var n in enemys){
		if (enemys[n].y >= game.height) {
			enemys[n].y = 0;
			enemys[n].x = getRandomInt(430);
			enemys[n].speed += 0.1;
			counter += 1;
			if ((counter/10) == Math.floor(counter/10)){
				game.level += 1;
			} 
		};
		if (enemys[n].expl == true){
			enemys[n].y = 0;
			enemys[n].x = getRandomInt(430);
			enemys[n].expl = false;
		}
		enemys[n].y += enemys[n].speed;
		if ((explosion.enable == true) | (enemys[n].expl == true)){
			enemys[n].speed = 0;
		}; 	
	};
	for(var am in ammo){
		if (ammo[am].enable == true){
			ammo[am].y -= ammo[am].speed;
		} else {
			ammo[am].y = 1000;
			ammo[am].x = 1000;
		}
		if ((ammo[am].y + ammo[am].height) <= 0){
			ammo[am].enable = false;
			ammo[am].x = 1000;
			ammo[am].y = 1000;
		}
	}
	for(var f in fon){
		fon[f].y += 4
	}
	if (fon[1].y >= game.height){
		fon[1].y = 0;
		fon[2].y = -game.height
	}
}

function play(){
	draw();
	update();
	explosion.checkExplosion();
}

function draw() {
	canvasContext.clearRect(0, 0, game.width, game.height);
	for(var f in fon){
		canvasContext.drawImage(fon[f].background, fon[f].x, fon[f].y, game.width, game.height + 10);
	} 
    canvasContext.drawImage(ship.background, ship.x, ship.y, ship.width, ship.height);
    for(var n in enemys) {
    	canvasContext.drawImage(enemys[n].background, enemys[n].x, enemys[n].y, enemys[n].width, enemys[n].height);
    }
    for(var am in ammo){
    	if (ammo[am].enable == true){
    	canvasContext.drawImage(ammo[am].background, ammo[am].x, ammo[am].y, ammo[am].width, ammo[am].height);
    	}
    }
    if (explosion.enable == true){
    	canvasContext.drawImage(explosion.background, ship.x, ship.y, ship.width, ship.height);
    	canvasContext.drawImage(game.gameOver.background, 100, 200, 250, 250);
    }
    canvasContext.font = "48px serif";
    canvasContext.fillStyle = 'white';
    canvasContext.fillText(`SCORE:${game.score}`, 250, 50);
    canvasContext.fillText(`Level:${game.level}`, 250, 100);
}


function onCanvasMouseMove(event){
	ship.x = event.x - ship.width/2;
	ship.y = event.y - ship.height/2;
}

function onDocumentKeyDown(event){
	if (event.key == " "){
		for(var am in ammo){
			if (ammo[am].enable != true){
				ammo[am].x = ship.x + ship.width/2;
				ammo[am].y = ship.y;
				ammo[am].enable = true;
				break;
			}
		}
	}
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}