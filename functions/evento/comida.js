module.exports = function(key, database, storage){
    let doc;
    return database.collection('registros').doc(key).get().then((_doc) => {
        doc = _doc.data();

        if(doc){
            return Promise.resolve(_doc);
        } else {
            return database.collection('staff').doc(key).get()
        }
    }).then((_doc) => {
        doc = _doc.data();

        if(!doc){
            return Promise.reject({code: 404, message: 'Documento no encontrado!', custom: true});
        } else if (doc.comio) {
            return Promise.reject({code: 400, message: 'La persona ya ha comido!', custom: true});
        } else{
            return _doc.ref.update({comio: true, fecha_comio: new Date()});
        }
    }).then(()=> {
        return Promise.resolve({
            code: 200, 
            message: doc.nombre,
            custom: true
        });
    });
}
