class Cities {
  constructor(citiesList, orders) {
    // Origin city for the held-karp algorithm
    this.originCity = 0;
    this.cities = citiesList;
    this.order = orders;
    this.adjMatrix = [];
    // List of subset indexes
    this.subsetsIdx = [];
    // List of objects of results
    this.store = [];
    // Builds an empty distance matrix
    for (var i = 0; i < this.cities.length; i++) {
      this.adjMatrix[i] = [];
      for (var j = 0; j < this.cities.length; j++) {
        this.adjMatrix[i][j] = 0;
      }
    }
    // List of subsets
    // Each subset is a set of indexes of cities
    this.subsets = getAllSubsets(this.order.slice(1));
    this.subsets.sort((a, b) => {
      return a.length - b.length;
    });
    for (let set in this.subsets) {
      this.subsetsIdx[set] = set;
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

  drawSubPath(origin, destiny) {
    let cityA = this.cities[origin];
    let cityB = this.cities[destiny];
    stroke(255, 100, 0);
    strokeWeight(2);
    beginShape();
    vertex(cityA.x, cityA.y);
    vertex(cityB.x, cityB.y);
    endShape();
    this.drawCities();
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

  calculate() {
    var sum = 0;
    let d = 0;
    for (var i = 0; i < this.order.length - 1; i++) {
      var idxA = this.order[i];
      var idxB = this.order[i + 1];
      d = this.adjMatrix[idxA][idxB];
      sum += d;
    }

    if (sum < this.recordDistance && sum != 0) {
      this.recordDistance = sum;
      this.best = this.order.slice();
    }

    this.order = nextOrder(this.order);
  }

  buildSimpleSubsets() {
    let leftCities = this.order.slice(1);
    let defaultStoreItem = {
      subset: [],
      subsetIdx: 0,
      endPoint: 0,
      minPath: 1000000000
    };
    for (let c in leftCities) {
      let storeItem = iterationCopy(defaultStoreItem)
      let d = this.minimalDistance(leftCities[c], this.subsetsIdx[0]);
      storeItem.subset = this.subsets[0];
      storeItem.subsetIdx = this.subsetsIdx[0];
      storeItem.endPoint = leftCities[c];
      storeItem.minPath = d;
      this.store.push(storeItem);
    }
  }

  minimalDistance(destiny, set) {
    let setIdx = set;
    set = this.subsets[set];
    let minDist = 10000000;
    if (!set.length) {
      this.drawSubPath(this.originCity, destiny);
      return this.adjMatrix[destiny][this.originCity];
    }
    return 1 + 1;
  }

  solve(index) {
    this.buildSimpleSubsets();
  }
}
