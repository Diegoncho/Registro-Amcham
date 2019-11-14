const sgMail = require('@sendgrid/mail');
const QRCode = require('qrcode');
const os = require('os');

sgMail.setApiKey('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');

module.exports = function(registro, storage){
    const img_name = 'qrcode_' + registro.key + '.png';
    const file_img = storage.file('amcham-2/' + img_name);
    const tmp_path_img = os.tmpdir() + '/' + registro.key;

    let local_img;

    return QRCode.toFile(tmp_path_img, registro.key).then( () => {
        const stream_img = file_img.createWriteStream({
            metadata: {
                contentType: 'image/png'
            }
        });

        QRCode.toFileStream(stream_img, registro.key);

        return new Promise((resolve, reject) => {
            stream_img.on('finish', () => {

                file_img.download((err, content) => {
                    if(err) {
                        reject(err);
                    } else {
                        resolve(content);
                        return;
                    }
                });

            }).on('error', (err) => {
                reject(err);
            });
        });
    }).then((img) => {
        local_img = img;
        return file_img.getSignedUrl({action: 'read', expires: '03-09-2491'});
    }).then((urls) => {
        const email = {
            from: 'Registro Business Networking 2019 <norepply@amchamsal.com>',
            personalizations: [{
                to: [{email: registro.correo }],
                dynamic_template_data: {
                    nombre: registro.nombre,
                    empresa: registro.empresa,
                    codigo_qr: urls[0]
                }
            }],
            attachments: [
                {filename: img_name, content: local_img.toString('base64'), type: 'image/png'  }
            ],
            template_id: "d-335d27a5b7454ed1b781c5cb3d6ede77"
        }

        return sgMail.send(email);
    });
}
