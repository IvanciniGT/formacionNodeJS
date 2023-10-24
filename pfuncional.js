
let texto = "hola";

// "hola"       Poner un objeto de tipo texto en RAM con valor "hola"
// let texto    Definir una variable con nombre texto, que puede apuntar a cualquier TIPO DE DATO.
// =            Asigno la variable texto al valor "hola"

texto = "adios"
// "adios"      Poner un objeto de tipo texto en RAM con valor "adios"
                // Donde? En otro sitio
// texto =     Asigno la variable texto al valor "adios"
// Arranco el postit de donde estaba pegao y lo apunto al nuevo sitio

function saluda(nombre) {
    console.log("Hola " + nombre);
}

saluda("felipe")

let miFuncion = saluda
miFuncion("felipe")

function generarSaludoNormal(nombre) {
    return "Hola " + nombre;
}
function generarSaludoFormal(nombre) {
    return "Buenos días Don/Doña" + nombre;
}

function imprimirSaludo(generadorDeSaludos, nombre){
    console.log(generadorDeSaludos(nombre));
}

imprimirSaludo(generarSaludoNormal, "Felipe");
imprimirSaludo(generarSaludoFormal, "Felipe");


             /// Expresión
let numero = 5+6; // STATEMENT
let operacion = numero => numero * 2 // Statement
                //////////////////    Expresión lamba... funciones flecha
                // Expresión lambda: Trozo de código que devuelve una función anónima recién creada dentro del statement.

function triple(numero) {
    return numero * 3
}

let triple = (numero) => {
    return numero * 3
}

let triple = numero => numero * 3


