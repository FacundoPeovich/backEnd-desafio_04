const socket = io();

socket.emit("message", "Mensaje desde el Front");
socket.on("message", data => {
    console.log(data);
})

//Captura de variables de DOM
const productosLista = document.getElementById("lista_productos");

socket.on("productos", data => {
    console.log("productos enviados del baccck")
    productosLista.innerHTML = ""
    for (const el of data) {
        const li = document.createElement("li");
        li.innerText = `${el.description}:$ ${el.price}`;
        productosLista.appendChild(li);
    }
}
)
