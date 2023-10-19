var dict = {
    x: 1,
    y: 6,
    z: 9,
    a: 5,
    b: 7,
    c: 11,
    d: 17,
    t: 3,
};

var array = [];

for (var k in dict) {
    array.push({ key: k, val: dict[k] });
}

array.sort(function (first, second) {
    return first.val - second.val;
});

var sortedObj = {};
for (var i in array) {
    var row = array[i];
    sortedObj[row.key] = row.val;
}

console.log(sortedObj);
// { x: 1, t: 3, a: 5, y: 6, b: 7, z: 9, c: 11, d: 17 }
