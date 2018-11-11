class DpCities extends Cities {
  constructor(citiesList, orderList) {
    super(citiesList, orderList);
    // List of subset indexes
    this.subsetsIdx = [];
    // List of objects of results
    this.store = [];

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

  buildSimpleSubsets() {
    let leftCities = this.order.slice(1);
    let defaultStoreItem = {
      subset: [],
      subsetIdx: 0,
      endPoint: 0,
      minPath: 1000000000
    };
    for (let c in leftCities) {
      let storeItem = iterationCopy(defaultStoreItem);
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
