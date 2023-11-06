import { Server } from 'ws';
import { Express } from 'express';
export interface AnimalitoWS{

    configureWs(servidorDeExpress: Express):Server;

}