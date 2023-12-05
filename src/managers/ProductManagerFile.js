import fs from "fs";
import path from "path";
import { __dirname, generarIdUnico } from "../utils.js";
//import { title } from "process";



class ProductManagerFile {
  constructor(pathFile) {
    this.path = path.join(__dirname,`/files/${pathFile}`);
    //this.products = [];
  }

  getProducts = async () => {
    if (fs.existsSync(this.path)) {
      const data = await fs.promises.readFile(this.path, "utf-8");
      try {
        const products = JSON.parse(data);
        return products;
      } catch {
        console.log("Error en lectura de archivos!!");
      }
    } else {
      return [];
    }
  };


  createProduct = async ({title="", description="", code=0, price=0, status=true, stock=0, category="", thumbnails=[]}) => {

    const products = await this.getProducts();
    try {
     status=true;    //x si llega a venir con False
     const productoConId = { title, description, code, price, status, stock, category, thumbnails, id: generarIdUnico() };
      if (createProducValid(productoConId) === false) {     //validar propiedades
        console.log("Las propiedades del producto, no cumplen los requerimientos");
        return products;
      }
      products.push(productoConId);
      await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"));
      try {
        return products;
      } catch {
        console.log("Error en lectura de archivos!!");
      }
    } catch {
      console.log("Error en lectura de archivos!!");
    }
  };

 
 
  getProductById = async (id) => {
    const products = await this.getProducts();
    try {
      //console.log(products);
      let producto = products.find((producto) => {
        if (producto.id === id) {
          return producto;
        } else {
          return null;
        }
      });

      if (!producto) {
        console.log("Not found!");
      }
      return producto;
    } catch {
      console.log("Error en lectura de archivos!!");
    }
  };

  updateProduct = async (id, producto) => {
    const products = await this.getProducts();
 
    try {
      let index = products.findIndex((produc) => produc.id === id);
      if (index >= 0) {
        products[index] = producto;
        if (createProducValid(producto) === false) {     //validar propiedades
            console.log("Las propiedades del producto, no cumplen los requerimientos");
            return products;
          }
        products[index].id = id; //Para asegurarse que sigue el mismo id. de producto
        await fs.promises.writeFile(this.path,JSON.stringify(products, null, "\t"));
        try {
            return products;
        } catch {console.log("Error en lectura de archivos!!")}
      } else {
        console.log("Update fallido. Id. de producto no hallado!!");
      }
    } catch {console.log("Error en lectura de archivos!!")}
    //
  };

  deleteProduct = async (id) => {
    const products = await this.getProducts();
    try {
           let index = products.findIndex((producto) => producto.id === id);

    if (index >= 0) {
      products.splice(index, 1);
      await fs.promises.writeFile(this.path,JSON.stringify(products, null, "\t"));
      try {
        return products;
      } catch { console.log("Error en lectura de archivos!!")}
      
    } else {
      console.log("Delete fallido. Id. de producto no hallado!!");
      return null;
    }
 
    } catch {console.log("Error en lectura de archivos!!")}
  };

}

const createProducValid = ({ title, description, code, price, status, stock, category, thumbnails} ) => {
    
    //console.log("title: " + title)
    if (!title || !description || !code || !price || !status || !stock || !category || !thumbnails) {      //Se valida parametros undefined
        //console.log("Parametros obligatorios no definidos")
        return false;
    }
    if (title === "" || description === "" || code === 0 || price <= 0 || stock <= 0 || category === "") {
        //console.log("x false")
        return false;
    }
    console.log("x true")
    return true;
  }

export {ProductManagerFile};