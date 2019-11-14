const enviar = require('./registrar');
const registro = require('./registro');
const info = require('./info');
const qr = require('./qr');
const generar_qr = require('./generar_qr');

module.exports = {
    enviar: enviar,
    registro: registro,
    info: info,
    qr: qr,
    generar_qr: generar_qr
};
