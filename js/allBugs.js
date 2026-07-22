export const BUGS = [
    {
        id: "alder-leaf",

        name: "Alder Leaf Beetle",

        sprite: "assets/bug/leafBeetle/leafBeetle.png",

        frameWidth: 64,
        frameHeight: 80,
        frames: 12,

        scale: 0.75,

        speed: 0.7,

        pause: {
            min: 1500,
            max: 4500,
        },
    },

    {
        id: "another",

        name: "Another Bug",

        sprite: "assets/bug/sunBeetle/sunBeetle.png",

        frameWidth: 64,
        frameHeight: 64,
        frames: 12,

        scale: 0.8,

        speed: 0.5,

        pause: {
            min: 2000,
            max: 6000,
        },
    },
];

export function getRandomBug() {
    return BUGS[Math.floor(Math.random() * BUGS.length)];
}
