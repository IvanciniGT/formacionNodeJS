"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailsServiceImpl = void 0;
class EmailsServiceImpl {
    enviarEmail(destinatario, asunto, mensaje) {
        console.log(`Enviando email a ${destinatario} con asunto ${asunto} y mensaje ${mensaje}`);
        return Promise.resolve();
    }
}
exports.EmailsServiceImpl = EmailsServiceImpl;
