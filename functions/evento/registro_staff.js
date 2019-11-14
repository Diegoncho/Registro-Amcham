const stand = require('../registro_stand');

module.exports = function(id, database, storage){
    let doc;
    return database.collection('staff-business').doc(id).get().then((_doc) => {
      doc = {key: id, ..._doc.data()};

      if(!_doc.data()){
        return Promise.reject({code: 404, message: 'Documento no encontrado!', custom: true, url: ''});
      } else if (doc.asistio) {
          return Promise.reject({code: 400, message: 'El representante ya ha arribado!', custom: true, url: ''});
      } else {
        return stand.generar_stand_badge(doc, storage).then((urls) => {
          return database.collection('staff-business').doc(doc.key).update({asistio: true, fecha_asistio: new Date(),badge: urls[0]})
        });
      }
    }).then(() => {
      return Promise.resolve({
          code: 200,
          message: doc.nombre,
          custom: true,
          url: doc.badge,
      });
    });

    // return database.collection('staff-business').add(registro).then( (documentReference) => {
    //     key = documentReference.id;
    //     doc = {...registro, key: key}

}
