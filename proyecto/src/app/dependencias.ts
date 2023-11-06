import { AnimalitoControllerV1 } from '../controller/rest/v1/animalito.controller.v1';
import { AnimalitoControllerV1Impl } from '../controller/rest/v1/impl/animalito.controller.v1.impl';
import { AnimalitoRouterV1 } from '../controller/rest/v1/impl/animalitos.router.v1';
import { MapeadorDeAnimalitosV1Impl } from '../controller/rest/v1/impl/mapper/animalitos.mapper.impl';
import { AnimalitoRepository } from '../persistence/repository/animalito.repository';
import { AnimalitoRepositoryImpl } from '../persistence/repository/impl/animalito.repository.impl';
import { AnimalitoService } from '../service/animalitos.service';
import { EmailService } from '../service/email.service';
import { AnimalitoServiceImpl } from '../service/impl/animalitos.service.impl';
import { EmailsServiceImpl } from '../service/impl/email.service.impl';
import { MapeadorDeAnimalitosImpl } from '../service/impl/mapper/animalitos.mapper.impl';
import { MapeadorDeAnimalitos } from '../service/impl/mapper/animalitos.mapper';



let animalitosRepository = new AnimalitoRepositoryImpl();
export function getAnimalitosRepository(): AnimalitoRepository {
    return animalitosRepository;
}

let emailService = new EmailsServiceImpl();
export function getEmailService(): EmailService{
    return emailService
}

let mapeadorDeAnimalitos = new MapeadorDeAnimalitosImpl();
export function getMapeadorDeAnimalitoService(): MapeadorDeAnimalitos{
    return mapeadorDeAnimalitos;
}

let servicioDeAnimalitos = new AnimalitoServiceImpl(getAnimalitosRepository(), getEmailService(), getMapeadorDeAnimalitoService()); // Inyección de dependencias
export function getAnimalitosService():AnimalitoService{
    return servicioDeAnimalitos;
}

let mapeadorDeAnimalitosController = new MapeadorDeAnimalitosV1Impl();
export function getMapeadorDeAnimalitosController(): MapeadorDeAnimalitosV1Impl{
    return mapeadorDeAnimalitosController;
}

let controladorDeAnimalitos = new AnimalitoControllerV1Impl(getMapeadorDeAnimalitosController(), getAnimalitosService());   // Inyección de dependencias
export function getAnimalitosController(): AnimalitoControllerV1{
    return controladorDeAnimalitos;
}

export const EnrutadorControladorRestV1DeAnimalitos = new AnimalitoRouterV1(getAnimalitosController())
