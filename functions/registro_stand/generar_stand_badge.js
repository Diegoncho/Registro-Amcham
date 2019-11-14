const QRCode = require('qrcode');
const os = require('os');
const Jimp = require('jimp');

function generar_nombre(nombre){
    nombre = nombre.toUpperCase();
    const nombres = nombre.split(' ').filter((part) => {return !part.includes('.') && part !== 'DE' && part !== 'LOS'});

    if(nombres.length <= 3){
        return nombre;
    } else {
        return nombres[0] + ' ' + nombres[2];
    }
}

module.exports = function(registro, storage){
    const img_name = 'badge_' + registro.key + '.png';
    const file_img = storage.file('amcham-2/' + img_name);
    const tmp_path_img = os.tmpdir() + '/' + registro.key;

    let template;

    return QRCode.toFile(tmp_path_img, [registro.nombre,registro.empresa,registro.correo,registro.telefono].join('\n')).then( () => {
        return Jimp.read('./assets/badge_2.png');
    }).then((_template) => {
        template = _template;
        return Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
    }).then((font) => {
        const nombre = generar_nombre(registro.nombre);

        let textData = {
            text: nombre,
            maxWidth: 600,
            maxHeight: 300,
            placementX: 10,
            placementY: 5
        };

        return template.print(font, textData.placementX, textData.placementY, {
            text: textData.text,
            alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT,
            alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
        }, textData.maxWidth, textData.maxHeight);
    }).then(() => {
        return Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
    }).then((font) => {
        let textData = {
            text: registro.empresa,
            maxWidth: 540,
            maxHeight: 300,
            placementX: 10,
            placementY: 55
        };

        return template.print(font, textData.placementX, textData.placementY, {
            text: textData.text,
            alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT,
            alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
        }, textData.maxWidth, textData.maxHeight);
    }).then(() => {
        return Jimp.read(tmp_path_img);
    }).then((qrcode) => {
        return qrcode.resize(250, 250);
    }).then((qrcode) => {
        return template.composite(qrcode, 350, 75, [Jimp.BLEND_DESTINATION_OVER, 1, 1]).rotate(90).getBufferAsync(Jimp.MIME_PNG);
    }).then((_template) => {
        return file_img.save(_template, {
            contentType: 'image/png',
        });
    }).then(() => {
        return file_img.getSignedUrl({action: 'read', expires: '03-09-2491'});
    });
}
