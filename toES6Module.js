var fs = require('fs');

fs.readFile('./src/cookiejs.js', 'utf8', function(err, data) {
  if (err) {
    return console.log(err);
  }

  data = data.replace('module.exports = cookiejs;', 'export default cookiejs;');

  fs.writeFile('./cookiejs.es.js', data, 'utf8', function(err) {
    if (err) return console.log(err);
  });
});
