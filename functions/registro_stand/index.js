const generar_stand_badge = require('./generar_stand_badge');
const enviar = require('./registrar_stand');
const qr_stand = require('./qr_stand');

module.exports = {
    enviar: enviar,
    generar_stand_badge: generar_stand_badge,
    qr_stand: qr_stand,
};
