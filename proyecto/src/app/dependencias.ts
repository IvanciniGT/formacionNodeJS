import { AnimalitoControllerV1 } from '../controller/rest/v1/animalito.controller.v1.js';
import { AnimalitoControllerV1Impl } from '../controller/rest/v1/impl/animalito.controller.v1.impl.js';
import { MapeadorDeAnimalitosV1Impl } from '../controller/rest/v1/impl/mapper/animalitos.mapper.impl.js';
import { AnimalitoRepository } from '../persistence/repository/animalito.repository.js';
import { AnimalitoRepositoryImpl } from '../persistence/repository/impl/animalito.repository.impl.js';
import { AnimalitoService } from '../service/animalitos.service.js';
import { EmailService } from '../service/email.service.js';
import { AnimalitoServiceImpl } from '../service/impl/animalitos.service.impl.js';
import { EmailsServiceImpl } from '../service/impl/email.service.impl.js';
import { MapeadorDeAnimalitosImpl } from '../service/impl/mapper/animalitos.mapper.impl.js';
import { MapeadorDeAnimalitos } from '../service/impl/mapper/animalitos.mapper.js';



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

let servicioDeAnimalitos = new AnimalitoServiceImpl(getAnimalitosRepository(), getEmailService(), getMapeadorDeAnimalitoService());

export function getAnimalitosService():AnimalitoService{
    return servicioDeAnimalitos;
}

let mapeadorDeAnimalitosController = new MapeadorDeAnimalitosV1Impl();

export function getMapeadorDeAnimalitosController(): MapeadorDeAnimalitosV1Impl{
    return mapeadorDeAnimalitosController;
}

let controladorDeAnimalitos = new AnimalitoControllerV1Impl(getMapeadorDeAnimalitosController(), getAnimalitosService());

export function getAnimalitosController(): AnimalitoControllerV1{
    return controladorDeAnimalitos;
}
