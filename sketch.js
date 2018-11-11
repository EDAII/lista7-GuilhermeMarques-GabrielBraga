var totalCities = 6
var cities = []
var order = []
let globalIdx = 0
var recordDistance
var best
var c
var c2

function setup() {

    createCanvas(innerWidth, innerHeight)
    for (let i = 0; i < totalCities; i++) {
        let x = random(0, width/2);
        let y = random(height / 2)
        cities[i] = createVector(x, y);
        order[i] = i
    }

    c = new BruteCities(cities.slice(), order.slice())
    c2 = new DpCities(cities.slice(), order.slice())
    

    let d = calcDistance(cities, order)
    recordDistance = d
    best = order.slice()

    c.setBestOrder(best.slice(), recordDistance)
    c2.setBestOrder(best.slice(), recordDistance)

    c.buildMatrix()
    c2.buildMatrix()
}

function draw() {
    background(55)
    frameRate(3)

    push()
    c.drawPaths()
    c.drawBestPath()
    c.drawCities()
    c.calculate()

    drawText(c.order)
    pop()
    
    push()
    translate(width/2, 0)
    c2.solve(0);
    drawText(c2.order)
    // noLoop();
    pop()
}