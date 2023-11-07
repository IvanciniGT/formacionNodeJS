"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimalitoWSImpl = void 0;
const ws_1 = require("ws");
const http_1 = require("http");
class AnimalitoWSImpl {
    constructor(servicioDeAnimalitos) {
        servicioDeAnimalitos.subscribe((notificacion) => this.cambioEnLosAnimalitos(notificacion));
    }
    cambioEnLosAnimalitos(notificacion) {
        if (!this.ws)
            return;
        console.log("Ha habido un cambio... notificamos a todos los clientes");
        this.ws.clients.forEach((socket) => {
            if (socket.readyState === ws_1.WebSocket.OPEN)
                socket.send(JSON.stringify(notificacion));
        });
    }
    configureWs(servidorExpress) {
        this.ws = new ws_1.Server({ server: (0, http_1.createServer)(servidorExpress) });
        return this.ws;
    }
}
exports.AnimalitoWSImpl = AnimalitoWSImpl;
