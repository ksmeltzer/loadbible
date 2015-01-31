module.exports.convertAssociativeArrayToNumericArray = function (associtiveArray)
{
    var numericArray = [];
    for (var item in associtiveArray) {
        numericArray.push(associtiveArray[ item ]);
    }
    return numericArray;
};
