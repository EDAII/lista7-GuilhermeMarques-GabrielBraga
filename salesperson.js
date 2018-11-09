// Solves salesperson by checking all possible permutations
function bruteForce() {
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
}