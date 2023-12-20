import express from 'express';
import handlebars from "express-handlebars";
//import {engine} from "express-handlebars";
import { __dirname } from "./utils.js";
import { cartRouter } from './routes/carts.routes.js';
import { productRouter } from './routes/products.routes.js';
import viewRouter from "./routes/views.route.js";
import { Server } from "socket.io";
import { ProductManagerFile } from "./managers/ProductManagerFile.js";

const path = "products.json";
const productManagerFile = new ProductManagerFile(path);

const PORT = 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Se configura handlebars
app.engine("handlebars", handlebars.engine())
//app.engine("handlebars",engine())

app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use(express.static(__dirname + "/public"));

const httpServer = app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto: ${PORT}`);
})

const socketServer = new Server(httpServer);
//const io = new Server(httpServer);

//Rutas
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

app.use("/", viewRouter);

//Servidor webSocket
socketServer.on("connection", (socket) => {
  console.log("Nuevo cliente conectado");
  socket.emit("message", "mensaje desde el back");

  socket.on("message", (data) => {
    console.log(data);
  });

  // Obtengo los productos usando productManagerFile
  productManagerFile
    .getProducts()
    .then((products) => {
      socket.emit("productos", products);
    })
    .catch((error) => {
      console.error("Error obteniendo productos:", error.message);
    });
});

