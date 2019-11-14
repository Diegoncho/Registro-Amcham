const sgMail = require('@sendgrid/mail');
const generar_badge = require('./generar_stand_badge');
const QRCode = require('qrcode');
const os = require('os');

sgMail.setApiKey('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');

function format(array){
    const newArray = [];

    for(var i = 0; i < array.length; i++){
        if(array[i] < 10) newArray.push('0' + array[i].toString());
        else newArray.push(array[i].toString());
    }

    return newArray;
}

module.exports = function(registro, asistente_2 = false, storage = null,  database = null){
// module.exports = function(registro, asistente = false){
    let promise;
    let badge_url;

    if(asistente_2) {
        // Generar QR.
        const img_name = 'qrcode_' + registro.key + '.png';
        const file_img = storage.file('amcham-2/' + img_name);

        const stream_img = file_img.createWriteStream({
            metadata: {
                contentType: 'image/png'
            }
        });

        QRCode.toFileStream(stream_img, registro.key);

        promise = new Promise((resolve, reject) => {
            stream_img.on('finish', () => {
                resolve();
            }).on('error', (err) => {
                reject(err);
            });
        }).then( () => {
            return file_img.getSignedUrl({action: 'read', expires: '03-09-2491'});
        }).then((urls) => {
            badge_url = urls[0];
            return database.collection('staff-business').doc(registro.key).update({qr: urls[0]})
        });
    } else {
        promise = Promise.resolve();
    }

    return promise.then(() => {
        const organizador_2 = 'tlinares@amchamsal.com';
        // const organizador_2 = 'dacastro@i-strategies.tech';
        const fecha = asistente_2 ? null : new Date(registro.fecha.toDate().getTime() - 6*60*60*1000);

        const email = {
            from: 'Registro Stand Business Networking 2019 <norepply@amchamsal.com>',
            personalizations: [{
                to: [{email: asistente_2 ? registro.correo : organizador_2 }],
                dynamic_template_data: asistente_2 ? {
                    nombre: registro.nombre,
                    empresa: registro.empresa,
                    correo: registro.correo,
                    telefono: registro.telefono,
                    codigo_qr: badge_url
                } : {
                    nombre: registro.nombre,
                    empresa: registro.empresa,
                    correo: registro.correo,
                    telefono: registro.telefono,
                    dia: format([fecha.getDate(), fecha.getMonth() + 1, fecha.getFullYear()]).join('/'),
                    hora: format([fecha.getHours(), fecha.getMinutes()]).join(':')
                },
            }],
            template_id: asistente_2 ? "d-5ef2060e688a4d08bfcb7aec255a8e24" : "d-551d581fc0a044a7a9dfa8f35cb12371"
        }

        return sgMail.send(email);
    });
}
