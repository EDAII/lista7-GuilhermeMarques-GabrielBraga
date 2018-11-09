var cities = []
var totalCities = 6

var order = [];

var recordDistance;
var best;

function setup() {

    createCanvas(400, 600)
    for (let i = 0; i < totalCities; i++) {
        let x = random(width)
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


    // Draw every path tested
    stroke(202, 200)
    strokeWeight(2)
    noFill()
    beginShape()
    for (let i = 0; i < order.length; i++) {
        let city = order[i]
        vertex(cities[city].x, cities[city].y);
    }
    endShape()


    // Draw the best path until now
    stroke(255, 20, 200)
    strokeWeight(4)
    noFill()
    beginShape()
    for (let i = 0; i < best.length; i++) {
        vertex(cities[best[i]].x, cities[best[i]].y);
    }
    endShape()


    // Draw the nodes
    noStroke()
    fill(202)
    for (let i = 0; i < cities.length; i++) {
        ellipse(cities[i].x, cities[i].y, 16, 16);
    }

    // Calculates path distance and saves the best till now
    let d = calcDistance(cities, order);
    if (d < recordDistance) {
        recordDistance = d
        best = order.slice()
    }

    // Draw current permutation
    drawText()
    // Calculates next permutation
    nextOrder()
}

function drawText() {
    textSize(64);
    var s = "";
    for (let i = 0; i < order.length; i++) {
      s += order[i];
    }
    fill(255);
    text(s, 5, height - 5);
}

function swap(a, i, j) {
    let tmp = a[i]
    a[i] = a[j]
    a[j] = tmp
}

function calcDistance(points, orders) {
    var sum = 0;
    for (var i = 0; i < orders.length - 1; i++) {
        var cityA = points[orders[i]]
        var cityB = points[orders[i + 1]]
        var d = dist(cityA.x, cityA.y, cityB.x, cityB.y);
        sum += d;
    }

    return sum;
}

function nextOrder() {
    let largestI = -1;
    for (let i = 0; i < order.length - 1; i++) {
        if (order[i] < order[i + 1]) {
            largestI = i
        }
    }

    if (largestI === -1) {
        noLoop()
        console.log('FINISH');
    }

    let largestJ = -1;
    for (let j = 0; j < order.length; j++) {
        if (order[largestI] < order[j]) {
            largestJ = j;
        }
    }

    swap(order, largestI, largestJ)

    var endArray = order.splice(largestI + 1)
    endArray.reverse()
    order = order.concat(endArray)

}