import Phaser from "./phaser/phaser.js";

var map;
var controls;
var cursors;

var playerboat;

function preload() {
    this.load.image('tiles', 'assets/tiles_sheet.png');
    this.load.tilemapJSON('map', 'assets/piratemap.json');
    this.load.atlas('playerboat', 'assets/shipsMiscellaneous_sheet.png', 'assets/spritesheet.json');
}

function create() {
    map = createMap();
    playerboat = createPlayerBoat();

    cursors = this.input.keyboard.createCursorKeys();

}

function createMap() {
    let m = this.make.tilemap({ key: 'map' });
    var tiles = m.addTilesetImage('piratemaptileset','tiles');

    var waterLayer = m.createStaticLayer(0, tiles, 0, 0);
    var shoreLayer = m.createStaticLayer(1, tiles, 0, 0);
    var foliageLayer = m.createStaticLayer(2, tiles, 0, 0);
    return m;
}

function createPlayerBoat() {
    let p = this.add.sprite(200,300,'playerboat',"ship (2).png");
    this.physics.world.enable([p]);
    return p;
}

function update(time,delta) {
    updatePlayerBoat();
}

function updatePlayerBoat() {
    playerboat.body.angularVelocity = 0;
    playerboat.body.velocity.x = 0;
    playerboat.body.velocity.y = 0;

    if (cursors.left.isDown) {
        playerboat.body.angularVelocity -= 100;
    } else if (cursors.right.isDown) {
        playerboat.body.angularVelocity += 100;
    }

    if (cursors.up.isDown) {
        console.log("eggs",this.physics)
        this.physics.world.velocityFromAngle(playerboat.angle + 90, 100, playerboat.body.velocity);
    }
}

var config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 640,
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