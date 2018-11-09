function drawText(order) {
    textSize(64);
    var s = "";
    for (let i = 0; i < order.length; i++) {
        s += order[i];
    }
    fill(255);
    text(s, 25, height - 25);
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

function nextOrder(order) {
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
    return order
}