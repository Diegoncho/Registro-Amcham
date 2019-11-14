var generar_badge = require('./generar_badge');

module.exports = function(key, database, storage){
    let doc;
    return database.collection('registros-business').doc(key).get().then((_doc) => {
        doc = _doc.data();

        if(!doc){
            return Promise.reject({code: 404, message: 'Documento no encontrado!', custom: true, url: ''});
        } else if (doc.asistio) {
            return Promise.reject({code: 400, message: 'La persona ya ha arribado!', custom: true, url: ''});
        } else{
            return database.collection('registros-business').doc(key).update({asistio: true, fecha_asistio: new Date()});
        }
    }).then(() => {
        return Promise.resolve({
            code: 200,
            message: doc.nombre,
            custom: true,
            url: doc.badge
        });
    });
}
