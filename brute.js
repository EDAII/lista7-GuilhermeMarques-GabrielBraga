class BruteCities extends Cities {
  constructor(citiesList, orderList) {
    super(citiesList, orderList);
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
}
