import {Router} from "express";
//import {ProductManagerFile} from "../managers/ProductManagerFile.js";
import {ProductManagerFile} from "../managers/ProductManagerFile.js"


const path = "products.json";
const router = Router();
const productManagerFile = new ProductManagerFile(path);

router.get('/', async (req,res)=>{
    let limite = req.query.limit;
    limite = parseInt(limite);
    let products = await productManagerFile.getProducts()
    if (limite && limite > 0){
        if (limite > products.length) {
            limite = products.length
        }
        let i;
        let productosAcotados = [];
        for (i=0;i<=limite-1;i++) { 
            productosAcotados.push(products[i]);
        }
        products = productosAcotados;
    }
    
        res.send({
            status:"succes",
            productos: products
        })
    
})

router.get('/:pid', async (req,res)=>{
    const pid = req.params.pid;
    const product = await productManagerFile.getProductById(pid);
    res.send({
        status:"succes",
        msg:"Product hallado",
        product
    })
})

router.post('/', async (req,res)=>{ 

    const product = req.body;//json con el producto

    const products = await productManagerFile.createProduct(product);

    res.send({
        status:"succes",
        msg:"Producto creado",
        productos: products
    })
})

router.put('/:pid', async (req,res)=>{
    const pid = req.params.pid;
    const product = req.body;
    const products = await productManagerFile.updateProduct(pid, product);
    res.send({
        status:"succes",
        msg:`Ruta PUT de PRODUCTS con ID: ${pid}`,
        productos: products

    })
})

router.delete('/:pid', async (req,res)=>{
    const pid = req.params.pid;
    const products = await productManagerFile.deleteProduct(pid);
    res.send({
        status:"succes",
        msg:`Ruta DELETE de PRODUCTS con ID: ${pid}`,
        productos: products
    })
})

export {router as productRouter};