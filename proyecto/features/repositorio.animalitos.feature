#language:es

Característica: Repositorio de Animalitos

Esquema del escenario: Dar de alta animalitos en el repo
    Dado         un repositorio de animalitos aislado
    Y            dado los datos de un nuevo animalito
    Y            entre los datos encuentro el dato "nombre": "<nombre>"
    Y            entre los datos encuentro el dato "raza": "<raza>"
    Y            entre los datos encuentro el dato "edad": <edad>
    Cuando       solicito al repositorio la persistencia de los datos del nuevo animalito
    Entonces     el repositorio me devuelve el nuevo animalito
    Y            ese animalito devuelto tiene por "nombre": "<nombre>"
    Y            ese animalito devuelto tiene por "raza": "<raza>"
    Y            ese animalito devuelto tiene por "edad": <edad>
    Y            ese animalito devuelto tiene un "id" mayor que 0

    Ejemplos:

    | nombre | raza        | edad |
    | Pipo | Caniche   | 3    |
    | Lola | Papagayo  | 5    |
    | Toto | Cocodrilo | 2    |

Esquema del escenario: No debo poder dar de alta animalitos en el repo sin nombre
    Dado         un repositorio de animalitos aislado
    Y            dado los datos de un nuevo animalito
    Y            entre los datos encuentro el dato "raza": "<raza>"
    Y            entre los datos encuentro el dato "edad": <edad>
    Cuando       voy a solicitar al repositorio la persistencia de los datos del nuevo animalito
    Entonces     devuelve un error de validación
    Ejemplos:

    | raza        | edad |
    | Caniche   | 3    |
    | Papagayo  | 5    |
    | Cocodrilo | 2    |
    
Esquema del escenario: No debo poder dar de alta animalitos en el repo sin raza
    Dado         un repositorio de animalitos aislado
    Y            dado los datos de un nuevo animalito
    Y            entre los datos encuentro el dato "nombre": "<nombre>"
    Y            entre los datos encuentro el dato "edad": <edad>
    Cuando       voy a solicitar al repositorio la persistencia de los datos del nuevo animalito
    Entonces     devuelve un error de validación
    Ejemplos:

    | nombre      | edad |
    | Caniche   | 3    |
    | Papagayo  | 5    |
    | Cocodrilo | 2    |


Esquema del escenario: Recuperar un animalito existente en el repo
    Dado         un repositorio de animalitos aislado
    Y            dado los datos de un nuevo animalito
    Y            entre los datos encuentro el dato "nombre": "<nombre>"
    Y            entre los datos encuentro el dato "raza": "<raza>"
    Y            entre los datos encuentro el dato "edad": <edad>
    Y            solicito al repositorio la persistencia de los datos del nuevo animalito
    Cuando       solicito al repositorio la recuperación del animalito con el id anterior
    Entonces     el repositorio me devuelve el nuevo animalito
    Y            ese animalito devuelto tiene por "nombre": "<nombre>"
    Y            ese animalito devuelto tiene por "raza": "<raza>"
    Y            ese animalito devuelto tiene por "edad": <edad>
    Y            ese animalito devuelto tiene un "id" igual al anterior

    Ejemplos:

    | nombre | raza        | edad |
    | Pipo | Caniche   | 3    |
    | Lola | Papagayo  | 5    |
    | Toto | Cocodrilo | 2    |