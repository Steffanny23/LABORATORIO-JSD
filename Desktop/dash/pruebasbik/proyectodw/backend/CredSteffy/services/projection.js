const MongoLib = require('../lib/mongo');

class ProjectionService {
	constructor() {
		//this.collection = 'vehiculos';
		this.collectionEscenario = "proyeccion"
		this.collectionCliente = "cliente"
		this.mongoDB = new MongoLib();
	}

	async getProjections({ tags }) {
		//si hay un tags entonces crear el query
		const query = tags && { tags: { $in: tags } };
		const projections = await this.mongoDB.getAll(this.collectionEscenario, query);
		return projections || [];
	}

	async process({ dataProjection }) {

		let date = new Date();

		//Creación de Cliente
		const cClient = {
			clientName: dataProjection.clientName,
			documentNumber: dataProjection.documentNumber,
			email: dataProjection.email,
			address: dataProjection.address,
		}
		//DPI REQUERIDO, si exite no registrar.
		//EMAIL: OPCIONAL
		const clienteId = await this.mongoDB.create(this.collectionCliente, cClient);
		const cliente = await this.mongoDB.get(this.collectionCliente, clienteId);
		

		//Data for projection
		const montoFinanciamiento = dataProjection.basePrice;
		const tasaInteres = dataProjection.interestRate;
		const cuotas = dataProjection.quotes;
		

		//Proceso Projection
		const totalInteresAnio = (montoFinanciamiento * tasaInteres) / 100;
        const interesMensual = (totalInteresAnio / 12)
		const totalInteres = interesMensual * cuotas;
        let capitalMesAbono = montoFinanciamiento / cuotas;
		let listaPagos = [];
        let listaMeses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

		let saldoBase = montoFinanciamiento;
		let counter = 0;
		for (let i = 0; i < cuotas; i++) {
			counter = counter+ 1;
            date.setMonth(date.getMonth() + 1);
            let fechaPosion = new Date(date);
            let _saldoDespues = saldoBase - interesMensual;
            let _cuotaPago = interesMensual + capitalMesAbono;
            let _mesPago = listaMeses[fechaPosion.getMonth()];

            /* mesInicio = mesInicio + 1; */
            let fechastring = `${fechaPosion.getFullYear()}-${fechaPosion.getMonth ()+ 1}-${fechaPosion.getDay()}`;
            //creamos propiedades 
            let newItem = {
				counter: counter,
                SaldoBase: saldoBase.toFixed(2),
                SaldoD: _saldoDespues.toFixed(2),
                coutaInteres: interesMensual.toFixed(2),
                coutaCapital: capitalMesAbono.toFixed(2),
                coutaPago: _cuotaPago.toFixed(2),
                pagoMes: _mesPago,
                fechaPago: fechastring
            }

            listaPagos.push(newItem);
            saldoBase = saldoBase - capitalMesAbono;
        }


		//Registro de Escenario
		const cProjection = {
			clientId: clienteId,
			interestRate: dataProjection.interestRate,
			basePrice: dataProjection.basePrice,
			quotes: dataProjection.quotes,
			dateOperation: date, 
			totalInterest: totalInteres,
			monthlyInterest: interesMensual,
			monthlyPayment: interesMensual + capitalMesAbono
		};
		const proyeccionId = await this.mongoDB.create(this.collectionEscenario, cProjection);
		const proyeccion = await this.mongoDB.get(this.collectionEscenario, proyeccionId);


		return {client: cliente, projection: proyeccion, transactions: listaPagos}
	}


	async deleteProjectionById({ projectionId }) {
		const deleteProjectionIdId = await this.mongoDB.delete(this.collectionEscenario, projectionId);
		return deleteProjectionIdId;
	}

}

module.exports = ProjectionService;
