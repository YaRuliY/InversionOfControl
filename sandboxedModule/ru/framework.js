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
    var modula = sandbox.module.exports;
    modula.action();
});