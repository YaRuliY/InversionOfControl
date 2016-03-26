var fs = require('fs'), vm = require('vm');

var context = {
  module: {},
  console: console,
  fs: cloneInterface(fs),
  setTimeout: function(callback, timeout) {
    console.log(
      'Call: setTimeout, ' +
      'CallbackFunction: ' + callback.name + ', ' +
      'TimeoutInContext: ' + timeout
    );
    setTimeout(function() {
      var d1 = Date.now();
      console.log('---Event: setTimeout, before callback');
      callback();
      console.log('---Event: setTimeout, after callback');
      var d2 = Date.now();
      var d3 = d2-d1;
      console.log('---Time of execution: ' + d3);
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
    clone[key] = toWrap(key, InterName[key]);
  }
  return clone;
}

function toWrap(fnName, fn) {
  return function wrapper() {
    var args = [];
    Array.prototype.push.apply(args, arguments);
    if (typeof(args[args.length - 1]) === 'function'){
      args[args.length - 1] =
          toWrap(args[args.length - 1].name, args[args.length - 1]);
      console.log('___________arguments_begin____');
      console.log(args);
      console.log('___________arguments_end______');
    }
    console.log('Call function in the wrapper: ' + fnName);
    return fn.apply(undefined, args);
  }
}