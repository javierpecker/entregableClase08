"use strict";

var _express = _interopRequireDefault(require("express"));

var _productos = _interopRequireDefault(require("./productos"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var puerto = 8080;
var server = app.listen(puerto, function () {
  return console.log('Server up en puerto', puerto);
});
server.on('error', function (err) {
  console.log('ERROR ATAJADO', err);
});
var miProducto = new _productos["default"]();
app.get('/api/productos/listar', function (req, res) {
  var data = miProducto.readlist();

  if (data.length == 0) {
    res.json({
      msg: 'no hay productos cargados'
    });
  }

  res.json({
    data: data
  });
});
app.get('/api/productos/listar/:id', function (req, res) {
  var id = req.params.id;
  var data = miProducto.readbyid(id);

  if (!data) {
    res.json({
      msg: 'Error producto no encontrado'
    });
  }

  res.json({
    data: data
  });
});
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));
app.post('/api/productos/guardar', function (req, res) {
  var body = req.body;
  var producto = miProducto.savedata(body);

  if (producto == 'error') {
    return res.status(400).json({
      msg: 'Necesito en el body tittle, price and thumbnail'
    });
  }

  res.json({
    producto: producto
  });
});