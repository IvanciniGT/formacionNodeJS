"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const dependencias_1 = require("../app/dependencias");
const chai_1 = require("chai");
class MiPrueba {
}
(0, cucumber_1.setWorldConstructor)(MiPrueba);
// Cucumber para CADA ESCENARIO genera una instancia de esta clase
// Podemos pasar datos de unas funciones a otras, añadiendo los datos que queramos pasar al this. de cada función
(0, cucumber_1.Given)('un repositorio de animalitos aislado', function () {
    this.repositorioDeAnimalitos = (0, dependencias_1.getAnimalitosRepository)();
});
(0, cucumber_1.Given)('dado los datos de un nuevo animalito', function () {
    this.datosDeNuevoAnimalito = {
        nombre: "",
        raza: "",
        edad: 0
    };
});
(0, cucumber_1.Given)('entre los datos encuentro el dato {string}: {string}', function (campo, valor) {
    if (campo === "nombre") {
        this.datosDeNuevoAnimalito.nombre = valor;
    }
    else if (campo === "raza") {
        this.datosDeNuevoAnimalito.raza = valor;
    }
});
(0, cucumber_1.Given)('entre los datos encuentro el dato {string}: {int}', function (campo, valor) {
    if (campo === "edad") {
        this.datosDeNuevoAnimalito.edad = valor;
    }
});
(0, cucumber_1.When)('solicito al repositorio la persistencia de los datos del nuevo animalito', function () {
    return __awaiter(this, void 0, void 0, function* () {
        this.animalitoDevuelto = yield this.repositorioDeAnimalitos.newAnimalito(this.datosDeNuevoAnimalito);
        this.animalitoDevueltoId = this.animalitoDevuelto.id;
    });
});
(0, cucumber_1.When)('solicito al repositorio la recuperación del animalito con el id anterior', function () {
    return __awaiter(this, void 0, void 0, function* () {
        this.animalitoDevuelto = yield this.repositorioDeAnimalitos.get(this.animalitoDevueltoId);
    });
});
(0, cucumber_1.Then)('el repositorio me devuelve el nuevo animalito', function () {
    (0, chai_1.expect)(this.animalitoDevuelto).to.be.not.undefined;
});
(0, cucumber_1.Then)('ese animalito devuelto tiene un "id" igual al anterior', function () {
    (0, chai_1.expect)(this.animalitoDevuelto.id).to.be.equal(this.animalitoDevueltoId);
});
(0, cucumber_1.Then)('ese animalito devuelto tiene por {string}: {string}', function (campo, valor) {
    let dato = this.animalitoDevuelto.nombre;
    if (campo === "raza") {
        dato = this.animalitoDevuelto.raza;
    }
    (0, chai_1.expect)(dato).to.be.equal(valor);
});
(0, cucumber_1.Then)('ese animalito devuelto tiene por {string}: {int}', function (campo, valor) {
    let dato = this.animalitoDevuelto.edad;
    (0, chai_1.expect)(dato).to.be.equal(valor);
});
(0, cucumber_1.Then)('ese animalito devuelto tiene un {string} mayor que {int}', function (campo, valorMinimo) {
    (0, chai_1.expect)(this.animalitoDevuelto.id).to.be.greaterThan(valorMinimo);
});
(0, cucumber_1.When)('voy a solicitar al repositorio la persistencia de los datos del nuevo animalito', function () {
});
(0, cucumber_1.Then)('devuelve un error de validación', function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield this.repositorioDeAnimalitos.newAnimalito(this.datosDeNuevoAnimalito);
        }
        catch (error) {
            return;
        }
        // Aquí directamente lanzo el fallo
        chai_1.assert.fail("No se ha producido ningún error... cuando debería haberse producido");
    });
});
