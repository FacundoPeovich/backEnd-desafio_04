import { Router } from "express";
import {ProductManagerFile} from "../managers/ProductManagerFile.js";

//const io = new Server(httpServer);


const path = "products.json";
const router = Router();
const productManagerFile = new ProductManagerFile(path);
    


router.get("/", async (req,res)=>{
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
    res.render("home", {products})
})

router.get("/realTimeProducts", async (req,res)=>{
    res.render("realTimeProducts", {})
})



export default router ;