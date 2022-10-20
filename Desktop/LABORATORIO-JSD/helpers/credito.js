//Calculo de cuotas por compra vehículo 5 años (despliegue por mes) - cuota fija 

//importar dependencias 
const PDFDocument = require('pdfkit');
let doc = new PDFDocument;

const fs = require('fs');
const colors = require('colors');


const crearArchivo = async(nombre, montofinanciamiento, años, meses, tasaInteres, ) => { //asincrona
    try { //PROTEGER LA APP DE ERRORES
        console.log(nombre);
        console.log(montofinanciamiento);
        console.log(años);
        console.log(meses);
        console.log(tasaInteres);

        //tiempo 
        let date = new Date();

        /* let messiguiente = date.setMonth(date.getMonth() + 1);
        console.log(messiguiente); */



        const totalinteres = (montofinanciamiento * tasaInteres) / 100;
        const interesMensual = (totalinteres / 12)
            // console.log(totalneto);
        let capitalMesAbono = montofinanciamiento / meses;
        /*   let mesInicio = 1;
          mesInicio = mesInicio - 1; */

        let listaPagos = [];
        let listaMeses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

        let saldoBase = montofinanciamiento;
        for (let i = 0; i < meses; i++) {
            date.setMonth(date.getMonth() + 1);
            let fechaPosion = new Date(date);
            let _saldoDespues = saldoBase - interesMensual;
            let _cuotaPago = interesMensual + capitalMesAbono;
            let _mesPago = listaMeses[fechaPosion.getMonth()];



            /* mesInicio = mesInicio + 1; */
            let fechastring = `${fechaPosion.getFullYear()}-${fechaPosion.getMonth ()+ 1}-${fechaPosion.getDay()}`;
            //creamos propiedades 
            let newItem = {
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
        console.log(listaPagos);



        const doc = new PDFDocument({ size: 'A3' }); //GENERAR DOC PDF

        doc.pipe(fs.createWriteStream(`${nombre}.pdf`));
        doc.fontSize(10)
            .text("INFORMACION GENERAL DE PAGOS", 250, 20)
            .text("  COMPRA DE VEHICULOS", 260, 30)
            .text(`Nombre del Cliente:  ${nombre}`, 50, 60)
            .text(`Monto precio Vehiculo: Q. ${montofinanciamiento}.00`, 300, 60)
            .text(`Tasa De Interes : ${tasaInteres} %`, 50, 75)
            .text(`Meses Financiamiento: ${años} años ${meses} Meses `, 300, 75)
            .text("No.", 30, 99)
            .text("saldoBase", 50, 99)
            .text("saldoDespues", 150, 99)
            .text("interesMensual", 250, 99)
            .text("capitalMesAbono", 350, 99)
            .text("cuotaPago", 450, 99)
            .text("mesPago", 550, 99)
            .text("fechaPago", 650, 99);


        let i,
            invoiceTableTop = 100; //posicion de margen

        for (i = 0; i < listaPagos.length; i++) {
            const item = listaPagos[i];
            let position = invoiceTableTop + (i + 1) * 15;
            /* if (position > 680) {
                doc.addPage();
                position = 50;
            } */
            let iaux = i + 1;
            generateTableRow(

                doc,
                position,
                /*  item.nombre, */
                item.SaldoBase,
                item.SaldoD,
                item.coutaInteres,
                item.coutaCapital,
                item.coutaPago,
                item.pagoMes,
                iaux,
                item.fechaPago,

            );


            function generateTableRow(doc, y, c1, c2, c3, c4, c5, c6, c7, c8, ) { //Forma dinamico
                doc.fontSize(10)
                    /* .text(c9, 20, x) */
                    .text(c7, 30, y)
                    .text(c1, 50, y)
                    .text(c2, 150, y)
                    .text(c3, 250, y)
                    .text(c4, 350, y)
                    .text(c5, 450, y)
                    .text(c6, 550, y)
                    .text(c8, 650, y);

            }
        }

        /* doc */

        /* doc
        .addPage()
            .fontSize(25)
            .text('Datos Generales.', 100, 100); */


        doc.end();
        /* 
                let message = "";
                let contador = 0;
                listaPagos.forEach(element => {
                    contador = contador + 1
                    message += "----------------------------------------\n";
                    message += `----------PAGO: ${contador}-------------\n`;
                    message += `Mes: ${element.pagoMes}-------------\n`;
                    message += `\n\n`;
                });

                return message; */

    } catch (err) {
        throw err; //para disparar los errores
    }

}

module.exports = {
    crearArchivo: crearArchivo

}