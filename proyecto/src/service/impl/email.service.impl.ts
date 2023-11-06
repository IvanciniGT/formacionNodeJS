import { EmailService } from "../email.service";

export class EmailsServiceImpl implements EmailService {
    enviarEmail(destinatario: string, asunto: string, mensaje: string): Promise<void>{
        console.log(`Enviando email a ${destinatario} con asunto ${asunto} y mensaje ${mensaje}`);
        return Promise.resolve();
    }
}