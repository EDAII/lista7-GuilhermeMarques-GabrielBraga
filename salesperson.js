class Cities {
  constructor(citiesList, orders) {
    this.cities = citiesList;
    this.order = orders;
    this.adjMatrix = [];
    for (var i = 0; i < this.cities.length; i++) {
      this.adjMatrix[i] = [];
      for (var j = 0; j < this.cities.length; j++) {
        this.adjMatrix[i][j] = 0;
      }
    }
    console.log(this.adjMatrix)
  }

  buildMatrix() {
    for(let i in this.adjMatrix) {
      for(let j in this.adjMatrix[i]) {
        if (i != j) {
          let cityA = this.cities[i]
          let cityB = this.cities[j]
          this.adjMatrix[i][j] = dist(cityA.x, cityA.y, cityB.x, cityB.y)
        }
      }
    }

    console.log(this.adjMatrix)
  }

  setBestOrder(bestOrder, recordDistance) {
    this.recordDistance = recordDistance;
    this.best = bestOrder;
  }

  drawSubPath(origin, destiny) {
    let cityA = this.cities[origin]
    let cityB = this.cities[destiny]
    stroke(255, 100, 0);
    strokeWeight(2)
    beginShape()
    vertex(cityA.x, cityA.y)
    vertex(cityB.x, cityB.y);
    endShape()
    this.drawCities()
  }

  drawCities() {
    noStroke();
    fill(202);
    for (let i = 0; i < this.cities.length; i++) {
      ellipse(this.cities[i].x, this.cities[i].y, 16, 16);
    }
  }

  drawPaths() {
    stroke(202, 200);
    strokeWeight(2);
    noFill();
    beginShape();
    for (let i = 0; i < this.order.length; i++) {
      let city = this.order[i];
      vertex(this.cities[city].x, this.cities[city].y);
    }
    endShape();
  }

  drawBestPath() {
    stroke(255, 20, 200);
    strokeWeight(4);
    noFill();
    beginShape();
    for (let i = 0; i < this.best.length; i++) {
      vertex(this.cities[this.best[i]].x, this.cities[this.best[i]].y);
    }
    endShape();
  }

  calculate() {    
    var sum = 0;
    let d = 0;
    for (var i = 0; i < this.order.length - 1; i++) {
      var idxA = this.order[i]
      var idxB = this.order[i + 1]
      d = this.adjMatrix[idxA][idxB]
      sum += d;
    }
    
    if (sum < this.recordDistance && sum != 0) {
      this.recordDistance = sum;
      this.best = this.order.slice();
    }
    
    this.order = nextOrder(this.order);
  }

  distance(subset, origin) {
    console.log('ENTER DISTANCE')
    let minDist = 100000000
    let d

    if (subset.length === 1) {
      return 0
    }

    for (let node in subset) {
      if (node != origin) {
        this.drawSubPath(origin, node)
        d = this.adjMatrix[origin][node]
        if (d < minDist) {
          minDist = d
        }
      }
    }

    return minDist
  }
  
  solve(index) {
    console.log('ENTER SOLVE')
    this.distance(this.order, index)
  }
}
