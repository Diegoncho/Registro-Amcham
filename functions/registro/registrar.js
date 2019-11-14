const sgMail = require('@sendgrid/mail');
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

module.exports = function(registro, asistente = false, storage = null, database = null){
// module.exports = function(registro, asistente = false){
    let promise;
    let badge_url;

    if(asistente) {
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
            return database.collection('registros-business').doc(registro.key).update({qr: urls[0]})
        });
    } else {
        promise = Promise.resolve();
    }

    return promise.then(() => {
        const organizador = 'tlinares@amchamsal.com';
        // const organizador = 'dacastro@i-strategies.tech';
        const fecha = asistente ? null : new Date(registro.fecha.toDate().getTime() - 6*60*60*1000);

        const email = {
            from: 'Registro Business Networking 2019 - Amcham <norepply@amchamsal.com>',
            personalizations: [{
                to: [{email: asistente ? registro.correo : organizador }],
                dynamic_template_data: asistente ? {
                    nombre: registro.nombre,
                    empresa: registro.empresa,
                    cargo: registro.cargo,
                    correo: registro.correo,
                    telefono: registro.telefono,
                    es_miembro: registro.es_miembro,
                    codigo_qr: badge_url
                } : {
                    nombre: registro.nombre,
                    empresa: registro.empresa,
                    cargo: registro.cargo,
                    correo: registro.correo,
                    telefono: registro.telefono,
                    es_miembro: registro.es_miembro,
                    dia: format([fecha.getDate(), fecha.getMonth() + 1, fecha.getFullYear()]).join('/'),
                    hora: format([fecha.getHours(), fecha.getMinutes()]).join(':')
                },
            }],
            template_id: asistente ? "d-cb0b8baf4f544bc694f510cdfb914ad8" : "d-563cfcfe679a4b4dbf3fe6af4ca59fe8"
        }

        return sgMail.send(email);
    });
}
