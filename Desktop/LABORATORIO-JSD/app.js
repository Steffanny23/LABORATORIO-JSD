const { crearArchivo } = require('./helpers/credito');
const colors = require('colors');
const argv = require('./config/yargs');
/* if(argv.nn <= 5){ */
console.clear();

crearArchivo(argv.nc, argv.mf, argv.nn, argv.m, argv.ti, )
    .then(mensaje => console.log('FIN DE REPORTE'))
    .catch(err => console.log(err));

/* }else{
    console.log('Tiempo Aproximado de 5 años');
} */