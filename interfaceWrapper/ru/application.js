// Вывод из глобального контекста модуля
console.log('From application global context');

// Пример использования fs API
var fileName = './README.md';
console.log('Application going to read ' + fileName);
fs.readFile(fileName, function(err, src) {
  console.log('File ' + fileName + ' size ' + src.length);
});

var logger = fs.createWriteStream('./file.log', {flags: 'r+'});
logger.write('text');

/*var reader = fs.createReadStream('./file.log');*/

setTimeout(function(){
  console.log('out in app');
  var reader = fs.createReadStream('./file.log');
  var data = '';
  reader.on('data', function(param) {
    data+=param;
  });
  reader.on('end', function() {
    console.log('logfile: ' + data);
  });
}, 1000);