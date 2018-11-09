// // Solves salesperson by checking all possible permutations
// function bruteForce() {
//     // Draw every path tested
//     stroke(202, 200)
//     strokeWeight(2)
//     noFill()
//     beginShape()
//     for (let i = 0; i < order.length; i++) {
//         let city = order[i]
//         vertex(cities[city].x, cities[city].y);
//     }
//     endShape()

//     // Draw the best path until now
//     stroke(255, 20, 200)
//     strokeWeight(4)
//     noFill()
//     beginShape()
//     for (let i = 0; i < best.length; i++) {
//         vertex(cities[best[i]].x, cities[best[i]].y);
//     }
//     endShape()

//     // Draw the nodes
//     noStroke()
//     fill(202)
//     for (let i = 0; i < cities.length; i++) {
//         ellipse(cities[i].x, cities[i].y, 16, 16);
//     }

//     // Calculates path distance and saves the best till now
//     let d = calcDistance(cities, order);
//     if (d < recordDistance) {
//         recordDistance = d
//         best = order.slice()
//     }
// }

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
}
