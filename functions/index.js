const functions = require('firebase-functions');
const admin = require('firebase-admin');

var serviceAccount = require("./serviceAccountKey.json");

const cors = require('cors')({
    origin: true,
});

admin.initializeApp({
    apiKey: "AIzaSyBk5lIpOf0rZqPZYoUt70Jo28zaikseK-w",
    authDomain: "i-guest-test.firebaseapp.com",
    databaseURL: "https://i-guest-test.firebaseio.com",
    projectId: "i-guest-test",
    storageBucket: "i-guest-test.appspot.com",
    messagingSenderId: "231239336425",
    credential: admin.credential.cert(serviceAccount),
});

const database = admin.firestore();
database.settings({timestampsInSnapshots: true});
const storage = admin.storage().bucket();

const messaging = admin.messaging();

const registro = require('./registro');
const evento = require('./evento');
const stand = require('./registro_stand')

exports.CrearRegistro = functions.firestore.document('/registros-business/{id}').onCreate((snapshot, context) => {
    const registroDB = {key: context.params.id, ...snapshot.data()};

    let promise;

    if(!registroDB.asistio) {
        promise = registro.enviar(registroDB, true, storage, database).then(() => {
            return registro.enviar(registroDB, false);
        });
    } else {
        promise = Promise.resolve();
    }

    return promise.then(() => {
        return database.collection('tokens').get();
    }).then((users) => {
        const promises = [];

        users.docs.forEach((_doc) => {
            const doc = _doc.data();

            for(var i = 0; i < doc['tokens'].length; i++){
                let payload = {
                    token: doc['tokens'][i],
                    webpush: {
                        headers: {
                            ttl: '15'
                        },
                        notification: {
                            title: 'Nuevo registro',
                            body: registroDB['nombre'] + ' se ha registrado!',
                            click_action: "https://amcham.i-strategies.tech/AmChamAdmin"
                        },
                        fcm_options: {
                            link: "https://amcham.i-strategies.tech/AmChamAdmin"
                        }
                    }
                };

                promises.push(messaging.send(payload));
            }
        });

        return Promise.all(promises);
    })

    // .then(() => {
    //     return evento.generar_badge(registroDB, storage);
    // }).then((urls) => {
    //     return database.collection('registros').doc(registroDB.key).update({badge: urls[0]})
    // });
});

exports.CrearRegistroStand = functions.firestore.document('/staff-business/{id}').onCreate((snapshot, context) => {
  const registroDB_2 = {key: context.params.id, ...snapshot.data()};

  let promise;

  if(!registroDB_2.asistio) {
      promise = stand.enviar(registroDB_2, true, storage, database).then(() => {
          return stand.enviar(registroDB_2, false);
      });

      // return stand.generar_stand_badge(registroDB_2, storage).then((urls) => {
      //   return database.collection('staff-business').doc(registroDB_2.key).update({badge: urls[0]})
      // });
  } else {
      promise = Promise.resolve();
  }

  return promise.then(() => {
      return database.collection('tokens').get();
  }).then((users) => {
      const promises = [];

      users.docs.forEach((_doc) => {
          const doc = _doc.data();

          for(var i = 0; i < doc['tokens'].length; i++){
              let payload = {
                  token: doc['tokens'][i],
                  webpush: {
                      headers: {
                          ttl: '15'
                      },
                      notification: {
                          title: 'Nuevo registro',
                          body: registroDB_2['nombre'] + ' se ha registrado!',
                          click_action: "https://amcham.i-strategies.tech/AmChamAdmin"
                      },
                      fcm_options: {
                          link: "https://amcham.i-strategies.tech/AmChamAdmin"
                      }
                  }
              };

              promises.push(messaging.send(payload));
          }
      });

      return Promise.all(promises);
  })
});

exports.CrearRegistroTest = functions.firestore.document('/registros-business-test/{id}').onCreate((snapshot, context) => {
  const registroDB = {key: context.params.id, ...snapshot.data()};

    let promise;

    if(!registroDB.asistio) {
        promise = registro.enviar(registroDB, true, storage, database).then(() => {
        // promise = registro.enviar(registroDB, true).then(() => {
            return registro.enviar(registroDB, false);
        });
    } else {
        promise = Promise.resolve();
    }

    return promise.then(() => {
        return database.collection('tokens').get();
    }).then((users) => {
        const promises = [];

        users.docs.forEach((_doc) => {
            const doc = _doc.data();

            for(var i = 0; i < doc['tokens'].length; i++){
                let payload = {
                    token: doc['tokens'][i],
                    webpush: {
                        headers: {
                            ttl: '15'
                        },
                        notification: {
                            title: 'Nuevo registro',
                            body: registroDB['nombre'] + ' se ha registrado!',
                            click_action: "https://amcham.i-strategies.tech/AmChamAdmin"
                        },
                        fcm_options: {
                            link: "https://amcham.i-strategies.tech/AmChamAdmin"
                        }
                    }
                };

                promises.push(messaging.send(payload));
            }
        });

        return Promise.all(promises);
    })
});

exports.EnviarRegistro = functions.https.onRequest((request, response) => {

    return cors(request, response, () => {

        if(request.method === 'OPTIONS'){
            response.status(200).send();
        }

        if(request.method !== "POST"){
            response.status(400).send('Please send a POST request');
            return;
        }

        registro.registro(request.body).then(() => {
            response.status(200).json({message: 'Email request approved!'});
            return;
        }).catch((err) => {
            response.status(500).json(err);
            return;
        });
    });
});

exports.EnviarInformacionViaje = functions.https.onRequest((request, response) => {

    return cors(request, response, () => {

        if(request.method === 'OPTIONS'){
            response.status(200).send();
        }

        if(request.method !== "POST"){
            response.status(400).send('Please send a POST request');
            return;
        }

        registro.info(request.body).then(() => {
            response.status(200).json({message: 'Email request approved!'});
            return;
        }).catch((err) => {
            response.status(500).json(err);
            return;
        });
    });
});

exports.EnviarCodigo = functions.https.onRequest((request, response) => {

    return cors(request, response, () => {

        if(request.method === 'OPTIONS'){
            response.status(200).send();
        }

        if(request.method !== "POST"){
            response.status(400).send('Please send a POST request');
            return;
        }

        registro.qr(request.body, storage).then(() => {
            response.status(200).json({message: 'Email request approved!'});
            return;
        }).catch((err) => {
            response.status(500).json(err);
            return;
        });
    });
});

exports.EnviarCodigoStand = functions.https.onRequest((request, response) => {

  return cors(request, response, () => {

      if(request.method === 'OPTIONS'){
          response.status(200).send();
      }

      if(request.method !== "POST"){
          response.status(400).send('Please send a POST request');
          return;
      }

      stand.qr_stand(request.body, storage).then(() => {
          response.status(200).json({message: 'Email request approved!'});
          return;
      }).catch((err) => {
          response.status(500).json(err);
          return;
      });
  });
});

exports.RegistrarToken = functions.https.onRequest((request, response) => {

    return cors(request, response, () => {

        if(request.method === 'OPTIONS'){
            response.status(200).send();
        }

        if(request.method !== "POST"){
            response.status(400).send('Please send a POST request');
            return;
        }

        database.collection('tokens').doc(request.body['uid']).get().then((_doc) => {
            var doc = _doc.data();

            if(!doc) doc = {};

            if(!doc['tokens']) doc['tokens'] = [];

            var addToken = true;

            for(var i = 0; i < doc['tokens'].length; i++) {
                if(request.body['token'] === doc['tokens'][i]) addToken = false;
            }

            if(addToken) doc['tokens'].push(request.body['token']);

            return _doc.ref.set(doc);
        }).then(() => {
            response.status(200).json({message: 'OK'});
            return;
        }).catch((err) => {
            response.status(500).json(err);
            return;
        });
    });
});

exports.EliminarToken = functions.https.onRequest((request, response) => {

    return cors(request, response, () => {

        if(request.method === 'OPTIONS'){
            response.status(200).send();
        }

        if(request.method !== "POST"){
            response.status(400).send('Please send a POST request');
            return;
        }

        database.collection('tokens').doc(request.body['uid']).get().then((_doc) => {
            var doc = _doc.data();

            if(!doc) doc = {};

            if(!doc['tokens']) doc['tokens'] = [];

            for(var i = 0; i < doc['tokens'].length; i++) {
                if(request.body['token'] === doc['tokens'][i]) doc['tokens'].splice(i, 1);
            }

            return _doc.ref.set(doc);
        }).then(() => {
            response.status(200).json({message: 'OK'});
            return;
        }).catch((err) => {
            response.status(500).json(err);
            return;
        });
    });
});

exports.CrearBadgeKey = functions.https.onRequest((request, response) => {

    return cors(request, response, () => {

        if(request.method === 'OPTIONS'){
            response.status(200).send();
        }

        if(request.method !== "POST"){
            response.status(400).send('Please send a POST request');
            return;
        }

        evento.arribo(request.body['key'], database, storage).then((res) => {
            response.status(200).json(res);
        }).catch((err) => {
            if(err.custom) {
                response.status(200).json(err);
            } else {
                response.status(500).json(err);
                return;
            }
        });
    })
});

exports.CrearBadgeRegistro = functions.https.onRequest((request, response) => {
    return cors(request, response, () => {

        if(request.method === 'OPTIONS'){
            response.status(200).send();
        }

        if(request.method !== "POST"){
            response.status(400).send('Please send a POST request');
            return;
        }

        evento.registro(request.body, database).then((res) => {
            response.status(200).json(res);
            return;
        }).catch((err) => {
            response.status(500).json(err);
            return;
        });
    })
});

exports.CrearBadgeRegistroStaff = functions.https.onRequest((request, response) => {
    return cors(request, response, () => {

        if(request.method === 'OPTIONS'){
            response.status(200).send();
        }

        if(request.method !== "POST"){
            response.status(400).send('Please send a POST request');
            return;
        }

        evento.registro_staff(request.body['key'], database, storage).then((res) => {
            response.status(200).json(res);
            return;
        }).catch((err) => {
          if(err.custom) {
            response.status(200).json(err);
          } else {
            response.status(500).json(err);
            return;
          }
        });
    })
});

exports.RegistrarComida = functions.https.onRequest((request, response) => {
    return cors(request, response, () => {

        if(request.method === 'OPTIONS'){
            response.status(200).send();
        }

        if(request.method !== "POST"){
            response.status(400).send('Please send a POST request');
            return;
        }

        evento.comida(request.body['key'].split('\n')[0], database, storage).then((res) => {
            response.status(200).json(res);
            return;
        }).catch((err) => {
            if(err.custom) {
                response.status(200).json(err);
                return;
            } else {
                response.status(500).json(err);
                return;
            }
        });
    })
});

exports.Config = functions.https.onRequest((request, response) => {
    return cors(request, response, () => {

        if(request.method === 'OPTIONS'){
            response.status(200).send();
        }

        if(request.method !== "GET"){
            response.status(400).send('Please send a GET request');
            return;
        }

        return database.collection('config').doc('amcham').get().then((_doc) => {
            doc = _doc.data();
            response.status(200).json({
                wifi: doc.wifi,
                ip: doc.ip,
                mac: doc.mac
            })
            return;
        })
    })
});

exports.GenerarImagenes = functions.https.onRequest((request, response) => {
    return cors(request, response, () => {

        if(request.method === 'OPTIONS'){
            response.status(200).send();
        }

        if(request.method !== "POST"){
            response.status(400).send('Please send a POST request');
            return;
        }

        return database.collection('staff').get().then((docs) => {
            const promises = [];

            const registros = [];

            docs.forEach((_doc) => {
                registros.push({..._doc.data(), key: _doc.id});

                // if(!doc.qr) {
                //     promises.push(registro.generar_qr(doc, storage).then((urls) => {
                //         return database.collection('registros').doc(doc.key).update({qr: urls[0]})
                //     }));
                // }
            });

            for(let i = 35; i < 45; i++){
                promises.push(evento.generar_badge(registros[i], storage).then((urls) => {
                    return database.collection('staff').doc(registros[i].key).update({badge: urls[0]})
                }));
            }

            return Promise.all(promises);
        }).then(() => {
            response.status(204).send();
            return;
        })
    })
});
