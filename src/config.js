export default {
    // Delta - How quickly the boat gains angular velocity
    D_ANGULAR_VELOCITY: .004,
    // Delta - How quickly the boat accelerates
    D_SHIP_VELOCITY: .4,
    // Brakes - How quickly the boat decelerates while braking
    B_SHIP_VELOCITY: .1,
    // Ambient - How quickly boat accelerates without input
    A_SHIP_VELOCITY: .5,

    // Map and game world height/width data
    TILE_HEIGHT: 64,
    MAP_HEIGHT: 30,
    MAP_WIDTH: 30,
    GAME_HEIGHT: 640,
    GAME_WIDTH: 640
}