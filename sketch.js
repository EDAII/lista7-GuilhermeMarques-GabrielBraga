var totalCities = 6
var cities = []
var order = []
var recordDistance
var best
var c

function setup() {

    createCanvas(innerWidth, innerHeight)
    for (let i = 0; i < totalCities; i++) {
        let x = random(0, width/2);
        let y = random(height / 2)
        cities[i] = createVector(x, y);
        order[i] = i
    }

    c = new Cities(cities, order)
    

    let d = calcDistance(cities, order)
    recordDistance = d
    best = order.slice()

    c.setBestOrder(best, recordDistance)
    console.log(c.best)
}

function draw() {
    background(55)

    push()
    c.drawPaths()
    c.drawBestPath()
    c.drawCities()
    c.calculate()

    drawText(c.order)
    pop()
}