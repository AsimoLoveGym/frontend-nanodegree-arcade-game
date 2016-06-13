var Game = function () {
    this.gameOver = false;
    this.gameWin = false;
};


// Enemies our player must avoid
var level = 0;
//game.render(level);
var difficulty = 0;
var numOfBug = difficulty + 5;
var maxSpeed = difficulty*10 + 200;
var minSpeed = difficulty*10 + 70;

var Enemy = function (x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-Trump.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (this.speed * dt);
    this.catchPlayer();
    if (this.x > 606) {
        this.bugReset();
    }
};

var imageHeightDiff = 70;

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y + imageHeightDiff);
};

Enemy.prototype.catchPlayer = function () {
    var enemyRadius = 30;
    var playerRadius = 20;
    var dx = this.x - player.x;
    var dy = this.y - player.y;
    console.log(player.x, player.y);
//    console.log(dx);
//    console.log(dy);
    var distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < enemyRadius + playerRadius) {
        // collision detected!
        alert(':( You have been catched！');
        game.gameOver = true;
        player.gameReset();
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x,y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-wife.png';
};
// for what update? 
Player.prototype.update = function(dt) {
    this.x * (dt);
    this.y * (dt);
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (direction) {

    if (direction === 'left' && this.x > 0) {
        this.x -= 101;
    }
    if (direction === 'right' && this.x < 500) {
        this.x += 101;
    }
    if (direction === 'up' && this.y > 80) {
        this.y -= 83;
    }
    if (direction === 'down' && this.y < 480) {
        this.y += 83;
    }
    if(this.y < 80){
        level++;
        game.render(level);
        difficulty++;
        maxSpeed = difficulty*50 + 200;
        minSpeed = difficulty*50 + 70;
        enemy.levelUp();
        this.gameReset();
    }
};

Player.prototype.gameReset = function() {
    this.x = 200;
    this.y = 400;
    switch (level) {
        case 1:
            this.sprite = 'images/char-girl.png';
            break;
        case 2:
            this.sprite = 'images/char-boy.png';
            break;
        case 3:
            this.sprite = 'images/char-money.png';
            break;
        case 4:
            this.sprite = 'images/char-you.png';
    }
    
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

//var enemy1 = new Enemy(0,220,10);
//var enemy2 = new Enemy(0,140,70);
//var enemy3 = new Enemy(0,60,40);


var allEnemies = [];
/*
var intervalTime = 800;

window.setInterval(function() {
//    var randomNum = Math.random() * 100;
    var maxSpeed = 200;
    var minSpeed = 70;
    var randomSpeed = Math.random() * (maxSpeed - minSpeed) + minSpeed;
    var bugLaneNum = Math.floor(Math.random() * 3 ) + 2;
        enemy = new Enemy(-100, 83*bugLaneNum-20, randomSpeed);
    allEnemies.push(enemy);
    console.log(allEnemies.length);
    return allEnemies;
}, intervalTime);
*/

    for (i=0; i<numOfBug; i++) {
        var randomSpeed = Math.random() * (maxSpeed - minSpeed) + minSpeed;
        var bugLaneNum = Math.floor(Math.random() * 3 ) + 2;
            enemy = new Enemy(-100, 83*bugLaneNum-20, randomSpeed);
        allEnemies.push(enemy);
        console.log(allEnemies.length);
    //    return allEnemies;
    }

Enemy.prototype.levelUp = function() {
    var randomSpeed = Math.random() * (maxSpeed - minSpeed) + minSpeed;
    var bugLaneNum = Math.floor(Math.random() * 3 ) + 2;
        enemy = new Enemy(-100, 83*bugLaneNum-20, randomSpeed);
    allEnemies.push(enemy);
    console.log(allEnemies.length);
    for (i=0; i<numOfBug; i++) {
        allEnemies[i].speed = allEnemies[i].speed + 50;
    }
};

Enemy.prototype.bugReset = function() {
    this.x = -100;
    this.y = 83*(Math.floor(Math.random() * 3 ) + 2)-20;
    this.speed = Math.random() * (maxSpeed - minSpeed) + minSpeed;
};

//console.table(allEnemies);


var player = new Player(200,400);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


Game.prototype.render = function (level) {
    switch (level) {
        case 0:
            ctx.drawImage (Resources.get('images/char-you.png'),-2,483);
            ctx.drawImage (Resources.get('images/char-money.png'),99,483);
            ctx.drawImage (Resources.get('images/char-boy.png'),200,483);
            ctx.drawImage (Resources.get('images/char-girl.png'),301,483);
            break;
        case 1:
            ctx.drawImage (Resources.get('images/char-you.png'),-2,483);
            ctx.drawImage (Resources.get('images/char-money.png'),99,483);
            ctx.drawImage (Resources.get('images/char-boy.png'),200,483);
            //finished character
            ctx.drawImage (Resources.get('images/char-wife.png'),-2,483-6*83);
            break;
        case 2:
            ctx.drawImage (Resources.get('images/char-you.png'),-2,483);
            ctx.drawImage (Resources.get('images/char-money.png'),99,483);
            //finished character
            ctx.drawImage (Resources.get('images/char-wife.png'),-2,483-6*83);
            ctx.drawImage (Resources.get('images/char-girl.png'),99,483-6*83);
            break;
        case 3:
            ctx.drawImage (Resources.get('images/char-you.png'),-2,483);
            //finished character
            ctx.drawImage (Resources.get('images/char-wife.png'),-2,483-6*83);
            ctx.drawImage (Resources.get('images/char-girl.png'),99,483-6*83);
            ctx.drawImage (Resources.get('images/char-boy.png'),200,483-6*83);
            break;
        case 4:
            //finished character
            ctx.drawImage (Resources.get('images/char-wife.png'),-2,483-6*83);
            ctx.drawImage (Resources.get('images/char-girl.png'),99,483-6*83);
            ctx.drawImage (Resources.get('images/char-boy.png'),200,483-6*83);
            ctx.drawImage (Resources.get('images/char-money.png'),301,483-6*83);
            break;
        case 5:
            //finished character
            ctx.drawImage (Resources.get('images/char-wife.png'),-2,483-6*83);
            ctx.drawImage (Resources.get('images/char-girl.png'),99,483-6*83);
            ctx.drawImage (Resources.get('images/char-boy.png'),200,483-6*83);
            ctx.drawImage (Resources.get('images/char-money.png'),301,483-6*83);
            ctx.drawImage (Resources.get('images/char-you.png'),402,483-6*83);
            //console.log(this.gameWin);
            this.gameWin = true;
            //console.log(this.gameWin);
    }
}

var game = new Game();
//game.render(level);
