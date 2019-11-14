var generar_badge = require('./generar_badge');

module.exports = function(registro, database){
    let key;
    let doc;

    return database.collection('registros-business').add({...registro, fecha: new Date(), asistio: true, fecha_asistio: new Date()}).then( (documentReference) => {
        key = documentReference.id;
        doc = {...registro, key: key}
    }).then(() => {
        return Promise.resolve({
            code: 200,
            message: doc.nombre,
            custom: true,
            url: doc.badge
        });
    });
}
