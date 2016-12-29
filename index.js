var express = require('express');
var app = express();
var fs = require('fs');
var ejs = require('ejs');
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});
app.get('/products', function(req, res) {
  fs.readFile('products.json', 'utf8', function(err, data) {
    var products = JSON.parse(data);
    res.locals = { products: products };
    res.render('products.ejs');
  });
});
app.get('/products/:id', function(req, res) {
  fs.readFile('products.json', 'utf8', function(err, data) {
    var productsParsed = JSON.parse(data);
    var product = productsParsed.filter( function(obj) {
      return obj.id === parseInt(req.params.id);
    });

    if (product.length)
      product = product[0];
    else
      product = null;

    res.locals = { product: product };
    res.render('product.ejs');
  });
});

app.listen(8080);
