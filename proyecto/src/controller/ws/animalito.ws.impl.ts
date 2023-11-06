import { Server, WebSocket} from 'ws';
import { AnimalitoService } from '../../service/animalitos.service';
import { NotificacionAnimalito } from '../../service/model/notificacion.animalito';
import { AnimalitoWS } from './animalito.ws';
import { Express } from 'express';
import { createServer } from 'http';
export class AnimalitoWSImpl implements AnimalitoWS{

    private ws?:Server;

    constructor(servicioDeAnimalitos:AnimalitoService){
        servicioDeAnimalitos.subscribe((notificacion:NotificacionAnimalito) => this.cambioEnLosAnimalitos(notificacion));
    }

    private cambioEnLosAnimalitos(notificacion:NotificacionAnimalito) {
        if(!this.ws) return ;
        console.log("Ha habido un cambio... notificamos a todos los clientes");
        this.ws.clients.forEach((socket:WebSocket)=>{
            if(socket.readyState === WebSocket.OPEN)
                socket.send(JSON.stringify(notificacion));
        });
    }

    configureWs(servidorExpress: Express):Server{
        this.ws = new Server({server:createServer(servidorExpress)});
        return this.ws;
    }

}