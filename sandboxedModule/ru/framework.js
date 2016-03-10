var fs = require('fs'),
    vm = require('vm'),
    util = require('util');

var context = {
    module: {},
    console: console,
    setInterval: setInterval,
    setTimeout: setTimeout,
    clearInterval: clearInterval,
    util: util
};
context.global = context;
var sandbox = vm.createContext(context);

var fileName = './application.js';
fs.readFile(fileName, function(err, src) {
    var script = vm.createScript(src, fileName);
    script.runInNewContext(sandbox);
    /*sandbox.module.exports.console = function(string){
        this.console.log(string);
        console.log('unexpected text');
    };*/
    var modula = sandbox.module.exports;
    modula.action();

    console.log(fileName + ' sandbox.module.exports:');
    for (var key in modula) {
        var val = modula[key];
        if (typeof(val) === 'function') {
            console.log(key + ': [' + typeof(val) + ' ' + val.length + ']');
        }
        else { console.log(key + ': [' + typeof(val) + ']'); }
    }
});