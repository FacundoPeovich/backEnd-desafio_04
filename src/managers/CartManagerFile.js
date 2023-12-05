import fs from "fs";
import path from "path";
import { __dirname, generarIdUnico } from "../utils.js";

class CartManagerFile {
  constructor(pathFile) {
    this.path = path.join(__dirname, `/files/${pathFile}`);
  }

  getCarts = async () => {
    if (fs.existsSync(this.path)) {
      const data = await fs.promises.readFile(this.path, "utf-8");
      const carts = JSON.parse(data);
      return carts;
    } else {
      return [];
    }
  };

  getIdCart = async (idCart) => {
    const carts = await this.getCarts();
    try {
      //const idCartParse = parseInt(idCart);

      const cartsIndex = carts.findIndex((cart) => cart.id === idCart);

      if (cartsIndex >= 0) {
        const cart = carts[cartsIndex];
        const products = cart.products.map( product => product);
        return products;
      }
    } catch {
      console.log("Error en lectura de archivos!!");
    }
  };

  createCarts = async () => {
    const carts = await this.getCarts();
    const cart = { products: [], id: generarIdUnico() };
    carts.push(cart);
    await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"));
    try {
      return carts;
    } catch {
      console.log("Error en lectura de archivoss!!");
    }
  };

  updateCarts = async (idCart, idProduct) => {
    const carts = await this.getCarts();
    
    try {

        const cartsIndex = carts.findIndex((cart) => cart.id === idCart);

      if (cartsIndex >= 0) {
        //Busco el objeto producto con idProduct en el array products que reside dentro del objeto cart
        const cart = carts[cartsIndex];

        const productIndex = cart.products.findIndex(
          (product) => product.id === idProduct
        );

        if (productIndex >= 0) {
          cart.products[productIndex].quantity += 1;
        } else {
          const product = {
            id: idProduct,
            quantity: 1,
          };
          cart.products.push(product);
          carts[cartsIndex] = cart;
        }

        await fs.promises.writeFile(
          this.path,
          JSON.stringify(carts, null, "\t")
        );
        try {
          return carts;
        } catch {
          console.log("Error en lectura de archivoss!!");
        }
      } else {
        console.log(`NO EXISTE CART, CON EL ID: ${idCart}`);
      }
    } catch {
      console.log("Error en lectura de archivos!!");
    }
    //
  };
}

export { CartManagerFile };
