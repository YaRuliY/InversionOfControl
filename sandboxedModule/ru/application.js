console.log('From application global context');

module.exports = {};
module.exports.action = function() {
    console.log('From application exported function');

    console.log('isArray([1,2,4]) -> ' + util.isArray([1,2,4]));
    var interval = setInterval(function(){
        console.log("in interval");
    }, 1000);
    setTimeout(function(){
        clearInterval(interval);
        console.log("the end");
    }, 3000);
};