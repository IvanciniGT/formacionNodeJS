export interface EmailService {
    enviarEmail(destinatario: string, asunto: string, mensaje: string): Promise<void>;
}