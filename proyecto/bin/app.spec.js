"use strict";
//describe()            Dado / Given
// it()                 Cuando / When
//  expect()            Entonces / Then
describe("Suma de 2 numeros", () => {
    it("Cuando sumo 2 + 2, debe devolverme 4", () => {
        expect(2 + 2).toEqual(4); // Entonces tiene que dar 4
    });
    it("Cuando sumo 2 + 3, debe devolverme 5", () => {
        expect(2 + 3).toEqual(5); // Entonces tiene que dar 4
    });
    it("Cuando sumo 3 + 3, debe devolverme 6", () => {
        expect(3 + 3).toEqual(6); // Entonces tiene que dar 4
    });
});
