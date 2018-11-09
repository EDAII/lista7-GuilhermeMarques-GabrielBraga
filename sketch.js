var totalCities = 6
var cities = []

var order = [];

var recordDistance;
var best;

function setup() {

    createCanvas(innerWidth, innerHeight)
    for (let i = 0; i < totalCities; i++) {
        let x = constrain(random(width), 30, width/2 - 30);
        let y = random(height / 2)
        cities[i] = createVector(x, y);
        order[i] = i
    }

    let d = calcDistance(cities, order)
    recordDistance = d
    best = order.slice()
}

function draw() {
    background(55)


    bruteForce()

    // Draw current permutation
    drawText()
    // Calculates next permutation
    nextOrder()
}