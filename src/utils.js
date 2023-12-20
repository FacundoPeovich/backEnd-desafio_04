import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



const generarIdUnico = () => {
    const parteAleatoria = Math.random().toString(36).substring(2, 11); // Genera una cadena aleatoria de 9 caracteres
    const marcaDeTiempo = Date.now().toString(36); // Convierte la marca de tiempo a una cadena hexadecimal
    const idUnico = parteAleatoria + marcaDeTiempo; // Combina la parte aleatoria con la marca de tiempo
    return idUnico;
  }

export {__dirname, generarIdUnico};