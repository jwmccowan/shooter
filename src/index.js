import Phaser from "./phaser/phaser.js";
import config from "./config.js";

var map;
var cursors;

var playerboat;

function preload() {
    // Load map resources
    this.load.image('tiles', 'assets/tiles_sheet.png');
    this.load.tilemapJSON('map', 'assets/piratemap.json');

    // Load spritesheet for boats
    this.load.atlas('playerboat', 'assets/shipsMiscellaneous_sheet.png', 'assets/spritesheet.json');
}

function create() {
    // Init objects
    map = createMap(this);
    playerboat = createPlayerBoat(this);

    // Init physics
    this.physics.world.setBounds(320, 320, (config.MAP_WIDTH*config.TILE_HEIGHT)-640, (config.MAP_HEIGHT*config.TILE_HEIGHT)-640);
    this.physics.world.disableGravity();

    //Init game systems
    cursors = game.input.keyboard.createCursorKeys();
}

function createMap(game) {
    // Init Map
    let m = game.make.tilemap({ key: 'map' });
    var tiles = m.addTilesetImage('piratemaptileset','tiles');

    // Init the three layers
    // TODO: could be done in a loop, might need to do them separately if we involve bounds
    var waterLayer = m.createStaticLayer(0, tiles, 0, 0);
    var shoreLayer = m.createStaticLayer(1, tiles, 0, 0);
    var foliageLayer = m.createStaticLayer(2, tiles, 0, 0);
    return m;
}

function createPlayerBoat(game) {
    // Init player boat
    let p = game.physics.add.sprite(500,500,'playerboat',"ship (2).png");

    // The camera follows the boat
    game.cameras.main.startFollow(p);

    //Set physical properties
    p.setBounce(.2);
    p.setMass(10000);
    p.setFriction(.4);
    return p;
}

function update(time,delta) {
    updatePlayerBoat(this);
}

function updatePlayerBoat(game) {
    // Turn the boat
    if (cursors.left.isDown) {
        playerboat.setAngularVelocity(-1*config.D_ANGULAR_VELOCITY);
    } else if (cursors.right.isDown) {
        playerboat.setAngularVelocity(config.D_ANGULAR_VELOCITY);
    }

    // Thrust the boat
    // HACK: since I don't want to repack the sprite sheet with a rotated sprite,
    // we use thrust right and thrust left instead of thrust and thrust back
    if (cursors.up.isDown) {
        playerboat.thrustRight(config.D_SHIP_VELOCITY);
    } else if (cursors.down.isDown) {
        playerboat.thrustLeft(config.B_SHIP_VELOCITY);
    } else {
        playerboat.thrustRight(config.A_SHIP_VELOCITY);
    }
}

// Game config, pretty basic
// Right now using matter.js physics engine
var game_config = {
    type: Phaser.CANVAS,
    width: config.GAME_WIDTH,
    height: config.GAME_HEIGHT,
    backgroundColor: '#1b262c',
    pixelArt: true,
    physics: {
        default: 'matter',
        matter: {
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

// Yee init that game
var game = new Phaser.Game(game_config);