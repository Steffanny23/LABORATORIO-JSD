//imortar dependencias 
const PDFDocument = require('pdfkit');



const fs = require('fs');
const colors = require('colors');

const crearArchivo = async(nombre, montofinanciamiento, meses, tasaInteres) => {
    try {
        console.log(nombre);
        console.log(montofinanciamiento);
        console.log(meses);
        console.log(tasaInteres);
        //tiempo 
        let date = new Date();

        /* let messiguiente = date.setMonth(date.getMonth() + 1);
        console.log(messiguiente); */



        const totalinteres = (montofinanciamiento * tasaInteres) / 100; //(10000*24) /100
        const interesMensual = (totalinteres / 12) //interes mensual que se le cobrara al cliente
            // console.log(totalneto);
        let capitalMesAbono = montofinanciamiento / meses;
        let mesInicio = 2; //iniciando en mes de febrero
        mesInicio = mesInicio - 1;

        let listaPagos = [];
        let listaMeses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

        let saldoBase = montofinanciamiento;
        for (let i = 0; i < meses; i++) {
            date.setMonth(date.getMonth() + 1);
            let fechaPosion = new Date(date);
            let _saldoDespues = saldoBase - interesMensual;
            let _cuotaPago = interesMensual + capitalMesAbono;
            let _mesPago = listaMeses[fechaPosion.getMonth()];


            //sumar una posicion
            mesInicio = mesInicio + 1;
            //creamos propiedades 
            let newItem = {
                SaldoBase: saldoBase.toFixed(2),
                SaldoD: _saldoDespues.toFixed(2),
                coutaInteres: interesMensual.toFixed(2),
                coutaCapital: capitalMesAbono.toFixed(2),
                coutaPago: _cuotaPago.toFixed(2),
                pagoMes: _mesPago,
                fechaPago: fechaPosion

            }
            listaPagos.push(newItem);
            saldoBase = saldoBase - capitalMesAbono;
        }
        console.log(listaPagos);

        const doc = new PDFDocument(); //GENERAR DOC PDF
        doc.pipe(fs.createWriteStream('PagosClientes.pdf'));
        doc.fontSize(10)
            .text("INFORMACION GENERAL DE PAGOS", 250, 60)
            .text("  COMPRA DE VEHICULOS", 260, 80)
            .text("saldoBase", 50, 99)
            .text("saldoDespues", 150, 99)
            .text("interesMensual", 250, 99)
            .text("capitalMesAbono", 350, 99)
            .text("cuotaPago", 450, 99)
            .text("mesPago", 550, 99);

        let i,
            invoiceTableTop = 100; //posicion de margen

        for (i = 0; i < listaPagos.length; i++) {
            const item = listaPagos[i];
            const position = invoiceTableTop + (i + 1) * 30;
            generateTableRow(

                doc,
                position,
                item.SaldoBase,
                item.SaldoD,
                item.coutaInteres,
                item.coutaCapital,
                item.coutaPago,
                item.pagoMes,

            );

            function generateTableRow(doc, y, c1, c2, c3, c4, c5, c6, ) { //Forma dinamico
                doc.fontSize(10)
                    .text(c1, 50, y)
                    .text(c2, 150, y)
                    .text(c3, 250, y)
                    .text(c4, 350, y)
                    .text(c5, 450, y)
                    .text(c6, 550, y);
            }
        }

        /* doc */
        doc.addPage()
            /*   .fontSize(25)
              .text('Here is some vector graphics...', 100, 100); */


        doc.end();

        /* let message = "";
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
        throw err;
    }

}

module.exports = {
    crearArchivo: crearArchivo

}