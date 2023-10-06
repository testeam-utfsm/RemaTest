# TesTeam

### Integrantes:
|Nombre|Rol|
|:--|:--|
|Fernanda Avendaño| 201873057-2 |
|Matías Contreras|201904613-6|
|Vicente Lineros|202073610-3|
### Ejecución:

#### Instalación de dependencias

1. Ubicándonos en la raíz del proyecto utilizamos el siguiente comando

        npm install

2. Ubicándonos en la ruta front, utilizamos el siguiente comando
    
        npm install

#### Levantamiento de la BBDD

1. Se debe ejecutar el siguiente comando con Docker. Previamente no debemos tener ningún servidor MySql iniciado.

         docker compose up -d

2. Para crear las tablas nos ubicamos en la raíz del proyecto y utilizamos el siguiente comando:

         ./node_modules/.bin/db-migrate up

#### Levantamiento del backend

1. Ubicándonos en la raíz del proyecto utilizamos el siguiente comando
   
         npm run start

#### Levantamiento del frontend

1. Ubicándonos en la ruta front, utilizamos el siguiente comando
    
         npm run serve
