const sgMail = require('@sendgrid/mail');

sgMail.setApiKey('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');

function format(array){
  const newArray = [];

  for(var i = 0; i < array.length; i++){
      if(array[i] < 10) newArray.push('0' + array[i].toString());
      else newArray.push(array[i].toString());
  }

  return newArray;
}

module.exports = function(registro){
      const fecha = new Date(registro.fecha);

      const email = {
          from: 'Registro Business Networking 2019 <norepply@amchamsal.com>',
          personalizations: [{
              to: [{email: registro.correo }],
              dynamic_template_data: {
                nombre: registro.nombre,
                empresa: registro.empresa,
                cargo: registro.cargo,
                correo: registro.correo,
                telefono: registro.telefono,
                es_miembro: registro.es_miembro,
                dia: format([fecha.getDate(), fecha.getMonth() + 1, fecha.getFullYear()]).join('/'),
                hora: format([fecha.getHours(), fecha.getMinutes()]).join(':')
              }
          }],
          template_id: "d-a192ee1c00ae44148d841ccab5bcd54a"
      }

      return sgMail.send(email);
}
