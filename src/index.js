import express from 'express';
import Producto from './productos';

const app = express();
const puerto = 8080;
const server = app.listen(puerto, () =>
  console.log('Server up en puerto', puerto)
);
server.on('error', (err) => {
  console.log('ERROR ATAJADO', err);
});

const miProducto = new Producto();
app.get('/api/productos/listar', (req, res) => {
  const data = miProducto.readlist();
  if (data.length == 0) {
    res.json({
      msg: 'no hay productos cargados',
    });
  }
  res.json({
    data,
  });
});

app.get('/api/productos/listar/:id', (req, res) => {
  const id = req.params.id;
  const data = miProducto.readbyid(id);
  if (!data) {
    res.json({
      msg: 'Error producto no encontrado',
    });
  }
  res.json({
    data,
  });
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post('/api/productos/guardar', (req, res) => {
  const body = req.body;
  const producto = miProducto.savedata(body);
  if (producto == 'error'){
    return res.status(400).json({
      msg: 'Necesito en el body tittle, price and thumbnail',
    });
  }
  res.json({
    producto,
  });
});
