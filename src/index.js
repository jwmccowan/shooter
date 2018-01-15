import Phaser from "./phaser/phaser.js";

var map;
var controls;
var cursors;

function preload() {
    this.load.image('tiles', 'assets/tiles_sheet.png');
    this.load.tilemapJSON('map', 'assets/piratemap.json');
}

function create() {
    // Start up the physics using ARCADE physics
    // TODO: this doesn't work in v3
    // game.physics.startSystem(Phaser.Physics.ARCADE);

    map = this.make.tilemap({ key: 'map' });
    var tiles = map.addTilesetImage('piratemaptileset','tiles');

    var waterLayer = map.createStaticLayer(0, tiles, 0, 0);
    var shoreLayer = map.createStaticLayer(1, tiles, 0, 0);
    var foliageLayer = map.createStaticLayer(2, tiles, 0, 0);




    // this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    // var cursors = this.input.keyboard.createCursorKeys();
    // var controlConfig = {
    //     camera: this.cameras.main,
    //     left: cursors.left,
    //     right: cursors.right,
    //     up: cursors.up,
    //     down: cursors.down,
    //     speed: 0.5
    // };
    // controls = this.cameras.addKeyControl(controlConfig);

    // var help = this.add.text(16, 16, 'Arrow keys to scroll', {
    //     fontSize: '18px',
    //     padding: { x: 10, y: 5 },
    //     backgroundColor: '#000000',
    //     fill: '#ffffff'
    // });

    // help.setScrollFactor(0);


}

function update(time,delta) {

}

var config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 640,
    backgroundColor: '#1b262c',
    pixelArt: true,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);