import Phaser from "./phaser/phaser.js";

var map;
var controls;
var cursors;

var boatSpeed;

var playerboat;

// Max we allow the boat to spin
const MAX_ANGULAR_VELOCITY = 30;
// Delta - How quickly the boat gains angular velocity
const D_ANGULAR_VELOCITY = 2;
// Friction - How quickly angular velocity degrades without input
const F_ANGULAR_VELOCITY = 1;
// Max speed we allow the boat to go
const MAX_SHIP_VELOCITY = 85;
// Delta - How quickly the boat accelerates
const D_SHIP_VELOCITY = 2;
// Brakes - How quickly the boat decelerates while braking
const B_SHIP_VELOCITY = 1;
// Friction - How quickly boat decelerates without input
const F_SHIP_VELOCITY = .5;
const GAME_HEIGHT = 640;
const GAME_WIDTH = 640;

function preload() {
    this.load.image('tiles', 'assets/tiles_sheet.png');
    this.load.tilemapJSON('map', 'assets/piratemap.json');
    this.load.atlas('playerboat', 'assets/shipsMiscellaneous_sheet.png', 'assets/spritesheet.json');
}

function create() {
    map = createMap(this);
    playerboat = createPlayerBoat(this);

    this.physics.world.setBounds(0, 0, GAME_WIDTH, GAME_HEIGHT);
    cursors = game.input.keyboard.createCursorKeys();

}

function createMap(game) {
    let m = game.make.tilemap({ key: 'map' });
    var tiles = m.addTilesetImage('piratemaptileset','tiles');

    var waterLayer = m.createStaticLayer(0, tiles, 0, 0);
    var shoreLayer = m.createStaticLayer(1, tiles, 0, 0);
    var foliageLayer = m.createStaticLayer(2, tiles, 0, 0);
    return m;
}

function createPlayerBoat(game) {
    let p = game.add.sprite(200,300,'playerboat',"ship (2).png");
    game.physics.world.enable([p]);
    p.body.maxAngular = MAX_ANGULAR_VELOCITY;
    p.body.maxVelocity = MAX_SHIP_VELOCITY;
    p.body.collideWorldBounds = true;
    boatSpeed = 0;
    return p;
}

function update(time,delta) {
    updatePlayerBoat(this);
}

function updatePlayerBoat(game) {
    let av = playerboat.body.angularVelocity;
    if (cursors.left.isDown) {
        playerboat.body.angularVelocity -= D_ANGULAR_VELOCITY;
    } else if (cursors.right.isDown) {
        playerboat.body.angularVelocity += D_ANGULAR_VELOCITY;
    } else {
        if (av < D_ANGULAR_VELOCITY && av > -1*D_ANGULAR_VELOCITY) {
            playerboat.body.angularVelocity = 0;
        } else if (playerboat.body.angularVelocity > 0) {
            playerboat.body.angularVelocity -= F_ANGULAR_VELOCITY;
        } else if (playerboat.body.angularVelocity < 0) {
            playerboat.body.angularVelocity += F_ANGULAR_VELOCITY;
        }
    }

    if (cursors.up.isDown) {
        boatSpeed += D_SHIP_VELOCITY;
        
    } else if (cursors.down.isDown) {
        if (boatSpeed > -1*D_SHIP_VELOCITY) {
            boatSpeed -= B_SHIP_VELOCITY;
        }
    } else {
        if (boatSpeed > 0) {
            boatSpeed -= F_SHIP_VELOCITY;
        }
    }

    game.physics.world.velocityFromAngle(playerboat.angle + 90, boatSpeed, playerboat.body.velocity);
}

var config = {
    type: Phaser.CANVAS,
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    backgroundColor: '#1b262c',
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 0 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);