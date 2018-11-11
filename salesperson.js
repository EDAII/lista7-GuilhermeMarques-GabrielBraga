class Cities {
  constructor(citiesList, orders) {
    this.originCity = 0;
    this.cities = citiesList;
    this.order = orders;
    this.adjMatrix = [];
    // Builds an empty distance matrix
    for (var i = 0; i < this.cities.length; i++) {
      this.adjMatrix[i] = [];
      for (var j = 0; j < this.cities.length; j++) {
        this.adjMatrix[i][j] = 0;
      }
    }
  }

  buildMatrix() {
    for (let i in this.adjMatrix) {
      for (let j in this.adjMatrix[i]) {
        if (i != j) {
          let cityA = this.cities[i];
          let cityB = this.cities[j];
          this.adjMatrix[i][j] = dist(cityA.x, cityA.y, cityB.x, cityB.y);
        }
      }
    }
  }

  setBestOrder(bestOrder, recordDistance) {
    this.recordDistance = recordDistance;
    this.best = bestOrder;
  }

  drawCities() {
    noStroke();
    fill(202);
    for (let i = 0; i < this.cities.length; i++) {
      if (i === this.originCity) {
        fill(255, 252, 122);
      } else {
        fill(202);
      }
      ellipse(this.cities[i].x, this.cities[i].y, 8, 8);
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
    strokeWeight(2);
    noFill();
    beginShape();
    for (let i = 0; i < this.best.length; i++) {
      vertex(this.cities[this.best[i]].x, this.cities[this.best[i]].y);
    }
    endShape();
  }
}
