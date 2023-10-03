# TesTeam

### Integrantes:
|Nombre|Rol|
|:--|:--|
|Fernanda Avendaño|201873057-2|
|Matías Contreras|201904613-6|
|Vicente Lineros|202073610-3|
### Ejecución:

#### Levantamiento de la BBDD

1. Se debe ejecutar el siguiente comando con docker. previamente no debemos tener ningún servidor mysql iniciado.
   `$ docker compose up -d`
2. Para crear las tablas nos ubicamos en la raiz del proyecto y utilizamos el siguiente comando:
   `$ ./node_modules/.bin/db-migrate up`

#### Levantamiento del backend

1. Ubicandonos en la raiz del proyecto utilizamos el siguiente comando
   `$ npm run start`

#### Levantamiento del frontend

1. Ubicandonos en la ruta Testeam/front, utilizamos el siguiente comando
    `$ npm run dev`
