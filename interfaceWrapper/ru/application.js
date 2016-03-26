//console.log('From application global context');

var fileName = './README.md';

//console.log('Application going to read ' + fileName);
fs.readFile(fileName, function(err, src) {
  console.log('+++File ' + fileName + '; size ->' +
      src.length + ' in App');
});

var logger = fs.createWriteStream( './file.log', {flags: 'r+'} );
logger.write('some text');
console.log('+++Data was written in the logFile');

console.log('\nBefore TimeOut\n');
setTimeout(function(){
  console.log('+++Set TimeOut in App');
  var reader = fs.createReadStream('./file.log');
  var data = '';
  reader.on('data', function(text) {
    data += text;
  });
  reader.on('end', function() {
    console.log('+++Text in the logfile: ' + data);
  });
}, 1000);