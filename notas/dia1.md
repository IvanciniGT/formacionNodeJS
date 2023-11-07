Te Indico el temario abajo, pero están muy interesados en:

•               dockerizacion
•               la forma de desplegar con docker, multihilo, para cada cambio de los fuentes que reinicie automáticamente, para un servidor de muchos núcleos
•               streaming, webworkers, redis, cluster
•               redis para cacheo
•               devops …. Contraform
•               promise, y callback
•               endpoints,asynch

TEMARIO ORIGINAL

-Introducción a Node.js.  
-Características de Node.js y diferencias entre código bloqueante y no bloqueante.  
-Lectura de archivos y emisión de peticiones.  
-Trabajo en tiempo real con Node.js.  
-Retos a resolver mediante esta tecnología.  
-Emisores de eventos, requests, y escuchas.  
-Streams: problemas a resolver.  
-Escritura, lectura, piping y solución de la concurrencia.  
-Exportación, instalación de NPM, dependencias, y versiones semánticas.  
-Rutas, disposición visual, construcción de URL y servidores express.  
-Socket.io: la librería de sockets.  
-Escucha, emisión, respuesta a peticiones y almacenamiento de datos del cliente.  
-Persistencia de información.  
-Redis, trabajo con listas, persistencia, emisión, y otros aspectos

---

Frontend

Back.

# Node 

Interprete de JS. Chromium -> NODE
+
Librerías adicionales

---

Frontal Angular, React, Vue...
En frontal usamos node?

Desarrollo Angular, usamos node:
- Transpilación TS -> JS
- Empaquetado
- Servidor de pruebas

JS -> ECMA Script

---

Node JS para backend:
Voy a interpretar usando Node + Usar las librerías especiales que me da NODE para acceder a funciones del SO.

El back y el front son 2 mundos muy diferentes.
Los frontales requieren de mucha interactividad -> Muchas funciones asíncronas ejecutándose "a la vez".

En general, en el back voy de otro palo.
Recibo peticiones... que proceso... en la mayor parte de los casos, de forma secuencial.

JS (ECMA Script)... 
Lenguaje de programación: PARADIGMAS
- Imperativa    Cuando escribo código secuencial... a veces necesito romper esa secuencialidad (IF, SWITCH/CASE, FOR, )
- Procedural    Cuando el lenguaje me permite definir mis propias funciones y ejecutarlas posteriomente
- Funcional     Cuando el lenguaje me permite que una variable apunte a una función... para posteriormente ejecutar la función desde la variable
                El concepto es simple, la potencia es lo que puedo hacer con ello:
                    - Puedo crear funciones que reciban funciones como argumentos
                    - Puedo crear funciones que devuelvan funciones
- OO            Cuando el lenguaje me permite definir mis propios tipos de datos... con sus atributos y sus métodos
                String      Sec de caracteres       toUpperCase()
                List        Sec de valores          get(i)
                Date        dia / mes / año         diaDeLaSemana()
                Usuario     nombre, email           eresMayorDeEdad()
- Declarativa   ANGULAR @Component, @Module

---
Al final el código quién lo ejecuta en un SO? 
    El SO abre un proceso... Pero asociado a un proceso tengo hilos de ejecución. (THREAD)
Al final el código quién lo ejecuta en una computadora? CPU / procesador 

Cuando arrancamos un programa en una computadora, lo primero que hace el SO es:
- Crear un proceso para la gestión de esa ejecución de mi programa
- Reserva memoria... y empieza a usarla:
  - Para colocar el propio código del programa
  - Thread Stack (pila de llamadas) De cada hilo, se lleva un control ferreo de que partes del código está ejecutando (por donde va... y de donde viene)
  - Datos de trabajo
  - Caches              Zona... donde almacenar datos a los que quiero acceder de forma rápida
  - Buffers...

En JS en general.. y en especial en NODE, con cuantos trabajo? Y esto que impacto tiene?
- No puedo tener 2 instrucciones ejecutándose simultáneamente dentro de mi programa.

Esto es una limitación? SI... si tengo una máquina con 1 core... vale...

En JS existe otro concepto... ya que no permite "a priori" trabajar con hilos... función ASYNC / AWAIT

Función Async en JS? Una función que tiene capacidad de suspender su ejecución... y que cuando se reanuda... lo hace en el punto donde se quedó.

Kotlin (lenguaje de programación) -> Coroutines

Esto está guay por ejemplo para funciones que hace uso de IO (comunicaciones: HDD, RED)

Código:
    Hago unos cálculos                                                          1
    async Y llamo a una función que:                                            2
        await ... async Guardo en un fichero el resultado   \                   3... y se queda en espera
        async Envío un email con el resultado     / Secuecialmente              5
    Mientras tanto sigo haciendo otras cosas...                                 4
    // Tarea a                                                                   4.1
    // Tarea b                                                                   4.2
    await a la 104 
    // Tarea c                                                                  6


Cuando quiero hacer trabajo asíncrono... que devuelva información... o que devuelve el flojo de ejecución a un punto concreto de mi programa... que estrategias tengo?
- Callback: Una función que suministro como argumento a una función async... para que cuando acabe su trabajo... me la invoque
- Promise (Future): Un dato al que me puedo suscribir... para que cuando esté disponible... hacer algo...
  - Observables (RXJS)

Con esto me voy defendiendo... SI ESTOY EN FRONTAL... me suele ser más que suficiente.
La situación en front es:
- La naturaleza de las acciones a ejecutar: -> Peticiones que hago a un back.... ASYNC ( con capacidad de suspenderse... liberando el hijo ejecutor)
- 1 usuario... (apretando botones que refresquen la UI o haciendo peticiones)

En back qué situaciones me puedo encontrar?
- Muchos usuarios... huevón de usuarios
- Tareas que consuman demasiada CPU (bloqueantes... no se pausan)

Y en back de una forma o de otra necesito hilos de ejecución paralelos.... que aprovechen la capacidad de cómputo de una máquina....
Tenemos 2 estrategias para conseguirlos:
- Crear procesos... cada uno con su hilo de ejecución
    -> Cada hilo tiene su propia memoria (heredada del proceso...)
        Me es sencillo que compartan datos entre si? NO
            Esos datos están en RAM... y cada hilo, por pertenecer a su propio PROCESO, tiene su propia zona de memoria:
                - Sockets
                - Shared Memory C
                - Pipes
                - Colas
- Crear más hilos dentro de un proceso -> Workers -> levantar un Node en un hilo, dentro de un proceso único
    -> Los hilos pertenecen al mismo proceso de SO... y por ende comparten memoria:
        - SharedBuffers
        - Mensajes de un hilo a otro.


    Si lo único que quiero es tener varios hilos accediendo a los mismos datos (cacheados):
    Puedo sacar la cache fuera, convertirla en un proceso independiente... y que los hilos accedan a ella a través de sockets: REDIS

---

Docker es una herramienta que nos permite gestionar contenedores... como muchas otras: Podman, ContainerD, CRIO

Contenedor: Es un entorno aislado dentro de un SO Linux, donde correr procesos de forma aislada:
- Cada entorno tiene:
  - Sus propias variables de entorno
  - Su propio sistema de archivos
         v 
    - Su propia configuración de red -> IP 
  - Puede tener limitaciones de acceso al hierro (HW)

Los contenedores los creamos desde Imágenes de contenedor

Esa imágenes se guardan en registros de repos de imágenes de contenedor.

Una imagen de contenedor: es un triste fichero comprimido (tar) con una estructura de carpetas compatible con POSIX(no obligatorio, pero habitual) en la que encontramos una serie de programas YA PREINSTALADOS de antemano.

---

# Forma de instalar software... FORMA BASTANTE TRADICIONAL

App1 + App2 + App3          Problemón gigante de esta forma de instalar:
-------------------             - Potenciales conflictos (librerías, variables de entorno, configuraciones de SO)
 Sistema Operativo              - Dios no lo quiera... y seguro que no pasa nunca (SERIA LA PRIMERA VEZ ;) que una app (App2)
                                    tiene un bug.... y pone la CPU (RAM, HDD, RED) al 100%
-------------------                 App2 -> 100% CPU --> OFFLINE
    HIERRO                              Se lleva por delante a App1 y App3 -> OFFLINE
                                - Seguridad... todo está juntito ( unos procesos pueden acceder a los ficheros de otros...) -> VIRUS

# Forma de instalar software... con máquinas virtuales

 App1   |   App2                    Me resuelve los problemas anteriores
--------------------                Pero esto viene con sus propios problemas:
 SO1    |   SO2                         - Desperdicio de recursos / Merma de recursos: 3 SO... donde antes había 1
--------------------                    - Mnto se me multiplica
 MV1    |   MV2                         - Las app se vuelven más lentas.
--------------------                    - Nos volvemos dependientes del hipervisor
    Hipervisor:
    VMWare, Citrix, HyperV, kvm, VirtualBox
--------------------
 Sistema operativo
--------------------
    HIERRO

# Forma de instalar basada en Contenedores

 App1   |   App2                        Esta forma de trabajo me resuelve todos los problemas de las instalaciones tradicionales
--------------------------              Sin los problemas de las máquinas virtuales
 C1     |   C2
--------------------------
 Gestor de contenedores:
    Docker, podman, crio, containerd
--------------------------
 Sistema operativo LINUX
--------------------------
    HIERRO

Hoy en día todo el software de caracter empresarial se distribuye mediante imágenes de contenedor.


---

Linux: Es un kernel de SO.. Todo SO tiene un kernel
El Kernel de Linux se usa en mogollón de sistemas operativos:
- GNU/Linux
    - Ubuntu... es una distribución de un sistema operativo ( GNU/Linux )
    - Debian
    - Redhat
    - Fedora
- Android

Windows tiene kernel? Pues claro
Microsoft ha tenido 2 kernels en su historia... con los que ha generado todos sus sistemas operativos
- DOS: MSDOS, Windows 2, Windows 3, Windows 95, Windows 98, Windows ME
- NT: Windows NT, Windows 2000, Windows XP, Windows Vista, Windows 7, Windows 8, Windows 10, Windows 11, Server

En Windows, de forma nativa (ofrecida por microsoft) hoy en día es posible arrancar en paralelo 
con el kernel NT un kernel Linux: wls 2.0


# Qué es UNIX? 

Una especificación acerca de cómo montar un SO ( de hecho 2: POSIX + SUS)
- ORACLE Solaris UNIX®
- HP: HP-UX UNIX®
- IBM: AIX UNIX®
- Apple: MacOS X UNIX®

# Qué era UNIX? 

Un sistema operativo creado por los lab bell de AT&T en los 70s

Linux se cree... aunque nos importa nada y menos... que cumple con el estandar de UNIX....

# Entornos de producción

- H.A. (High Availability) -> Alta disponibilidad
- Escalabilidad

# Kubernetes

Cluster:
Kubernetes < Leng declarativo.
    Maquina 1
        Docker o equivalente (CRIO / CONTAINERD)
    Maquina 2
        Docker o equivalente (CRIO / CONTAINERD)
    Maquina N
        Docker o equivalente (CRIO / CONTAINERD)

---

Vamos a montar un backend CRUD REST animalitos ---> BBDD (mongo | mysql) + REDIS

TS

node?
- Interpretación JS al ejecutar el programa
- Transpilación de TS -> JS
- Test

# npm ~ maven

Herramientas de automatización de tareas habituales de mi proyecto:
- transpilación
- ejecución
- ejecución de pruebas
- empaquetado
- gestión de dependencias

---

# Express -> Framework que me permite montar un servidor web en node

                 ruta 
    Request http -> función -> Respuesta http

En nuestro proyecto vamos a querer disponer de PRUEBAS por un tubo

# Pruebas de software

## Vocabulario en el mundo del testing

- Error     Los humanos somos los que cometemos ERRORES (por falta de conocimiento, estar cansado, desconcentrado)
- Defecto   Al cometer un error podemos llegar a introducir un DEFECTO en un producto
- Fallo     Ese defecto en un momento dado se puede manifestar como un FALLO

## Para qué sirven

- Para asegurar que el software cumple/sigue cumpliendo(por siempre jamás) con unos requisitos
- Detectar la mayor cantidad posible de FALLOS al ejecutar mi software/producto
  - Una vez detectado un FALLO ... será necesario arreglar el DEFECTO que lo ha provocado
    Para arreglarlo lo primero es identificarlo: DEBUGGING / DEPURACION -> Desarrollador
- Recopilar toda la información posible para facilitar la depuración de una app.
- Detectar la mayor cantidad posible de DEFECTOS en mi software/producto
- Haciendo un análisis de causas raíces... para tratar de identificar los ERRORES... y tomar acciones preventivas que eviten:
  - Nuevos errores
    - Con sus defectos
      - Y sus fallos en el futuro
- Para ayudarme en el desarrollo: Test-First, TDD, BDD, ATDD
- Para saber cómo va mi proyecto

## Tipos de pruebas

Las clasificamos en base a distintas taxonomía:
Toda prueba se debe centrar en una única característica de un sistema.

### En base al objeto de prueba

- Funcionales
- No funcionales
    - Estrés
    - Carga
    - Rendimiento
    - UX
    - Seguridad
    - ...

### En base al nivel de la prueba

- Unitarias     Se centra en una característica de un componente AISLADO del sistema
                    API REST CRUD 
                        class ServicioDeAnimalitosImpl extends ServicioDeAnimalitos{
                            altaDeAnimalito(animalito:DatosDeNuevoAnimalito): DatosDeAnimalito{ .... }
                                                                                ^ id
                        }
                                                        TestDoubles
                            ServicioDeAnimalitosImpl |-> RepositorioDeAnimalitosImpl -> BBDD
                                                         RepositorioDeAnimalitosStub... siempre devuelve 33

                    Tren
                        Ruedas                      Sistema de frenos               Motor

- Integración   Se centra en LA COMUNICACION entre 2 componentes
- Sistema       Se centran en el COMPORTAMINTO DEL SISTEMA en su conjunto

### En base al procedimiento de ejecución

- Estáticas: Las que no necesitan ejecutar código   -> DEFECTOS (SonarQube... lo que antes hacía el desarrollador SENIOR)
                                                            - Complejidad ciclomática: Cuántos caminos diferentes puede tomar un código al ejecutarse
                                                                          ---> Cantidad mínima de pruebas que debo realizar
                                                            - Complejidad cognitiva: Cómo de compleja es una función para un ser humano
- Dinámicas: Las que necesitan ejecutar código      -> FALLOS


# Regresión

Son pruebas que VUELVO a ejecutar para ver que no haya roto nada después de un cambio -> Las quiero AUTOMATIZAR!

# Test Doubles: Martin Fowler

- Dummies
- Stubs
- Fakes
- Spies
- Mocks


 > El software funcionando es la MEDIDA principal de progreso.
   La MEDIDA principal de progreso de un proyecto es el software funcionando: DEFINIR UN INDICADOR
   Cómo mido, qué uso para medir el grado de avance de un proyecto? -> El software funcionando

   Que cojo-nes es el "software funcionando"? Software que funciona
   Quién dice que funciona? PRUEBAS

SCRUM es una metodología de GESTION DE PROYECTOS
TDD es una metodología de DESARROLLO DE SOFTWARE
Test-First: Lo primero hago las pruebas... y las pruebas me van a guiar en el desarrollo de mi software
TDD? Test-first + Refactorización en cada iteración.    -> Unitarias
BDD: Behavior driven development                        -> Sistema
ATDD: Aceptance Test

Cuál es la principal característica de usar una met. ágil?
- Entregar mi producto de forma incremental a mi cliente para tener un rápido feedback.


API REST CRUD BACKEND
-------------------------

# Alta de Animalito > Funcionalidad

Servidor    - Lógica HTTP 
    Rutas   - Configuración del protocolo HTTP para mi caso de uso -> END POINT -> Función JS
Controlador - Lógica de exposición de un servicio           Cómo expongo ese servicio: RESTv1 RESTv2 SOAP
    DTO - DatosDelAnimalitoRestV1
-------
Servicio    - Lógica de negocio                             Alta de un animalito: persistir en BBDD un animalito + Enviar unos correos
    DTO - DatosDeUnAnimalito
-------
Repositorio - Lógica de persistencia -> MYSQL               Cómo guardo un animalito en una cierta BBDD
    Modelo / entidad - Animalito.Estructura de Datos        Lo que es un Animalito


Animalito <-> DatosDeUnAnimalito <-> DatosDelAnimalitoRestV1
           ^
           Funciones de mapeo: mapper

SOLID Principios de diseño de software: Uncle BOB > Sirven para crear software más mantenible en el tiempo.

- Inversión de dependencias:  Un componente de alto nivel nunca debe depender de implementaciones concretas de componentes de bajo nivel. 
  En su lugar, deben depender de abstracciones (interfaces)
  - Inyección de dependencias: Patrón de desarrollo: Por el cuál las clases no crean los objetos que necesitan... sino que le son suministrados:

    import { RepositorioDeAnimalitos } from './repositorio-de-animalitos';      // Interfaz
    //import { RepositorioDeAnimalitosImpl } from './repositorio-de-animalitos';  // Implementación // ES LA RUINA !!!!
    // ME acabo de mear en el ppo de inversión de dependencias

    class ServicioDeAnimalitos {

        private repositorio:RepositorioDeAnimalitos ;

        constructor(repositorio:RepositorioDeAnimalitos){
            this.repositorio = repositorio;
        }

        altaAnimalito(animalito: DatosDeAnimalito){
            // Lógica de negocio
                // Guardar animalito en BBDD
                let animalito:Animalito = funcionDeMapeo(animalito);
                this.repositorio.guardarAnimalito(animalito);
                // Mandar correos...

        }
    }



## Versiones de software

1.2.3
            cuando se incrementan?
- MAYOR 1   Breaking changes- NBo guardo retro-compatibilidad
            Cuando quito funcionalidad
- MINOR 2   Nueva funcionalidad
            Se marca una funcionalidad como DEPRECATED
- PATCH 3   Arreglo de bug

---
Sistema electrónico de la Tienda de animalitos fermín
                                                                                                Mandar un email
FRONT                                                                       BACK                    ^
- WEB                      >>>                                               Controlador REST ->   Servicio ->   Repositorio ->  BBDD (animalitos)
- App ios                                                                                                   Animalito
- App android                                                                   altaAnimalito
- App escritorio                                                                recuperarAnimalito
- App alexa, ok google
- Sistema de voz interactivo                                                  1.2.0 ---\                1.1.0             1.1.0
                                                                             +2.0.0 -------->           2.0.0             2.0.0

    {
        "id": 17,
        "nombre": "PIPO",
        "raza": "Gato",
        "edad": 3,
        "foto": 83237647826874987BACS
    }
                                                                                                                                    nombre -> name
                                                                                                                                    edad   -> age
    {
        "id": 17,
        "name": "PIPO",
        "raza": "Gato",
        "age": 3,
        "pic": 83237647826874987BACS
    }

---

# Websockets - Protocolo de comunicación bidireccional
    Cliente <-> servidor (ws://)

# Http - Protocolo de comunicación unidireccional
    Cliente -> Servidor (http://)

# Sistema de notificación de nuevas mascotas al que la gente se puede subscribir


# Test double 

Cuando hago una prueba donde hay comunicación entre componentes

        Componente A --------> Componente B
                     <--------
    
        Hay veces que me basta con centrarme en --------> Spy // MOCK
        Hay veces que me basta con centrarme en <-------- Stub       
        Si necesito comprobar las 2... monto un Fake
    
        Dummy... cuando no me interesa controlar ni lo uno, ni lo otro


# DEVOPS

Cultura, es un movimiento, es una filosofía en pro de la AUTOMATIZACION !
Automatizar qué? Todo lo que hay entre el dev ----> ops


Repositorio
    comenzarTransaccion -> Transaccion (MIO)
    guardarAnimalito(DatosAnimalito, Transaccion)
    acabarTransaccion(Transaccion)
    rollbackTransaccion(Transaccion)

---

Cucumber(penino) es un framework para pruebas... otro !

Las pruebas(realmente los requisitos de mi sistema/componente) los definimos mediante lenguaje GHERKIN
Ese lenguaje GHERKIN(pepinillo) definimos los requisitos

CUCUMBER me permite ejecutar esos ficheros gherkin  

El lenguaje Gherkin realmente no es tal.... es un conjunto de restricciones sobre lenguaje natural (humano)
CUCUMBER tiene librerías en "todos" los lenguajes de programación que usamos actualmente

---

WebSockets

WebSocket es un protocolo alternativo/complementario a HTTP
Al trabajar con http, usamos una url de la forma: "http://..." || "https://..."
Al trabajar con websockets, usamos una url de la forma: "ws://..." || "wss://..."
La S en httpS y en wsS hace referencia a la capa TLS que montamos por encima del protocolo correspondiente.

Me permite no evitar pero si frustrar (o al menos ayudarme a ello) 2 tipos de ataques:
- Man in the Middle ... es cuando alguien espía una conversación entre 2 partes
  - No hay manera de evitar que me escuchen... pero si mando los mensajes cifrados(encriptados) me escuchará... pero no se entera de nada de lo que hablo: 
  - Algoritmos de clave simétrica: Solo tengo 1 clave que sirve tanto para cifrar como para descifrar
  - Algoritmos de clave asimétrica: Tengo 2 claves: Una para cifrar (privada) y otra para descifrar(publica)
  En tls el grueso de la comunicación se hace mediante clave simétrica... pero al principio de la comunicación se intercambian las claves simétricas mediante clave asimétrica.
- Suplantación de identidad (phishing)
  Básicamente que alguien me diga que es el servidor del banco... y en realidad sea un servidor pirata... es tan fácil como que me peguen el cambiazo en el dns... o una configuración de un router.
  Para evitarlo trabajamos con certificados... que llevan la firma de una entidad certificadora de MI confianza.

  La diferencia con WS es que es un protocolo de comunicación bidireccional... y que no se basa en el concepto de petición/respuesta... sino que se basa en el concepto de mensaje.

    HTTP: Request -> Response

// MySQL

SQL: Structured Query Language       mysql2
ORM: Object Relational Mapping ***   sequelize

// MongoDB