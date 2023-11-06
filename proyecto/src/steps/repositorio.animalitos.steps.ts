import { Given, When, Then, setWorldConstructor, World} from '@cucumber/cucumber';
import { getAnimalitosRepository } from '../app/dependencias';
import { expect, assert } from 'chai';
import { AnimalitoRepository } from '../persistence/repository/animalito.repository';
import { DatosAnimalito } from '../persistence/model/datos.animalito';
import { Animalito } from '../persistence/model/animalito';

class MiPrueba{
    repositorioDeAnimalitos?: AnimalitoRepository;
    datosDeNuevoAnimalito?: DatosAnimalito;
    animalitoDevuelto?: Animalito;
    animalitoDevueltoId?: number;
}
setWorldConstructor(MiPrueba);
// Cucumber para CADA ESCENARIO genera una instancia de esta clase

// Podemos pasar datos de unas funciones a otras, añadiendo los datos que queramos pasar al this. de cada función
Given('un repositorio de animalitos aislado', function (this: MiPrueba) {
    this.repositorioDeAnimalitos = getAnimalitosRepository();
});

Given('dado los datos de un nuevo animalito', function (this: MiPrueba) {
    this.datosDeNuevoAnimalito = {
        nombre: "",
        raza: "",
        edad: 0
    }
});

Given('entre los datos encuentro el dato {string}: {string}', function (this: MiPrueba, campo:string, valor:string) {
    if(campo === "nombre"){
        this.datosDeNuevoAnimalito!.nombre = valor;
    }else if(campo === "raza"){
        this.datosDeNuevoAnimalito!.raza = valor;
    }
});

Given('entre los datos encuentro el dato {string}: {int}', function (this: MiPrueba, campo:string, valor:number) {
    if(campo === "edad"){
        this.datosDeNuevoAnimalito!.edad = valor;
    }
});

When('solicito al repositorio la persistencia de los datos del nuevo animalito', async function (this: MiPrueba) {
    this.animalitoDevuelto = await this.repositorioDeAnimalitos!.newAnimalito(this.datosDeNuevoAnimalito!);
    this.animalitoDevueltoId = this.animalitoDevuelto.id;
});

When('solicito al repositorio la recuperación del animalito con el id anterior', async function (this: MiPrueba) {
    this.animalitoDevuelto = await this.repositorioDeAnimalitos!.get(this.animalitoDevueltoId!);
});

Then('el repositorio me devuelve el nuevo animalito', function (this: MiPrueba) {
    expect(this.animalitoDevuelto).to.be.not.undefined
});

Then('ese animalito devuelto tiene un "id" igual al anterior', function (this: MiPrueba) {
    expect(this.animalitoDevuelto!.id).to.be.equal(this.animalitoDevueltoId)
});

Then('ese animalito devuelto tiene por {string}: {string}', function (this: MiPrueba,campo:string, valor:string) {
    let dato = this.animalitoDevuelto!.nombre;
    if(campo === "raza"){
        dato = this.animalitoDevuelto!.raza;
    }
    expect(dato).to.be.equal(valor)
});

Then('ese animalito devuelto tiene por {string}: {int}', function (this: MiPrueba,campo:string, valor:number) {
    let dato = this.animalitoDevuelto!.edad;
    expect(dato).to.be.equal(valor)
});

Then('ese animalito devuelto tiene un {string} mayor que {int}', function (this: MiPrueba,campo:string, valorMinimo:number) {
    expect(this.animalitoDevuelto!.id).to.be.greaterThan(valorMinimo)
});

When('voy a solicitar al repositorio la persistencia de los datos del nuevo animalito', function (this: MiPrueba) {
});

Then('devuelve un error de validación', async function (this: MiPrueba) {
    try{
        await this.repositorioDeAnimalitos!.newAnimalito(this.datosDeNuevoAnimalito!);
    }catch(error){
        return 
    }
    // Aquí directamente lanzo el fallo
    assert.fail("No se ha producido ningún error... cuando debería haberse producido")
});