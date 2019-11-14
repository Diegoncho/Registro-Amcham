const QRCode = require('qrcode');

module.exports = function(registro, storage){

    const img_name = 'qrcode_' + registro.key + '.png';
    const file_img = storage.file('amcham-2/' + img_name);

    const stream_img = file_img.createWriteStream({
        metadata: {
            contentType: 'image/png'
        }
    });

    QRCode.toFileStream(stream_img, registro.key);

    return new Promise((resolve, reject) => {
        stream_img.on('finish', () => {
            resolve();
        }).on('error', (err) => {
            reject(err);
        });
    }).then( () => {
        return file_img.getSignedUrl({action: 'read', expires: '03-09-2491'});
    });
}
