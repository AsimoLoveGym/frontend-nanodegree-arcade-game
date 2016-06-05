// Enemies our player must avoid
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
    console.log(player.x);
//    console.log(dx);
//    console.log(dy);
    var distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < enemyRadius + playerRadius) {
        // collision detected!
        alert(':( You have been catched！');
        player.gameReset();
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x,y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
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

    if (direction === 'left' && this.x > 51) {
        this.x -= 100;
    }
    if (direction === 'right' && this.x < 400) {
        this.x += 100;
    }
    if (direction === 'up' && this.y > 51) {
        this.y -= 82.5;
    }
    if (direction === 'down' && this.y < 400) {
        this.y += 82.5;
    }
    if(this.y < 10){
        this.gameReset();
    }
};

Player.prototype.gameReset = function() {
    this.x = 200;
    this.y = 400;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

//var enemy1 = new Enemy(0,220,10);
//var enemy2 = new Enemy(0,140,70);
//var enemy3 = new Enemy(0,60,40);

var allEnemies = [];
var intervalTime = 800;

window.setInterval(function() {
    var randomNum = Math.random() * 100;
    var maxSpeed = 200;
    var minSpeed = 70;
    var randomSpeed = Math.random() * (maxSpeed - minSpeed) + minSpeed;
    var bugLaneNum = Math.floor(Math.random() * 3 ) + 1;
        enemy = new Enemy(-100, 80*bugLaneNum-20, randomSpeed);
    allEnemies.push(enemy);
    return allEnemies;
}, intervalTime);

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
