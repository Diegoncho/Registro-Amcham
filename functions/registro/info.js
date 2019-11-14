const sgMail = require('@sendgrid/mail');
const fs = require('fs');

sgMail.setApiKey('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');

// function to encode file data to base64 encoded string
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer.from(bitmap).toString('base64');
}

module.exports = function(registro){
    const itinerario = base64_encode("./assets/Norte Argentino 2019 Itinerario.pdf");
    const video = base64_encode("./assets/Salta.mp4");

    const email = {
        from: 'Registro Business Networking 2019 <norepply@amchamsal.com>',
        personalizations: [{
            to: [{email: registro.correo }],
            dynamic_template_data: {
                nombre: registro.nombre
            }
        }],
        attachments: [
            {filename: "Salta.mp4", content: video, type: 'video/mp4'  },
            {filename: "Itinerario.pdf", content: itinerario, type: 'application/pdf'  }
        ],
        template_id: "d-287e94b268ec4bad938336e9c5349494"
    }

    return sgMail.send(email);
}
