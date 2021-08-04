class Producto {
    productos;
    constructor() {
      this.productos = [];
    }

    readlist() {
      return this.productos;
    }

    readbyid(id) {
      return this.productos.find((producto) => producto.id == id);
    }
    
    savedata(dato) {
      console.log(dato)
      //valido que los datos ingresados sean coherentes
      if (
        !dato.title ||
        !dato.price ||
        !dato.thumbnail ||
        typeof dato.title != 'string' ||
        //utilizar raw desde postman para insertar datos con price 'numbre'. Sino arroja error.
        typeof dato.price != 'number' ||
        typeof dato.thumbnail != 'string'
      ) {
        return 'error'
      };
      const producto = { 
        id: this.productos.length +1,
        tittle: dato.title,
        price: dato.price,
        thumbnail: dato.thumbnail,
         };
      this.productos.push(producto);
      return producto;
    }
  }
  
  export default Producto;