var fs = require('fs'),
    vm = require('vm');

var context = {
  module: {},
  console: console,
  fs: cloneInterface(fs),
  setTimeout: function(callback, timeout) {
    console.log(
      'Call: setTimeout, ' +
      'callback function: ' + callback.name + ', ' +
      'timeout: ' + timeout
    );
    setTimeout(function() {
      var d1 = Date.now();
      console.log('Event: setTimeout, before callback');
      callback();
      console.log('Event: setTimeout, after callback');
      var d2 = Date.now();
      var d3 = d2-d1;
      console.log('time of execution: ' + d3);
    }, timeout);
  }
};

context.global = context;
var sandbox = vm.createContext(context);

var fileName = './application.js';
fs.readFile(fileName, function(err, src) {
  var script = vm.createScript(src, fileName);
  script.runInNewContext(sandbox);
});

function cloneInterface(InterName){
  var clone = {};
  for (var key in InterName){
    clone[key] = wrapFunction(key, InterName[key]);
  }
  return clone;
}

function wrapFunction(fnName, fn) {
  return function wrapper() {
    var args = [];
    Array.prototype.push.apply(args, arguments);
    if (typeof(args[args.length - 1]) === 'function'){
      var func = args[args.length - 1];
      args[args.length - 1] =
          wrapFunction(args[args.length - 1].name, args[args.length - 1]);
      console.log('arguments - >' + args);
    }
    console.log('Call: ' + fnName);
    return fn.apply(undefined, args);
  }
}