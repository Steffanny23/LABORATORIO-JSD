const { crearArchivo } = require('./helpers/credito');
const colors = require('colors');
const argv = require('./config/yargs');

console.clear();

crearArchivo(argv.nc, argv.mf, argv.m, argv.ti)
    .then(mensaje => console.log(mensaje))
    .catch(err => console.log(err));