const { describe } = require('yargs');

const argv = require('yargs')
    .option('nc', {
        alias: 'Nombre',
        type: 'text',
        demandOption: true,
        describe: 'Indica el primer dato de cliente'
    })
    .option('mf', {
        alias: 'montofinanciamiento',
        type: 'number',
        demandOption: true,
        describe: 'Indica el monto de financiamiento del cliente'
    })
    .option('nn', {
        alias: 'Años',
        type: 'number',
        demandOption: true,
        describe: 'Indica el primer dato de cliente'
    })
    .option('m', {
        alias: 'mes',
        type: 'number',
        default: false,
        describe: 'Mes de pago de Cliente'
    })
    .option('ti', {
        alias: 'TasaInteres',
        type: 'number',
        default: 10,
        describe: 'Indica el número de intes generado por pagos'
    })
    .option('l', {
        alias: 'listar',
        type: 'boolean',
        demandOption: true,
        describe: 'Muestra la tabla en consola'
    })
    .check((argv, options) => {
        if (isNaN(argv.mf)) {
            throw 'Datos Numericos'
        }
        return true
    })
    .argv;

module.exports = argv;