var totalCities = 8
var cities = []
var order = []
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

    c = new Cities(cities.slice(), order.slice())
    c2 = new Cities(cities.slice(), order.slice())
    

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

    push()
    c.drawPaths()
    c.drawBestPath()
    c.drawCities()
    c.calculate()

    drawText(c.order)
    pop()
    
    push()
    translate(width/2, 0)
    c2.drawPaths()
    c2.drawBestPath()
    c2.drawCities()
    c2.calculate()

    drawText(c2.order)
    pop()
}